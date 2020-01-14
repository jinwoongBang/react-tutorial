import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';

import styled from 'styled-components';

import VideoContent from './VideoContent';
import VideoCover from './VideoCover';
import ProgressPrint from './ProgressPrint';
import VideoTimeline from './VideoTimeline';
import ProgressBar from './ProgressBar';

import { calculateTime, calculateWidthToPercent} from './util/CommonUtils';


import playButton from './image/play01.png';
import playButton1 from './image/play-button-white-08.png';
import pauseButton from './image/pause02.png';
import pauseButton1 from './image/play-button-white-09.png';
import volumeButton0 from './image/volume-button-white-0.png';
import volumeButton1 from './image/volume-button-white-1.png';
import volumeButton2 from './image/volume-button-white-2.png';
import volumeButton3 from './image/volume-button-white-3.png';

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
        font-size: 0.8em;
    }
    @media (min-width: 576px) and (max-width: 767px) {
        font-size: 0.7em;
    }
    @media (min-width: 375px) and (max-width: 575px) {
        font-size: 0.6em;
    }
    @media (max-width: 374px) {
        font-size: 0.5em;
    }

    .border {
        border: 1px solid tomato;
    }
    .radius {
        border-radius: 10px 10px 10px 10px;
    }
    .video-container {
        position: relative;
    }
    .timeline-container {
        position: relative;
        height: 14vw;
    }
`;

// const calculateWidthToPercent = (overallWidth, mouseX, barWidth, type) => {
//     let percent = 0.00;
//     switch (type) {
//         case "left":
//             percent = (mouseX + barWidth * 0.6) / (overallWidth);
//             break;
//         case "right":
//             percent = (mouseX - barWidth) / (overallWidth);
//             break;
//         case "center":
//             percent = (mouseX - barWidth) / (overallWidth);
//             break;
//         default:
//             break;
//     }

//     if (percent < 0.00) {
//         percent = 0.00;
//     } else if (percent > 1.00) {
//         percent = 1.00;
//     }

//     return percent;
// }

// const calculateTime = (seconds, format) => {
//     let minutes = seconds / 60.00;
//     let hours = minutes / 60.00;
//     if (minutes < 1.00) {
//         return seconds;
//     } else {
//         if (hours < 1.00) {
//             return minutes;
//         } else {
//             return hours;
//         }
//     }
// }
// const calculateTime = (seconds) => {
//     var date = new Date(seconds * 1000);
//     var hh = date.getUTCHours();
//     var mm = date.getUTCMinutes();
//     var ss = date.getSeconds();
//     return hh + ":" + mm + ":" + ss;
// }

/**
 * 
 * @param {*} param0 
 */
const MalgnPlayer = ({ src, skim }) => {

    /*
     * [1] Web 상태
     */
    const [videoPlayer, setVideoPlayer] = useState(null);
    const [videoReadyState, setVideoReadyState] = useState(false);
    // "full" : 전체 재생, "section" : 구간 재생
    const [videoPlayMode, setVideoPlayMode] = useState("full");
    const [draggable, setDraggable] = useState(false);
    const [selectedBar, setSelectedBar] = useState(null);
    const [isPlayed, setIsPlayed] = useState(false);

    const [videoCurrentTime, setVideoCurrentTime] = useState(0.00);
    const [videoInTime, setVideoInTime] = useState(0.00);
    const [videoOutTime, setVideoOutTime] = useState(0.00);
    const [videoDuration, setVideoDuration] = useState(0.00);
    const [videoVolume, setVideoVolume] = useState(0.00);
    const [timeControlVolume, setTimeControlVolume] = useState(1);
    // "center" : 타임라인을 클릭하여 현재 시간을 변경 할 경우
    // "left"   : 시간 표시 막대를 왼쪽으로 움직이는 중
    // "right"   : 시간 표시 막대의 오른쪽으로 움직이는 중
    const [moveTypeInBar, setMoveTypeInBar] = useState("center");
    const [currentTimeBar, setCurrentTimeBar] = useState(null);
    const [inTimeBar, setInTimeBar] = useState(null);
    const [outTimeBar, setOutTimeBar] = useState(null);

    /*
     * [2] Mobile 상태
     */
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartPercent, setTouchStartPercnet] = useState(0);

    useEffect(() => {
        console.log('videoPlayMode : ', videoPlayMode);
        return () => {
        }
    }, [videoPlayMode]);

    /**
     * [0] 비디오 메타데이터 최초 로드 및 상태 초기화(init)
     */
    const onLoadedMetadata = useCallback((player) => {
        const { duration, readyState, volume } = player;
        setVideoPlayer(player);
        setVideoDuration(duration);
        setVideoOutTime(duration);
        setVideoVolume(volume);
        setVideoReadyState(true);
    }, []);

    /**
     * [1] 비디오 재생 관련 Functions
     */

    /*
     * [1-1] 전체 재생 (full play)
     */
    const onPlayFull = useCallback((event) => {
        const { paused } = videoPlayer;
        paused ? videoPlayer.play() : videoPlayer.pause();
        setIsPlayed(!videoPlayer.paused);
        setVideoPlayMode("full");
    }, [videoPlayer]);

    /*
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
        setVideoPlayMode("section");
    }, [videoInTime, videoPlayer]);

    /*
     * [1-3] 현재 재생 중인 시간 상태 업데이트
     */
    const onTimeUpdate = useCallback((player) => {
        setVideoCurrentTime(player.currentTime);
        // 구간 재생일 경우 Out Time 에서 일시정지
        if (videoPlayMode === "section") {
            if (player.currentTime > videoOutTime) {
                player.pause();
                setIsPlayed(false);
            }
        }

    }, [videoOutTime, videoPlayMode]);

    /*
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

    /*
     * [2-1] 타임라인에서 클릭 이벤트 발생
     */
    const mouseDownInBottomTimeline = useCallback(({ nativeEvent, target, currentTarget }) => {
        const type = target.attributes.type.value;
        const { offsetX } = nativeEvent;
        // console.log("test : ", offsetX);
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

    /*
     * [2-2] 현재 시간 막대를 클릭
     */
    const mouseDownCurrentBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        setDraggable(true);
        setSelectedBar(currentTarget);
    }, []);
    /*
     * [2-3] In Time 막대를 클릭
     */
    const mouseDownInBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        setDraggable(true);
        setSelectedBar(currentTarget);
    }, []);
    /*
     * [2-4] Out Time 막대를 클릭
     */
    const mouseDownOutBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        setDraggable(true);
        setSelectedBar(currentTarget);
    }, []);
    /*
     * [2-5] 막대 기준 오른쪽으로 움직이는지 왼쪽으로 움직이는지
     */
    const mouseMoveInBar = useCallback((type) => {
        if (draggable) {
            setMoveTypeInBar(type);
        }
    }, [draggable]);

    /*
     * [2-6] 선택된 막대의 위치를 변경 (막대 드래그) 
     */
    const mouseMoveInComponent = useCallback((event) => {
        const { nativeEvent, target, currentTarget } = event;
        if (draggable) {
            const moveType = moveTypeInBar;
            const timelineWidth = target.offsetWidth;
            const barWidth = selectedBar.offsetWidth;
            const x = nativeEvent.offsetX;
            const type = selectedBar.attributes.type.value;
            switch (type) {
                case "current": {
                    const percent = calculateWidthToPercent(timelineWidth, x, barWidth, moveType);
                    videoPlayer.currentTime = percent * videoDuration;
                    setVideoCurrentTime(percent * videoDuration);
                    break;
                }
                case "in": {
                    const percent = calculateWidthToPercent(timelineWidth, x, barWidth, moveType);
                    let time = percent * videoDuration > videoOutTime ? videoOutTime : percent * videoDuration;
                    videoPlayer.currentTime = time;
                    setVideoInTime(time);
                    break;
                }
                case "out": {
                    const percent = calculateWidthToPercent(timelineWidth, x, barWidth, moveType);
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

    const onTouchStart = useCallback((event) => {
    }, []);
    const onTouchMove = useCallback((event) => {
    }, []);
    const onTouchEnd = useCallback((event) => {
    }, []);

    /*
     * [2-7] 타임라인 '안' 에서 Mouse Up
     */
    const mouseUpInComponent = useCallback(() => {
        setDraggable(false);
        setMoveTypeInBar("center");
    }, []);

    /*
     * [2-8] 타임라인 '밖' 에서 Mouse Up
     */
    const mouseEnterComponent = useCallback((event) => {
        event.currentTarget.addEventListener("wheel", (event) => {
            event.preventDefault();
        }, { passive: false, once: false })
    }, []);

    const mouseLeaveComponent = useCallback(() => {
        if (draggable) {
            window.addEventListener("mouseup", (event) => {
                setDraggable(false);
                setMoveTypeInBar("center");
            })
        }
    }, [draggable]);

    /*
     * [2-9] 우클릭 방지
     */
    const contextMenuInComponent = useCallback((event) => {
        event.preventDefault();
    }, []);

    const mouseDownInTopTimeline = useCallback((event) => {
        const { nativeEvent, target, currentTarget } = event;
        const { offsetX } = nativeEvent;
        const timelineWidth = currentTarget.offsetWidth;
        const percent = calculateWidthToPercent(
            timelineWidth, offsetX, 1, "center"
        );
        setVideoCurrentTime(percent * videoDuration);
        videoPlayer.currentTime = percent * videoDuration;
    });

    const mouseDownInVolume = useCallback((event) => {
        console.log("mouseDownInVolume()");
        const { nativeEvent, target, currentTarget } = event;
        const { offsetX } = nativeEvent;
        const timelineWidth = currentTarget.offsetWidth;
        const percent = calculateWidthToPercent(timelineWidth, offsetX, 1, "center");
        console.log("percent : ", percent * 100);
        // console.log({videoPlayer: videoPlayer});
        setVideoVolume(percent * 100);
        videoPlayer.volume = percent;
    });

    const changeVolume = useCallback((event, volume) => {
        videoPlayer.volume = volume;
        setVideoVolume(volume * 100.00);
    }, [videoPlayer]);

    /*
     *  [4] 단축키
     */
    // shiftKey, altKey, ctrlKey
    // i = 73, o = 79, MacFunction = 91
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
                setVideoPlayMode("full");
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
                    videoPlayer.currentTime -= timeControlVolume;
                }
                if (type === "in") {
                    let time = videoInTime - timeControlVolume;
                    if (time <= 0) {
                        time = 0;
                    }
                    videoPlayer.currentTime = time;
                    setVideoInTime(time);
                }
                if (type === "out") {
                    let time = videoOutTime - timeControlVolume;
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
                let timeControl = parseFloat((timeControlVolume + 0.1).toFixed(2));

                setTimeControlVolume(timeControl);
                break;
            }
            // [오른쪽 방향키]
            case 39: {
                if (type === "current") {
                    videoPlayer.currentTime += timeControlVolume;
                }
                if (type === "in") {
                    let time = videoInTime + timeControlVolume;
                    if (time >= videoOutTime) {
                        time = videoOutTime;
                    }
                    videoPlayer.currentTime = time;
                    setVideoInTime(time);
                }
                if (type === "out") {
                    let time = videoOutTime + timeControlVolume
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
                let timeControl = parseFloat((timeControlVolume - 0.1).toFixed(2));
                if (timeControl <= 0) {
                    timeControl = 0;
                }
                setTimeControlVolume(timeControl);
                break;
            }

            default:
                break;
        }
    }, [currentTimeBar, inTimeBar, outTimeBar, selectedBar, timeControlVolume, videoDuration, videoInTime, videoOutTime, videoPlayer]);

    const onWheel = useCallback((event) => {
        const { deltaX, deltaY, deltaZ, nativeEvent } = event;
        let timeControl = parseFloat((timeControlVolume + deltaY * 0.1).toFixed(2))
        if (timeControl <= 0) {
            timeControl = 0;
        }
        setTimeControlVolume(timeControl);
    }, [timeControlVolume]);

    return (
        <MalgnPlayerContainer
            onContextMenu={contextMenuInComponent}
            onMouseUp={mouseUpInComponent}
            onMouseLeave={mouseLeaveComponent}
            onMouseEnter={mouseEnterComponent}
            onWheel={onWheel}
            onKeyDown={keyDown}
            tabIndex="0"
        >
            <div className="video-container">
                <VideoContent
                    src={src}
                    onTimeUpdate={onTimeUpdate}
                    onLoadedMetadata={onLoadedMetadata}
                    setVideoReadyState={setVideoReadyState}
                    percent={currentTimePercent}
                    className=""
                />
                <VideoCover
                    className=""
                    onPlayFull={onPlayFull}
                    onMouseDownInVolume={mouseDownInVolume}
                    onMouseDownInTimeline={mouseDownInTopTimeline}
                    onChangeVolume={changeVolume}
                    onPlaySection={onPlaySection}

                    isPlayed={isPlayed}
                    button={{
                        play: playButton1,
                        pause: pauseButton1,
                        volumes: [
                            volumeButton0,
                            volumeButton1,
                            volumeButton2,
                            volumeButton3,
                        ]
                    }}
                    percent={currentTimePercent}
                    currentTime={videoCurrentTime}
                    duration={videoDuration}
                    volume={videoVolume}
                    readyState={videoReadyState}
                />

            </div>
            <div className="timeline-container">
                <VideoTimeline
                    skim={skim}
                    isPlayed={isPlayed}
                    currentTimePercent={currentTimePercent}
                    inTimePercent={inTimePercent}
                    outTimePercent={outTimePercent}
                    onMouseDownInTimeline={mouseDownInBottomTimeline}
                    onMouseDownCurrentBar={mouseDownCurrentBar}
                    onMouseDownInBar={mouseDownInBar}
                    onMouseDownOutBar={mouseDownOutBar}
                    onMouseMoveInComponent={mouseMoveInComponent}
                    onMouseMoveInBar={mouseMoveInBar}

                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}

                    setCurrentTimeBar={setCurrentTimeBar}
                    setInTimeBar={setInTimeBar}
                    setOutTimeBar={setOutTimeBar}
                />
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
                timeControlVolume={timeControlVolume}
                selectedBar={selectedBar}
                calculateTime={calculateTime}
            />
        </ MalgnPlayerContainer>
    )
}

export default MalgnPlayer;