import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';

import styled from 'styled-components';

import VideoContent from './VideoContent';
import VideoCover from './VideoCover';
import ProgressPrint from './ProgressPrint';
import VideoTimeline from './VideoTimeline';
import ProgressBar from './ProgressBar';


import playButton from './image/play01.png';
import playButton1 from './image/play-button.png';
import pauseButton from './image/pause02.png';

const MalgnPlayerContainer = styled.div`
    padding: 20px 20px 20px 20px;
    border: 2px solid black;
    position: relative;

    -ms-user-select: none; 
    -moz-user-select: none;
    -khtml-user-select: none;
    /* -webkit-user-select: none; */
    user-select: none;
    
    /* div {
        padding: 0;
        margin: 0;
    } */

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
    }
`;

const printProp = (event) => {
    const { screenX, clientX, pageX, target, currentTarget } = event;
    console.log("Mouse Down : ", event);
    console.log("screenX : ", screenX);
    console.log("clientX : ", clientX);
    console.log("pageX : ", pageX);
}

const calculateWidthToPercent = (overallWidth, mouseX, barWidth, type) => {
    let currentX = 0.00;
    switch (type) {
        case "left":
            // console.log("left");
            currentX = (mouseX + barWidth * 0.6) / (overallWidth);
            break;
        case "right":
            // console.log("right");
            currentX = (mouseX - barWidth) / (overallWidth);
            break;
        case "center":
            // console.log("center");
            currentX = (mouseX - barWidth) / (overallWidth);
            break;
        default:
            break;
    }

    if (currentX < 0.00) {
        currentX = 0.00;
    } else if (currentX > 1.00) {
        currentX = 1.00;
    }

    return currentX;
}

const MalgnPlayer = ({ src, skim }) => {
    const [videoPlayMode, setVideoPlayMode] = useState("full");
    const [videoPlayer, setVideoPlayer] = useState(null);
    const [draggable, setDraggable] = useState(false);
    const [selectedBar, setSelectedBar] = useState(null);
    const [isPlayed, setIsPlayed] = useState(false);

    const [videoCurrentTime, setVideoCurrentTime] = useState(0.00);
    const [videoInTime, setVideoInTime] = useState(0.00);
    const [videoOutTime, setVideoOutTime] = useState(0.00);
    const [videoDuration, setVideoDuration] = useState(0.00);

    const [moveTypeInBar, setMoveTypeInBar] = useState("center");

    // useEffect(() => {
    //     console.log('in : ', videoInTime);
    //     return () => {
    //     }
    // }, [videoInTime]);
    // useEffect(() => {
    //     console.log('out : ', videoOutTime);
    //     return () => {
    //     }
    // }, [videoOutTime]);
    // useEffect(() => {
    //     console.log('videoCurrentTime : ', videoCurrentTime);
    //     return () => {
    //     }
    // }, [videoCurrentTime]);
    // useEffect(() => {
    //     console.log('videoPlayer : ', videoPlayer);
    //     return () => {
    //     }
    // }, [videoPlayer]);
    // useEffect(() => {
    //     console.log('videoDuration : ', videoDuration);
    //     return () => {
    //     }
    // }, [videoDuration]);

    const onLoadedMetadata = useCallback((player) => {
        const { duration, readyState } = player;
        setVideoPlayer(player);
        setVideoDuration(duration);
        setVideoOutTime(duration);
    }, []);

    /**
     * [1] 비디오 관련 Functions
     */
    const onPlayFull = useCallback(() => {
        const { paused } = videoPlayer;
        paused ? videoPlayer.play() : videoPlayer.pause();
        setIsPlayed(!videoPlayer.paused);
        setVideoPlayMode("full");
    }, [videoPlayer]);

    const onPlaySection = useCallback(() => {
        const { paused } = videoPlayer;
        if(paused) {
            videoPlayer.currentTime = videoInTime;
            videoPlayer.play();
            setIsPlayed(true);
        } else {
            videoPlayer.pause();
            setIsPlayed(false);
        }
        setVideoPlayMode("section");
    }, [videoInTime, videoPlayer]);

    const onCanPlay = useCallback((player) => {
        // console.log("onCanPlay()");
    }, []);

    const onTimeUpdate = useCallback((player) => {
        setVideoCurrentTime(player.currentTime);
        if (videoPlayMode === "section") {
            if (player.currentTime > videoOutTime) {
                player.pause();
                setIsPlayed(false);
            }
        }

    }, [videoOutTime, videoPlayMode]);

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
     * [2] 타임라인 관련 Functions
     */
    const mouseDownInTimeline = useCallback(({ nativeEvent, target, currentTarget }) => {

        // const { nativeEvent, target, currentTarget } = event;
        // console.log("outter Event : ", barType);
        const type = target.attributes.type.value;
        const barList = currentTarget.lastElementChild.children;
        const timelineWidth = currentTarget.offsetWidth;
        const { offsetX } = nativeEvent;
        const percent = calculateWidthToPercent(
            timelineWidth, offsetX, barList[0].offsetWidth, moveTypeInBar
        );
        // setVideoCurrentTime(percent * videoDuration);
        // videoPlayer.currentTime = percent * videoDuration;
        // setSelectedBar(barList[0]);
        switch (type) {
            case "timeline": {
                // console.log("timeline");
                setVideoCurrentTime(percent * videoDuration);
                videoPlayer.currentTime = percent * videoDuration;
                setSelectedBar(barList[0]);
                break;
            }
            case "current": {
                // console.log("current");
                setSelectedBar(barList[0]);
                break;
            }
            case "in": {
                // console.log("in");
                setSelectedBar(barList[1]);
                break;
            }
            case "out": {
                // console.log("out");
                setSelectedBar(barList[2]);
                break;
            }
            default:
                break;
        }

        setDraggable(true);
    }, [moveTypeInBar, videoDuration, videoPlayer]);

    const mouseDownCurrentBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        console.log("mouseDownCurrentBar");
        // setDraggable(true);
        // setSelectedBar(target);
    }, []);
    const mouseDownInBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        console.log("mouseDownInBar");
        // console.log("target : ", { target: target });
        // setDraggable(true);
        // setSelectedBar(target);
    }, []);
    const mouseDownOutBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        // console.log("target : ", {target: target});
        console.log("mouseDownOutBar");
        // setDraggable(true);
        // setSelectedBar(target);
    }, []);

    const mouseEnter = useCallback((event) => {
        setDraggable(false);
    }, []);
    const mouseLeave = useCallback((event) => {
        setDraggable(true);
    }, []);

    const mouseMoveInBar = useCallback((type) => {
        if (draggable) {
            setMoveTypeInBar(type);
        }
    }, [draggable]);

    const mouseMoveInComponent = useCallback((event) => {
        const { nativeEvent, target, currentTarget } = event;
        if (draggable) {
            const moveType = moveTypeInBar;
            const timelineWidth = target.offsetWidth;
            const barWidth = selectedBar.offsetWidth;
            const x = nativeEvent.offsetX;
            const type = selectedBar.attributes.type.value;
            console.log("type : ", type);
            switch (type) {
                case "current": {
                    const percent = calculateWidthToPercent(timelineWidth, x, barWidth, moveType);
                    videoPlayer.currentTime = percent * videoDuration;
                    setVideoCurrentTime(percent * videoDuration);
                    break;
                }
                case "in": {
                    const percent = calculateWidthToPercent(timelineWidth, x, barWidth, moveType);
                    setVideoInTime(percent * videoDuration);
                    break;
                }
                case "out": {
                    const percent = calculateWidthToPercent(timelineWidth, x, barWidth, moveType);
                    setVideoOutTime(percent * videoDuration);
                    break;
                }
                default:
                    break;
            }
        }
    }, [selectedBar, draggable, moveTypeInBar, videoDuration, videoPlayer]);

    const mouseLeaveComponent = useCallback(({ screenX, clientX, pageX, target, currentTarget, nativeEvent }) => {
        if (draggable) {
            window.addEventListener("mouseup", (event) => {
                setDraggable(false);
            })
        }
    }, [draggable]);

    const mouseEnterComponent = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        if (draggable) {
            // console.log("mouseLeaveInBackground");
        }
    }, [draggable]);

    const mouseUpInComponent = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        setDraggable(false);
    }, []);

    const contextMenuInComponent = useCallback((event) => {
        event.preventDefault();
    }, []);

    return (
        <MalgnPlayerContainer
            onContextMenu={contextMenuInComponent}
            onMouseUp={mouseUpInComponent}
            onMouseLeave={mouseLeaveComponent}
            onMouseEnter={mouseEnterComponent}
        >
            <ProgressPrint
                currentTime={videoCurrentTime}
                currentTimePercent={currentTimePercent}
                inTime={videoInTime}
                inTimePercent={inTimePercent}
                outTime={videoOutTime}
                outTimePercent={outTimePercent}
            />
            <div className="video-container">
                <VideoContent
                    src={src}
                    onTimeUpdate={onTimeUpdate}
                    onCanPlay={onCanPlay}
                    onLoadedMetadata={onLoadedMetadata}
                    percent={currentTimePercent}
                    className=""
                />
                <VideoCover
                    className="radius"
                    onClick={onPlayFull}
                    isPlayed={isPlayed}
                    button={{ play: playButton1, pause: pauseButton }}
                    percent={currentTimePercent}
                />

            </div>
            <div className="timeline-container">
                <VideoTimeline
                    skim={skim}
                    currentTimePercent={currentTimePercent}
                    inTimePercent={inTimePercent}
                    outTimePercent={outTimePercent}
                    onMouseDownInTimeline={mouseDownInTimeline}
                    onMouseDownCurrentBar={mouseDownCurrentBar}
                    onMouseDownInBar={mouseDownInBar}
                    onMouseDownOutBar={mouseDownOutBar}
                    onMouseMoveInComponent={mouseMoveInComponent}
                    onMouseMoveInBar={mouseMoveInBar}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    onPlaySection={onPlaySection}

                // setCurrentTimeBar={setCurrentTimeBar}
                // setInTimeBar={setInTimeBar}
                // setOutTimeBar={setOutTimeBar}
                />
            </div>
        </ MalgnPlayerContainer>
    )
}

export default MalgnPlayer;