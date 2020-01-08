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
    
    div {
        padding: 0;
        margin: 0;
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
    }
`;

const printProp = (event) => {
    const { screenX, clientX, pageX, target, currentTarget } = event;
    console.log("Mouse Down : ", event);
    console.log("screenX : ", screenX);
    console.log("clientX : ", clientX);
    console.log("pageX : ", pageX);
}

const widthToPercent = (width, x, barWidth) => {
    let currentX = (x - barWidth / 2) / (width);
    if (currentX < 0.00) {
        currentX = 0.00;
    } else if (currentX > 1.00) {
        currentX = 1.00;
    }

    return currentX;
}

const MalgnPlayer = ({ src, skim }) => {
    // const videoContainer = useRef(null);
    // const timelineContainer = useRef(null);
    // const timeBarContainer = useRef(null);

    const [videoPlayer, setVideoPlayer] = useState(null);
    const [draggable, setDraggable] = useState(false);
    const [selectedBar, setSelectedBar] = useState(null);
    const [isPlayed, setIsPlayed] = useState(false);

    const [videoCurrentTime, setVideoCurrentTime] = useState(0.00);
    const [videoInTime, setVideoInTime] = useState(0.00);
    const [videoOutTime, setVideoOutTime] = useState(0.00);
    const [videoDuration, setVideoDuration] = useState(0.00);

    useEffect(() => {
        console.log('init Video player');
        return () => {
        }
    }, [videoOutTime]);

    const onLoadedMetadata = useCallback((player) => {
        const { duration, readyState } = player;
        setVideoPlayer(player);
        setVideoDuration(duration);
        setVideoOutTime(duration);
    }, []);

    /**
     * [1] 비디오 관련 Functions
     */
    const onClickPlay = useCallback(() => {
        const { paused } = videoPlayer;
        paused ? videoPlayer.play() : videoPlayer.pause();
        setIsPlayed(!videoPlayer.paused);
    }, [videoPlayer]);

    const onCanPlay = useCallback((player) => {
        console.log("onCanPlay()");
    }, []);

    const onTimeUpdate = useCallback((player) => {
        setVideoCurrentTime(player.currentTime);
    }, []);

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
    const mouseDownInTimeline = useCallback((event) => {
        const { nativeEvent, target, currentTarget } = event;
        const type = target.attributes.type;
        console.log("선택된 엘리먼트 : ", { target: target });
        console.log("이벤트가 설정된 엘리먼트 : ", { currentTarget: currentTarget });

        const barList = currentTarget.lastElementChild.children;
        const timelineWidth = currentTarget.offsetWidth;
        const { offsetX } = nativeEvent;

        switch (type) {
            case undefined:
                const currentBar = barList[0];
                const currentPercent = widthToPercent(timelineWidth, offsetX, currentBar.offsetWidth);
                setVideoCurrentTime(currentPercent * videoDuration);
                videoPlayer.currentTime = currentPercent * videoDuration;
                setSelectedBar(currentBar);
                setDraggable(true);
                break;
            case "in":
                const inBar = barList[0];
                const inPercent = widthToPercent(timelineWidth, offsetX, currentBar.offsetWidth);
                setVideoCurrentTime(currentPercent * videoDuration);
                videoPlayer.currentTime = currentPercent * videoDuration;
                setSelectedBar(currentBar);
                setDraggable(true);
                break;
            case "out":
                break;
            default:
                break;
        }
        // }
        // const barWidth = currentTarget.lastChildren.children[0].offsetWidth;
        // const currentPercent = widthToPercent(timelineWidth, offsetX, barWidth);
        // setVideoCurrentTime(currentPercent * videoDuration);
        // videoPlayer.currentTime = currentPercent * videoDuration;
        // // [1] nextSibling => in-Bar
        // // [2] nextSibling.nextSibling => out-Bar
        // // [3] nextSibling.nextSibling.nextSibling => current-Bar
        // setSelectedBar(target.nextSibling.children[0]);
        // setDraggable(true);
    }, [videoDuration, videoPlayer]);

    const mouseDownCurrentBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        // setDraggable(true);
        // setSelectedBar(target);
    }, []);
    const mouseDownInBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        // console.log("target : ", {target: target});
        // setDraggable(true);
        // setSelectedBar(target);
    }, []);
    const mouseDownOutBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        // setDraggable(true);
        // setSelectedBar(target);
    }, []);

    const mouseEnter = useCallback((event) => {
        setDraggable(false);
    });
    const mouseLeave = useCallback((event) => {
        setDraggable(true);
    });

    const mouseMoveInComponent = useCallback((event) => {
        const { nativeEvent, target } = event;
        // const x = nativeEvent.offsetX;
        // console.log("nativeEvent : ", {nativeEvent: nativeEvent});
        // console.log("target : ", {target: target});
        // console.log("nativeEvent : ", nativeEvent)
        // console.log("test");
        // console.log({selectedBar: selectedBar})
        // event.stopPropagation();

        if (draggable && target !== selectedBar) {
            console.log("test")
            const timelineWidth = target.offsetWidth;
            const barWidth = selectedBar.offsetWidth;
            const x = nativeEvent.offsetX;
            const type = selectedBar.attributes.type.value;
            // console.log(type);
            // console.log("nativeEvent : ", {nativeEvent: nativeEvent});
            // console.log("offsetWidth : ", timelineWidth);
            // console.log("barWidth : ", barWidth);
            // console.log("attributes : ", type);
            const percent = widthToPercent(timelineWidth, x, barWidth);
            switch (type) {
                case "current":
                    videoPlayer.currentTime = percent * videoDuration;
                    setVideoCurrentTime(percent * videoDuration);
                    break;
                case "in":
                    setVideoInTime(percent * videoDuration);
                    break;
                case "out":
                    setVideoOutTime(percent * videoDuration);
                    break;
                default:
                    break;
            }
        }
    }, [draggable, selectedBar, videoDuration, videoPlayer]);

    // const mouseMoveInComponent = useCallback(({ target, clientX, currentTarget, nativeEvent }) => {
    //     if (draggable) {
    //         const timelineWidth = target.offsetWidth;
    //         const barWidth = target.nextSibling.children[0].offsetWidth;
    //         const x = nativeEvent.offsetX;
    //         const currentPercent = widthToPercent(timelineWidth, x, barWidth);
    //         videoPlayer.currentTime = currentPercent * videoDuration;
    //         setVideoCurrentTime(currentPercent * videoDuration);
    //     }
    // }, [draggable, videoDuration, videoPlayer]);

    const mouseLeaveComponent = useCallback(({ screenX, clientX, pageX, target, currentTarget, nativeEvent }) => {
        if (draggable) {
            window.addEventListener("mouseup", (event) => {
                setDraggable(false);
            })
        }
    }, [draggable]);

    const mouseEnterComponent = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        if (draggable) {
            console.log("mouseLeaveInBackground");
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
                    onClick={onClickPlay}
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
                    onMouseMove={mouseMoveInComponent}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                // setCurrentTimeBar={setCurrentTimeBar}
                // setInTimeBar={setInTimeBar}
                // setOutTimeBar={setOutTimeBar}
                />
            </div>
        </ MalgnPlayerContainer>
    )
}

export default MalgnPlayer;