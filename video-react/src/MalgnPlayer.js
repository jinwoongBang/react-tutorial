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
import sectionPauseButton from './image/section-pause-button.png';
import pauseButton from './image/play-button-white-02.png';
import volumeButton from './image/volume-button-white-3.png';
import pinButton from './image/in-out-pin.png';
import fullScreenButton from './image/full-screen-button-01.png';
import preferenceButton from './image/preference-button.png';

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
                opacity: 0.4;
                transition: opacity 0.2s linear;
                transition: height 0.1s linear;
            }
            .out-point {
                position: absolute;
                top: 0;
                left: 100%;
                height: 70%;
                transform: rotateX(180deg);
                opacity: 0.4;
                transition: opacity 0.2s linear;
                transition: height 0.1s linear;
            }
            .active {
                opacity: 1.0;
                height: 90%;
            }
        }
        .function-container {
            display: flex;
            height: 33.33%;
            /* border: 1px solid black; */
            background-color: rgb(43, 47, 59);

            .time-container,
            .button-container {
                position: relative;
                top: 0;
                height: 100%;
                border: 1px solid tomato;
            }
            .button-container > img {
                width: auto;
                height: 100%;
                border: 1px solid tomato;
            }
            .time-container {
                width: 14vw;
                text-align: center;
                vertical-align: middle;
            }
            .time-container > span {
                position: relative;
                top: 20%;
                color: white;
                border: 1px solid tomato;
            }
            .space-container {
                width: 40vw;
                height: 100%;
                border: 1px solid tomato;
            }
            .volume-container {
                width: 10vw;
                height: 100%;
                border: 1px solid tomato;
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
    const inPoint = useRef(null);
    const outPoint = useRef(null);

    const [hoverPointX, setHoverPointX] = useState(0);
    const [hoverPointView, setHoverPointView] = useState(false);
    const [playSpeedRateFormView, setPlaySpeedRateFormView] = useState(false);

    /**
     * [1] Web 상태
     */
    const [videoPlayer, setVideoPlayer] = useState(null);
    const [videoReadyState, setVideoReadyState] = useState(false);
    const [isPlayed, setIsPlayed] = useState(false);
    // "full" : 전체 재생, "section" : 구간 재생
    const [videoPlayMode, setVideoPlayMode] = useState(Constants.PLAY_TYPE.FULL);
    const [draggable, setDraggable] = useState(false);

    const [selectedPoint, setSelectedPoint] = useState(null);


    // "center" : 타임라인을 클릭하여 현재 시간을 변경 할 경우
    // "left"   : 시간 표시 막대를 왼쪽으로 움직이는 중
    // "right"   : 시간 표시 막대의 오른쪽으로 움직이는 중
    const [moveType, setMoveType] = useState(Constants.MOVE_TYPE.CENTER);

    const [videoCurrentTime, setVideoCurrentTime] = useState(0.00);
    const [videoInTime, setVideoInTime] = useState(0.00);
    const [videoOutTime, setVideoOutTime] = useState(0.00);
    const [videoDuration, setVideoDuration] = useState(0.00);
    const [videoVolume, setVideoVolume] = useState(0.00);
    const [detailedTime, setDetailedTime] = useState(1);
    const [videoPlaybackRate, setVideoPlaybackRate] = useState(1.0);

    /**
     * [2] Mobile 상태
     */
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartPercent, setTouchStartPercnet] = useState(0);

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
     * [2-7] 타임라인 '안' 에서 Mouse Up
     */
    const mouseUpInComponent = useCallback(() => {
        setHoverPointView(false);
        setDraggable(false);
        setMoveType(Constants.MOVE_TYPE.CENTER);
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
                setHoverPointView(false);
                setMoveType(Constants.MOVE_TYPE.CENTER);
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
        if (selectedPoint === null) {
            type = "current";
        } else {
            type = selectedPoint.attributes.type.value;
        }

        // ['shift']
        if (shiftKey) {
            switch (keyCode) {
                // ['i'] In Time Bar 선택
                case 73: {
                    setSelectedPoint(inPoint.current);
                    videoPlayer.currentTime = videoInTime;
                    break;
                }

                // ['o'] Out Time Bar 선택
                case 79: {
                    setSelectedPoint(outPoint.current);
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
    }, [selectedPoint, videoPlayer, videoInTime, videoOutTime, detailedTime, videoDuration]);

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
        setHoverPointView(true);
        setDraggable(true);
        setSelectedPoint(currentTarget);
    }, []);

    const mouseDownOutPoint = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        setHoverPointView(true);
        setDraggable(true);
        setSelectedPoint(currentTarget);
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
        }
        if (nativeEvent.movementX < 0) {
            setMoveType(Constants.MOVE_TYPE.LEFT);
        }
    }, []);

    const mouseMoveInOutContainer = useCallback((event) => {
        const { target, currentTarget, nativeEvent } = event;
        if ((target !== inPoint.current) && (target !== outPoint.current)) {
            if (draggable) {
                const containerWidth = currentTarget.offsetWidth;
                const pointWidth = selectedPoint.offsetWidth;
                const pointType = selectedPoint.attributes.type.value;
                const x = nativeEvent.offsetX;
                switch (pointType) {
                    case Constants.COMPONENT_TYPE.IN_POINT: {
                        const percent = calculateWidthToPercent(containerWidth, x, pointWidth, moveType);
                        // console.log("in percent : ", percent);
                        setHoverPointX(percent * 100);
                        setVideoInTime(videoDuration * percent);
                        break;
                    }
                    case Constants.COMPONENT_TYPE.OUT_POINT: {
                        const percent = calculateWidthToPercent(containerWidth, x, pointWidth, moveType);
                        // console.log("out percent : ", percent);
                        setHoverPointX(percent * 100);
                        setVideoOutTime(videoDuration * percent);
                        break;
                    }
                    default:
                        break;
                }
            }
        }
    }, [draggable, moveType, selectedPoint, videoDuration]);

    const mouseEnterInProgressBar = useCallback(() => {
        setHoverPointView(true);
    }, []);
    const mouseLeaveInProgressBar = useCallback(() => {
        setHoverPointView(false);
    }, []);

    const hoverPointTime = useMemo(() => {
        return videoDuration * hoverPointX / 100;
    }, [hoverPointX, videoDuration]);

    const clickFullScreen = useCallback(() => {
        console.log({ videoPlayer: videoPlayer });
        videoPlayer.webkitEnterFullScreen();
    }, [videoPlayer]);

    const clickRatePreference = useCallback(() => {
        setPlaySpeedRateFormView(!playSpeedRateFormView);
    }, [playSpeedRateFormView]);

    const changePlaySpeedRate = useCallback((speedRate) => {
        console.log("speedRate : ", parseInt(speedRate));
        videoPlayer.playbackRate = parseInt(speedRate);
        setVideoPlaybackRate(parseInt(speedRate));
    }, [videoPlayer]);

    return (
        <MalgnPlayerContainer
            tabIndex="0"
            onContextMenu={contextMenuInComponent}
            onMouseUp={mouseUpInComponent}
            onMouseLeave={mouseLeaveComponent}
            onMouseEnter={mouseEnterComponent}
            onKeyDown={keyDown}
        >
            {/* {readyState ? null : <div className="loading-cover">Loading...</div>} */}
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
                    playSpeedRateFormView={playSpeedRateFormView}
                    playbackRate={videoPlaybackRate}
                    button={{
                        play: playButton,
                        pause: pauseButton
                    }}
                    onPlayFull={onPlayFull}
                    onChangePlayBackRate={changePlaySpeedRate}
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
                        className={[
                            'in-point',
                            selectedPoint === inPoint.current && 'active'
                        ].join(' ')}
                        src={pinButton}
                        alt=""
                        draggable={false}
                        type={Constants.COMPONENT_TYPE.IN_POINT}
                        style={{
                            "left": inTimePercent + "%",
                        }}
                        onMouseDown={mouseDownInPoint}
                        onMouseMove={mouseMoveInPoint}
                    />
                    <img
                        ref={outPoint}
                        className={[
                            'out-point',
                            selectedPoint === outPoint.current && 'active'
                        ].join(' ')}
                        src={pinButton}
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
                    <div className="button-container">
                        {isPlayed
                            ? <img
                                className="play-button"
                                src={pauseButton}
                                alt=""
                                onClick={onPlayFull}
                            />
                            : <img
                                className="play-button"
                                src={playButton}
                                alt=""
                                onClick={onPlayFull}
                            />}
                    </div>
                    <div className="button-container">
                        {isPlayed
                            ? <img
                                src={sectionPauseButton}
                                alt=""
                                className="play-button"
                                onClick={onPlaySection}
                            />
                            : <img
                                src={sectionPlayButton}
                                alt=""
                                className="play-button"
                                onClick={onPlaySection}
                            />}
                    </div>
                    <div className="time-container">
                        <span>{calculateTime(currentTimePercent).substring(0, 8)} / {calculateTime(videoDuration).substring(0, 8)}</span>
                    </div>
                    <div className="space-container">

                    </div>

                    <div className="button-container">
                        <img
                            src={preferenceButton}
                            alt=""
                            className="play-button"
                            onClick={clickRatePreference}
                        />
                    </div>
                    <div className="button-container">
                        <img
                            src={fullScreenButton}
                            alt=""
                            className="play-button"
                            onClick={clickFullScreen}
                        />
                    </div>
                    <div className="volume-container">
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
                selectedBar={selectedPoint}
                calculateTime={calculateTime}
            />
        </ MalgnPlayerContainer>
    )
}

export default MalgnPlayer;