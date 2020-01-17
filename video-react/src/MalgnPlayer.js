import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';

import styled from 'styled-components';

import VideoContent from './VideoContent';
import VideoCover from './VideoCover';
import ProgressPrint from './ProgressPrint';
import ProgressBar from './ProgressBar';

import { calculateTime, calculateWidthToPercent } from './util/CommonUtils';
import { Constants } from './util/Constants';


import playButton from './image/play-button-white-01.png';
import sectionPlayButton from './image/section-play-button.png';
import pauseButton from './image/play-button-white-02.png';
import volumeButton from './image/volume-button-white-3.png';
import pin from './image/in-out-pin.png';

const MalgnPlayerContainer = styled.div`
    padding: 20px 20px 20px 20px;
    position: relative;

    -ms-user-select: none; 
    -moz-user-select: none;
    -khtml-user-select: none;
    /* -webkit-user-select: none; */
    user-select: none;
    font-size: 1em;

    @media (min-width: 768px) and (max-width: 991px) {
        font-size: 0.2em;
    }
    @media (min-width: 576px) and (max-width: 767px) {
        font-size: 0.2em;
    }
    @media (min-width: 375px) and (max-width: 575px) {
        font-size: 0.1em;
    }
    @media (max-width: 374px) {
        font-size: 0.1em;
    }

    .border {
        border: 1px solid tomato;
    }
    .radius {
        border-radius: 10px 10px 10px 10px;
    }
    .video-top-container {
        position: relative;
    }

    .video-bottom-container {
        position: relative;
        height: 7vw;
        /* border: 1px solid tomato; */
        /* background-color: black; */

        .progress-bar-container {
            /* border: 1px solid tomato; */
        }
        .in-out-container {
            position: relative;
            height: 20.00%;
            border: 1px solid black;
            background-color: rgb(43, 47, 59);
            
            .in-point {
                position: absolute;
                top: 0;
                left: 0%;
                height: 70%;
                transform: rotateX(180deg);
                /* border: 1px solid white; */
            }
            .out-point {
                position: absolute;
                top: 0;
                left: 100%;
                height: 70%;
                transform: rotateX(180deg);
                /* border: 1px solid white; */
            }
        }
        .function-container {
            display: flex;
            height: 33.33%;
            /* border: 1px solid black; */
            background-color: rgb(43, 47, 59);

            .play-button-container, .section-play-button-container {
                position: relative;
                top: 0;
                height: 100%;
            }
            .play-button-container > img, .section-play-button-container > img {
                width: auto;
                height: 100%;
                /* border: 1px solid tomato; */
            }
            .time-container {
                width: auto;
                height: 100%;
                /* border: 1px solid tomato; */
                color: white;
            }
            .time-container > span {
                position: relative;
                top: 20%;
                /* border: 1px solid tomato; */
            }

        }
    }
`;

/**
 * 
 * @param { src }   영상 소스
 * @param { skim }  스킴 이미지
 */
const MalgnPlayer = ({ src, skim }) => {

    /**
     * [1] Web 상태
     */
    const [videoPlayer, setVideoPlayer] = useState(null);
    const [videoReadyState, setVideoReadyState] = useState(false);
    const [isPlayed, setIsPlayed] = useState(false);
    // "full" : 전체 재생, "section" : 구간 재생
    const [videoPlayMode, setVideoPlayMode] = useState(Constants.PLAY_TYPE.FULL);
    const [draggable, setDraggable] = useState(false);

    const [selectedBar, setSelectedBar] = useState(null);
    const [currentTimeBar, setCurrentTimeBar] = useState(null);
    const [inTimeBar, setInTimeBar] = useState(null);
    const [outTimeBar, setOutTimeBar] = useState(null);


    // "center" : 타임라인을 클릭하여 현재 시간을 변경 할 경우
    // "left"   : 시간 표시 막대를 왼쪽으로 움직이는 중
    // "right"   : 시간 표시 막대의 오른쪽으로 움직이는 중
    const [moveTypeInBar, setMoveTypeInBar] = useState(Constants.MOVE_TYPE.CENTER);
    const [moveType, setMoveType] = useState(Constants.MOVE_TYPE.CENTER);

    const [videoCurrentTime, setVideoCurrentTime] = useState(0.00);
    const [videoInTime, setVideoInTime] = useState(0.00);
    const [videoOutTime, setVideoOutTime] = useState(0.00);
    const [videoDuration, setVideoDuration] = useState(0.00);
    const [videoVolume, setVideoVolume] = useState(0.00);
    const [detailedTime, setDetailedTime] = useState(1);

    /**
     * [2] Mobile 상태
     */
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartPercent, setTouchStartPercnet] = useState(0);

    /**
     * [3] animation 상태
     */
    const [isBottomCover, setIsBottomCover] = useState(false);
    const [isHoldBottomCover, setIsHoldBottomCover] = useState(false);


    useEffect(() => {
        console.log('videoPlayMode : ', videoPlayMode);
        return () => {
        }
    }, [videoPlayMode]);
    useEffect(() => {
        console.log({ videoDuration: videoDuration });
        return () => {
        }
    }, [videoDuration]);

    /**
     * [0] 비디오 메타데이터 최초 로드 및 상태 초기화(init)
     */
    const onLoadedMetadata = useCallback((player) => {
        const { duration, readyState, volume } = player;
        console.log({ player: player })
        setVideoPlayer(player);
        console.log(duration);
        setVideoDuration(duration);
        setVideoOutTime(duration);
        setVideoVolume(volume);
        setVideoReadyState(true);
    }, []);

    /**
     * [1] 비디오 재생 관련 Functions
     */

    /**
     * [1-1] 전체 재생 (full play)
     */
    const onPlayFull = useCallback((event) => {
        const { paused } = videoPlayer;
        paused ? videoPlayer.play() : videoPlayer.pause();
        setIsPlayed(!videoPlayer.paused);
        setVideoPlayMode(Constants.PLAY_TYPE.FULL);
    }, [videoPlayer]);

    /**
     * [1-2] 구간 재생 (section play)
     */
    const onPlaySection = useCallback(() => {
        const { paused } = videoPlayer;
        if (paused) {
            videoPlayer.currentTime = videoInTime;
            videoPlayer.play();
            setIsPlayed(true);
        } else {
            videoPlayer.pause();
            setIsPlayed(false);
        }
        setVideoPlayMode(Constants.PLAY_TYPE.SECTION);
    }, [videoInTime, videoPlayer]);

    /**
     * [1-3] 현재 재생 중인 시간 업데이트
     */
    const onTimeUpdate = useCallback((player) => {
        setVideoCurrentTime(player.currentTime);
        // 구간 재생일 경우 Out Time 에서 일시정지
        if (videoPlayMode === Constants.PLAY_TYPE.SECTION) {
            if (player.currentTime > videoOutTime) {
                player.pause();
                setIsPlayed(false);
            }
        }

    }, [videoOutTime, videoPlayMode]);

    /**
     * [1-4] 비디오 진행률 계산
     */
    const currentTimePercent = useMemo(() => {
        return videoCurrentTime / videoDuration * 100;
    }, [videoCurrentTime, videoDuration]);

    const inTimePercent = useMemo(() => {
        return videoInTime / videoDuration * 100;
    }, [videoInTime, videoDuration]);

    const outTimePercent = useMemo(() => {
        return videoOutTime / videoDuration * 100;
    }, [videoOutTime, videoDuration]);

    /**
     * [2] Client Event 관련 Functions
     */

    /**
     * [2-1] 타임라인에서 클릭 이벤트 발생
     */
    const mouseDownInBottomTimeline = useCallback(({ nativeEvent, target, currentTarget }) => {
        const type = target.attributes.type.value;
        const { offsetX } = nativeEvent;
        if (type === "timeline") {
            // const currentTimeBar = currentTarget.lastElementChild.firstElementChild;
            const timelineWidth = currentTarget.offsetWidth;
            const percent = calculateWidthToPercent(
                timelineWidth, offsetX, currentTimeBar.offsetWidth, moveTypeInBar
            );
            setVideoCurrentTime(percent * videoDuration);
            videoPlayer.currentTime = percent * videoDuration;
            setSelectedBar(currentTimeBar);
            setDraggable(true);
            setVideoReadyState(false);
        }

    }, [currentTimeBar, moveTypeInBar, videoDuration, videoPlayer]);

    /**
     * [2-2] 현재 시간 막대를 클릭
     */
    const mouseDownCurrentBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        setDraggable(true);
        setSelectedBar(currentTarget);
    }, []);
    /**
     * [2-3] In Time 막대를 클릭
     */
    const mouseDownInBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        setDraggable(true);
        setSelectedBar(currentTarget);
    }, []);
    /**
     * [2-4] Out Time 막대를 클릭
     */
    const mouseDownOutBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        setDraggable(true);
        setSelectedBar(currentTarget);
    }, []);
    /**
     * [2-5] 막대 기준 오른쪽으로 움직이는지 왼쪽으로 움직이는지
     */
    const mouseMoveInBar = useCallback((type) => {
        if (draggable) {
            setMoveTypeInBar(type);
        }
    }, [draggable]);

    /**
     * [2-6] 선택된 막대의 위치를 변경 (막대 드래그) 
     *  "current": 현재 시간 막대
     *  "in": In 포인트 막대
     *  "out": Out 포인트 막대
     */
    const mouseMoveInComponent = useCallback((event) => {
        const { nativeEvent, target, currentTarget } = event;
        if (draggable) {
            const moveType = moveTypeInBar;
            const timelineWidth = target.offsetWidth;
            const barWidth = selectedBar.offsetWidth;
            const x = nativeEvent.offsetX;
            const type = selectedBar.attributes.type.value;
            const percent = calculateWidthToPercent(timelineWidth, x, barWidth, moveType);
            switch (type) {
                case "current": {
                    videoPlayer.currentTime = percent * videoDuration;
                    setVideoCurrentTime(percent * videoDuration);
                    break;
                }
                case "in": {
                    let time = percent * videoDuration > videoOutTime ? videoOutTime : percent * videoDuration;
                    videoPlayer.currentTime = time;
                    setVideoInTime(time);
                    break;
                }
                case "out": {
                    let time = percent * videoDuration < videoInTime ? videoInTime : percent * videoDuration;
                    videoPlayer.currentTime = time;
                    setVideoOutTime(time);
                    break;
                }
                default:
                    setVideoReadyState(false);
                    break;
            }
        }
    }, [draggable, moveTypeInBar, selectedBar, videoPlayer, videoDuration, videoOutTime, videoInTime]);

    /**
     * [2-7] 타임라인 '안' 에서 Mouse Up
     */
    const mouseUpInComponent = useCallback(() => {
        setDraggable(false);
        setMoveTypeInBar(Constants.MOVE_TYPE.CENTER);
    }, []);


    const mouseEnterComponent = useCallback((event) => {
        event.currentTarget.addEventListener("wheel", (event) => {
            event.preventDefault();
        }, { passive: false, once: false })
    }, []);

    /**
     * [2-8] 타임라인 '밖' 에서 Mouse Up
     */
    const mouseLeaveComponent = useCallback(() => {
        if (draggable) {
            window.addEventListener("mouseup", (event) => {
                setDraggable(false);
                setMoveTypeInBar(Constants.MOVE_TYPE.CENTER);
            })
        }
    }, [draggable]);

    /**
     * [2-10] 우클릭 방지
     */
    const contextMenuInComponent = useCallback((event) => {
        event.preventDefault();
    }, []);

    const mouseDownInVolume = useCallback((event) => {
        console.log("mouseDownInVolume()");
        const { nativeEvent, target, currentTarget } = event;
        const { offsetX } = nativeEvent;
        const timelineWidth = currentTarget.offsetWidth;
        const percent = calculateWidthToPercent(timelineWidth, offsetX, 1, Constants.MOVE_TYPE.CENTER);
        console.log("percent : ", percent * 100);
        // console.log({videoPlayer: videoPlayer});
        setVideoVolume(percent * 100);
        videoPlayer.volume = percent;
    }, [videoPlayer]);

    const changeVolume = useCallback((event, volume) => {
        videoPlayer.volume = volume;
        setVideoVolume(volume * 100.00);
    }, [videoPlayer]);

    /**
     *  [4] 단축키
     *  - shiftKey + C : 현재 시간 Bar 선택
     *  - shiftKey + I : In 포인트 Bar 선택
     *  - shiftKey + O : Out 포인트 Bar 선택
     *  - space : 재생
     *  - 방향키 Up, Down : 미세조정 값 변경
     *  - 방향키 Right, Left : 영상 현재 시간 변경
     */
    const keyDown = useCallback((event) => {
        const { keyCode, ctrlKey, altKey, shiftKey, target, currentTarget } = event;
        console.log({ keyCode: keyCode });
        let type = null;
        if (selectedBar === null) {
            type = "current";
        } else {
            type = selectedBar.attributes.type.value;
        }

        // ['shift']
        if (shiftKey) {
            switch (keyCode) {
                // ['c'] 현재 Bar 선택
                case 67: {
                    setSelectedBar(currentTimeBar);
                    break;
                }
                // ['i'] In Time Bar 선택
                case 73: {
                    setSelectedBar(inTimeBar);
                    videoPlayer.currentTime = videoInTime;
                    break;
                }

                // ['o'] Out Time Bar 선택
                case 79: {
                    setSelectedBar(outTimeBar);
                    videoPlayer.currentTime = videoOutTime;
                    break;
                }

                default:
                    break;
            }
        }

        switch (keyCode) {
            // [스페이스 바]
            case 32: {
                const { paused } = videoPlayer;
                setVideoPlayMode(Constants.PLAY_TYPE.FULL);
                if (paused) {
                    setIsPlayed(paused);
                    videoPlayer.play();
                } else {
                    setIsPlayed(paused);
                    videoPlayer.pause();
                }
                break;
            }
            // [왼쪽 방향키]
            case 37: {
                if (type === "current") {
                    videoPlayer.currentTime -= detailedTime;
                }
                if (type === "in") {
                    let time = videoInTime - detailedTime;
                    if (time <= 0) {
                        time = 0;
                    }
                    videoPlayer.currentTime = time;
                    setVideoInTime(time);
                }
                if (type === "out") {
                    let time = videoOutTime - detailedTime;
                    if (time <= videoInTime) {
                        time = videoInTime;
                    }
                    videoPlayer.currentTime = time;
                    setVideoOutTime(time);
                }
                break;
            }
            // [위 방향키]
            case 38: {
                let detailedTimeValue = parseFloat((detailedTime + 0.1).toFixed(2));

                setDetailedTime(detailedTimeValue);
                break;
            }
            // [오른쪽 방향키]
            case 39: {
                if (type === "current") {
                    videoPlayer.currentTime += detailedTime;
                }
                if (type === "in") {
                    let time = videoInTime + detailedTime;
                    if (time >= videoOutTime) {
                        time = videoOutTime;
                    }
                    videoPlayer.currentTime = time;
                    setVideoInTime(time);
                }
                if (type === "out") {
                    let time = videoOutTime + detailedTime
                    if (time >= videoDuration) {
                        time = videoDuration;
                    }
                    videoPlayer.currentTime = time;
                    setVideoOutTime(time);
                }

                break;
            }
            // [아래 방향키]
            case 40: {
                let detailedTimeValue = parseFloat((detailedTime - 0.1).toFixed(2));
                if (detailedTimeValue <= 0) {
                    detailedTimeValue = 0;
                }
                setDetailedTime(detailedTimeValue);
                break;
            }

            default:
                break;
        }
    }, [currentTimeBar, inTimeBar, outTimeBar, selectedBar, detailedTime, videoDuration, videoInTime, videoOutTime, videoPlayer]);

    const changeDetailedTime = useCallback((event) => {
        const { deltaX, deltaY, deltaZ, nativeEvent } = event;
        let detailedTimeValue = parseFloat((detailedTime + deltaY * 0.1).toFixed(2))
        if (detailedTimeValue <= 0) {
            detailedTimeValue = 0;
        }
        setDetailedTime(detailedTimeValue);
    }, [detailedTime]);


    /**
     * [모바일 Event]
     *  - 추후 작업 예정
     */
    const onTouchStart = useCallback((event) => {
    }, []);
    const onTouchMove = useCallback((event) => {
    }, []);
    const onTouchEnd = useCallback((event) => {
    }, []);

    /**
     * [Frame IO 작업]
     */
    const inPoint = useRef(null);
    const outPoint = useRef(null);

    const [hoverPointX, setHoverPointX] = useState(0);
    const [hoverPointView, setHoverPointView] = useState(false);

    const mouseDownInProgressBar = useCallback((event) => {
        const { nativeEvent, target, currentTarget } = event;
        const { offsetX } = nativeEvent;
        const timelineWidth = currentTarget.offsetWidth;
        const percent = calculateWidthToPercent(
            timelineWidth, offsetX, 1, Constants.MOVE_TYPE.CENTER
        );
        // console.log("percent : ", percent);
        setVideoCurrentTime(percent * videoDuration);
        setDraggable(true);
        videoPlayer.pause();
        videoPlayer.currentTime = percent * videoDuration;

    }, [videoDuration, videoPlayer]);

    const mouseDownInPoint = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        setDraggable(true);
        setSelectedBar(currentTarget);
        console.log({ currentTarget: currentTarget });
    }, []);

    const mouseDownOutPoint = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        setDraggable(true);
        setSelectedBar(currentTarget);
        console.log({ currentTarget: currentTarget });
    }, []);

    const mouseMoveInProgressBar = useCallback((event) => {
        const { nativeEvent, target, currentTarget } = event;
        const { offsetX } = nativeEvent;
        const progressWidth = currentTarget.offsetWidth;
        const percent = calculateWidthToPercent(
            progressWidth, offsetX, 1, moveType
        );
        setHoverPointX(percent * 100);

        if (draggable) {
            setVideoCurrentTime(percent * videoDuration);
            videoPlayer.currentTime = percent * videoDuration;
        }
    }, [draggable, moveType, videoDuration, videoPlayer]);

    const mouseMoveInPoint = useCallback((event) => {
        const { nativeEvent } = event;

        if (nativeEvent.movementX > 0) {
            setMoveType(Constants.MOVE_TYPE.RIGHT);
            // console.log(Constants.MOVE_TYPE.RIGHT);
        }
        if (nativeEvent.movementX < 0) {
            setMoveType(Constants.MOVE_TYPE.LEFT);
            // console.log(Constants.MOVE_TYPE.LEFT);
        }
    }, []);

    const mouseMoveInOutContainer = useCallback((event) => {
        const { target, currentTarget, nativeEvent } = event;
        if ((target !== inPoint.current) && (target !== outPoint.current)) {
            console.log("move in inPoint");

            if (draggable) {
                const containerWidth = currentTarget.offsetWidth;
                const pointWidth = selectedBar.offsetWidth;
                const pointType = selectedBar.attributes.type.value;
                const x = nativeEvent.offsetX;
                switch (pointType) {
                    case Constants.COMPONENT_TYPE.IN_POINT: {
                        const percent = calculateWidthToPercent(containerWidth, x, pointWidth, moveType);
                        // console.log("in percent : ", percent);
                        setVideoInTime(videoDuration * percent);
                        break;
                    }
                    case Constants.COMPONENT_TYPE.OUT_POINT: {
                        const percent = calculateWidthToPercent(containerWidth, x, pointWidth, moveType);
                        // console.log("out percent : ", percent);
                        setVideoOutTime(videoDuration * percent);
                        break;
                    }
                    default:
                        break;
                }
            }
        }
    }, [draggable, inPoint, moveType, selectedBar, videoDuration]);

    const mouseEnterInProgressBar = useCallback(() => {
        setHoverPointView(true);
    }, []);
    const mouseLeaveInProgressBar = useCallback(() => {
        setHoverPointView(false);
    }, []);

    const hoverPointTime = useMemo(() => {
        return videoDuration * hoverPointX / 100;
    }, [hoverPointX, videoDuration]);

    return (
        <MalgnPlayerContainer
            tabIndex="0"
            onContextMenu={contextMenuInComponent}
            onMouseUp={mouseUpInComponent}
            onMouseLeave={mouseLeaveComponent}
            onMouseEnter={mouseEnterComponent}
            onKeyDown={keyDown}
        >
            <div className="video-top-container">
                <VideoContent
                    src={src}
                    percent={currentTimePercent}

                    onTimeUpdate={onTimeUpdate}
                    onLoadedMetadata={onLoadedMetadata}
                    onChangeReadyState={setVideoReadyState}
                />
                <VideoCover
                    isPlayed={isPlayed}
                    readyState={videoReadyState}
                    hoverPointView={hoverPointView}
                    hoverPointX={hoverPointX}
                    hoverPointTime={hoverPointTime}
                    button={{
                        play: playButton,
                        pause: pauseButton
                    }}
                    onPlayFull={onPlayFull}
                />
            </div>
            <div className="video-bottom-container">
                <div className="progress-bar-container">
                    <ProgressBar
                        onMouseDown={mouseDownInProgressBar}
                        onMouseMoveInProgressBar={mouseMoveInProgressBar}
                        onMouseMoveInHoverPoint={mouseMoveInPoint}
                        onMouseEnterInProgressBar={mouseEnterInProgressBar}
                        onMouseLeaveInProgressBar={mouseLeaveInProgressBar}
                        hoverPointX={hoverPointX}
                        hoverPointView={hoverPointView}
                        percent={currentTimePercent}
                        color="rgb(91, 83, 255)"
                    />
                </div>
                <div
                    className="in-out-container"
                    onMouseMove={mouseMoveInOutContainer}
                >
                    <img
                        ref={inPoint}
                        className="in-point"
                        src={pin}
                        alt=""
                        draggable={false}
                        type={Constants.COMPONENT_TYPE.IN_POINT}
                        style={{
                            "left": inTimePercent + "%",
                        }}
                        onMouseDown={mouseDownInPoint}
                        onMouseMove={mouseMoveInPoint}
                    // onMouseEnter={() => {
                    //     setVideoInTime()
                    // }}
                    />
                    <img
                        ref={outPoint}
                        className="out-point"
                        src={pin}
                        alt=""
                        draggable={false}
                        type={Constants.COMPONENT_TYPE.OUT_POINT}
                        style={{
                            "left": outTimePercent + "%",
                        }}
                        onMouseDown={mouseDownOutPoint}
                        onMouseMove={mouseMoveInPoint}
                    />
                </div>
                <div className="function-container">
                    <div className="play-button-container">
                        <img src={playButton} alt="" className="play-button" />
                    </div>
                    <div className="section-play-button-container">
                        <img src={sectionPlayButton} alt="" className="play-button" />
                    </div>
                    <div className="time-container">
                        <span>{calculateTime(currentTimePercent).substring(0, 8)} / {calculateTime(videoDuration).substring(0, 8)}</span>
                    </div>
                </div>
            </div>
            <div style={{ "height": "2vw" }}>

            </div>
            <ProgressPrint
                currentTime={videoCurrentTime}
                currentTimePercent={currentTimePercent}
                inTime={videoInTime}
                inTimePercent={inTimePercent}
                outTime={videoOutTime}
                outTimePercent={outTimePercent}
                detailedTime={detailedTime}
                selectedBar={selectedBar}
                calculateTime={calculateTime}
            />
        </ MalgnPlayerContainer>
    )
}

export default MalgnPlayer;