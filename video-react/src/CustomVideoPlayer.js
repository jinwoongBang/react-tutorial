import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';

import styled from 'styled-components';

import PrograssBar from './PrograssBar';

const CustomVideoPlayerContainer = styled.div`
    overflow: hidden;
    
    video {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        padding: 0;
        margin: 0;
        /* box-shadow: 5px 5px 5px gray; */
    }
    div {
        padding: 0;
        margin: 0;
    }

    .border {
        border: 1px solid tomato;
    }

    .video-container {
        position: relative;
    }
    
    .video-time-bar {
        position: relative;
        height: 1vh;
        background-color: tomato;
    }
    .video-cap {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        background-color: black;
        /* background-color: #1D84FF; */
        opacity: 0.8;
        /* padding: 10px 10px 10px 10px; */
    }

    /* [1] Timeline Container*/
    .time-line-container {
        position: relative;
        z-index: 0;
        overflow: hidden;
        height: 20vw;
        width: 100%;
        /* border: 20px solid #1D84FF; */
    }

    /* [2] Time Bar's Thumbnail image */
    .time-img-container {
        position: relative;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .time-img-cap {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.0;
    }

    .time-img {
        position: relative;
        z-index: 0;
        width: 100%;
    } 

    /* [3] Time Bar */
    .time-bar-container {
        position: absolute;
        z-index: 3;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: tomato;
        height: 100%;
        width: 1%;
    }
    .time-bar-button {
        width: 100%;
        height: 100%;
        opacity: 0.0;
    }
    .time-bar-button:hover, .time-bar-button:active {
        cursor: col-resize;
    }
`;

const printProp = (event) => {
    const { screenX, clientX, pageX, target, currentTarget } = event;
    console.log("Mouse Down : ", event);
    console.log("screenX : ", screenX);
    console.log("clientX : ", clientX);
    console.log("pageX : ", pageX);
}

const calculatePercent = (width, x) => {
    let currentX = (x) / width;
    // if (currentX < 0.00) {
    //     currentX = 0.00;
    // } else if (currentX > 1.00) {
    //     currentX = 1.00;
    // }

    return currentX;
}

const calculateProgressPercent = (currentTime, duration) => {

}

const CustomVideoPlayer = ({ src, skim }) => {
    const videoContainer = useRef(null);
    const timelineContainer = useRef(null);
    const timeBarContainer = useRef(null);

    const [draggable, setDraggable] = useState(false);
    const [isPlayed, setIsPlayed] = useState(false);

    const [videoCurrentTime, setVideoCurrentTime] = useState(0.00);
    const [videoDuration, setVideoDuration] = useState(0.00);
    const [videoReadyState, setVideoReadyState] = useState(0);

    useEffect(() => {
        console.log('init playerContainer');
        return () => {
            const { duration } = videoContainer.current;
            console.log('flush playerContainer : ');
            setVideoDuration(duration);
        }
    }, []);

    // useEffect(() => {
    //     console.log('init playerContainer');
    // });


    /**
     * [1] 비디오 관련 Functions
     */
    const onClickPlay = useCallback(() => {
        const player = videoContainer.current;
        player.play();
        setIsPlayed(!player.paused);
    }, []);
    const onClickPause = useCallback(() => {
        const player = videoContainer.current;
        player.pause();
        setIsPlayed(!player.paused);
    }, []);
    const onCanPlay = useCallback(() => {
        const { duration, readyState } = videoContainer.current;
        setVideoDuration(duration);
    }, []);

    const onTimeUpdate = useCallback(() => {
        // videoContainer.current.currentTime = currentX * videoDuration;
        setVideoCurrentTime(videoContainer.current.currentTime);
    }, []);

    const timePercent = useMemo(() => {
        return videoCurrentTime / videoDuration * 100;
    }, [videoCurrentTime, videoDuration]);

    /**
     * [2] 타임라인 관련 Functions
     */
    const mouseUpInBackground = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        setDraggable(false);
    }, []);

    const mouseDownInTimeline = useCallback(({ nativeEvent, target }) => {
        console.log("mouseDownInTimeline()");
        const { offsetWidth: timelineWidth } = target;
        const { offsetWidth: timeBarWidth } = timeBarContainer.current;
        const currentX = calculatePercent(timelineWidth, nativeEvent.offsetX, timeBarWidth);
        // console.log("currentX : ", currentX);
        setVideoCurrentTime(currentX * videoDuration);
        videoContainer.current.currentTime = currentX * videoDuration;
        setDraggable(true);
    }, [videoDuration]);

    const mouseDownInBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        console.log("mouseDownInBar()");
        setDraggable(true);
    }, []);

    const mouseMoveInBackground = useCallback(({ target, clientX, currentTarget, nativeEvent }) => {

        if (draggable) {
            const { offsetLeft } = currentTarget.offsetParent;
            const offsetX = clientX - offsetLeft;
            const { offsetWidth: timelineWidth } = currentTarget;
            const { offsetWidth: timeBarWidth } = timeBarContainer.current;
            const currentX = calculatePercent(timelineWidth, offsetX, timeBarWidth);
            videoContainer.current.currentTime = currentX * videoDuration;
            setVideoCurrentTime(currentX * videoDuration);
        }
    }, [draggable, videoDuration]);

    const contextMenuInBackground = useCallback((event) => {
        event.preventDefault();
    }, []);

    return (
        <CustomVideoPlayerContainer
            onContextMenu={contextMenuInBackground}
            onMouseMove={mouseMoveInBackground}
            onMouseUp={mouseUpInBackground}
        >
            <div className="video-container">
                <video
                    ref={videoContainer}
                    controls={true}
                    preload="auto"
                    onTimeUpdate={onTimeUpdate}
                    onCanPlay={onCanPlay}
                >
                    <source src={src}></source>
                </video>
                <div className="video-cap">
                    <div>
                        {isPlayed ? <button onClick={onClickPause}>Pause</button> : <button onClick={onClickPlay}>Play</button>}
                    </div>
                    <div>
                        <p style={{ "color": "white" }}>진행 시간 : {videoCurrentTime} 초</p>
                        <p style={{ "color": "white" }}>진행 률 : {timePercent + "%"}</p>
                    </div>
                </div>
            </div>
            <div
                className="time-line-container"
                ref={timelineContainer}
            >
                <PrograssBar timePercent={timePercent} />
                <div className="time-img-container">
                    <img className="time-img" src={skim} />
                </div>
                <div className="time-img-cap" onMouseDown={mouseDownInTimeline} />
                <div
                    ref={timeBarContainer}
                    className="time-bar-container"
                    style={{ "left": timePercent + "%" }}
                >
                    <button
                        className="time-bar-button"
                        onMouseDown={mouseDownInBar}
                    />
                </div>
            </div>

        </CustomVideoPlayerContainer>
    )
}

export default CustomVideoPlayer;