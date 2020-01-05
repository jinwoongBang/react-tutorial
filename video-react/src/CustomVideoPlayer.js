import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
/* import imageSource from './image/IMG_7839.JPG'; */

import styled from 'styled-components';

const CustomVideoPlayerContainer = styled.div`
    border: 1px solid tomato;
    padding: 50px 50px 50px 50px;
    overflow: hidden;
    

    video {
        position: relative;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 20px 20px 20px 20px;
        width: 100%;
        padding: 0;
        margin: 0;
        box-shadow: 5px 5px 5px gray;
    }
    div {
        padding: 0;
        margin: 0;
    }
    .video-container {
        position: relative;
    }
    .video-time-bar {
        position: relative;
        width: 100%;
        height: 1vh;
        background-color: tomato;
    }
    .video-cap {
        position: relative;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        background-color: #1D84FF;
        opacity: 1.0;
        padding: 10px 10px 10px 10px;
    }

    .border {
        border: 1px solid tomato;
    }

    /* [1] Timeline Container*/
    .time-line-container {
        position: relative;
        z-index: 0;
        overflow: hidden;
        height: 20vw;
        width: 100%;
        border: 20px solid #1D84FF;
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
        height: 20vh;
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

const calculatePercent = (width, clientX) => {
    let currentX = (clientX - 20) / width * 100;
    currentX = currentX < 0 ? 0 : currentX;
    currentX = currentX > 100 ? 100 : currentX;

    return currentX;
}

const CustomVideoPlayer = ({ src, skim }) => {
    const playerContainer = useRef(null);
    const timelineContainer = useRef(null);
    const timeBarContainer = useRef(null);

    const [timeBarX, setTimeBarX] = useState("");
    const [timePercent, setTimePercent] = useState(10.00);
    const [mouseY, setMouseY] = useState(10.00);
    const [draggable, setDraggable] = useState(false);

    const [videoCurrentTime, setVideoCurrentTime] = useState(0.00);
    const [videoDuration, setVideoDuration] = useState(0.00);
    const [isPlayed, setIsPlayed] = useState(false);

    useEffect(() => {
        const {
            buffered,
            readyState,
            currentTime,
            duration,
            paused,
            played,
            onwaiting
        } = playerContainer.current;
        const { offsetWidth } = timelineContainer.current;
        console.log('init playerContainer');
        console.log("width : ", offsetWidth)
        /*
            buffered: TimeRanges {length: 1}
            readyState: 4
            seeking: false
            currentTime: 0
            duration: 64.767979
            paused: true
            played: TimeRanges {length: 0}
            ended: false
            autoplay: false
            loop: false
            onwaiting: null
        */
       /*
            buffered,
            readyState,
            currentTime,
            duration,
            paused,
            played,
            onwaiting
       */
    }, []);

    /**
     * [1] 비디오 관련 Functions
     */
    const onClickPlay = ({ screenX, clientX, pageX, target, currentTarget }) => {
        const player = playerContainer.current;
        player.play();
        setIsPlayed(player.paused);
    };
    const onClickPause = ({ screenX, clientX, pageX, target, currentTarget }) => {
        const player = playerContainer.current;
        player.pause();
        setIsPlayed(player.paused);
    };
    const onPlaying = (event) => {
        console.log("event : ", event);
    }
    const onWaiting = (props) => {
        console.log("onwaiting() : ");
    }
    const onProgress = (props) => {
        console.log("onprogress() : ");
    }
    const onCanPlay = (props) => {
        const { duration, readyState } = playerContainer.current;
        setVideoDuration(duration);
    }
    const onTimeUpdate = () => {
        const { currentTime, seekToNextFrame } = playerContainer.current;
        const { style } = timeBarContainer.current;
        setVideoCurrentTime(currentTime);
        setTimeBarX(style.left);
    }

    const calculateTimePercent = useMemo(() => {
        const currentPercent = videoCurrentTime / videoDuration * 100;
        setTimePercent(currentPercent);
    }, [videoCurrentTime, videoDuration]);


    /**
     * [2] 타임라인 관련 Functions
     */
    const mouseUpInBackground = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        setDraggable(false);
    }, []);

    const mouseDownInTimeline = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        const { offsetWidth } = timelineContainer.current;
        const currentX = calculatePercent(offsetWidth, clientX);
        console.log("currentX : ", currentX);
        playerContainer.current.currentTime = currentX * videoDuration;
        setTimePercent(currentX);
        setDraggable(true);
    }, []);

    const mouseDownInBar = useCallback(({ screenX, clientX, pageX, target, currentTarget }) => {
        const { offsetWidth } = timelineContainer.current;
        const currentX = calculatePercent(offsetWidth, clientX);

        setTimePercent(currentX);
        setDraggable(true);
    }, []);

    const mouseMoveInBackground = useCallback(({ screenX, clientX, pageX, clientY, target, currentTarget }) => {
        if (draggable) {
            const { offsetWidth } = timelineContainer.current;
            const currentX = calculatePercent(offsetWidth, clientX);
            setTimePercent(currentX);
        }
    }, [draggable]);

    const contextMenuInBackground = useCallback((event) => {
        event.preventDefault();
    }, []);


    return (
        <CustomVideoPlayerContainer
            onMouseMove={mouseMoveInBackground}
            onMouseUp={mouseUpInBackground}
            onContextMenu={contextMenuInBackground}
        >
            <div className="video-container">
                <video
                    ref={playerContainer}
                    controls={false}
                    preload="metadata"
                    onTimeUpdate={onTimeUpdate}
                    onCanPlay={onCanPlay}
                    onWaiting={onWaiting}
                    onProgress={onProgress}
                >
                    <source src={src}></source>
                </video>
                <div className="video-time-bar" />
                <div className="video-cap">
                    <div>
                        <button onClick={onClickPlay}>Play</button>
                        <button onClick={onClickPause}>Pause</button>
                    </div>
                    <div>
                        <p style={{"color": "white"}}>진행 시간 : {videoCurrentTime} 초</p>
                        <p style={{"color": "white"}}>Origin Time Bar : {timePercent + "%"}</p>
                        <p style={{"color": "white"}}>Custom Time Bar : {timeBarX}</p>
                        <p style={{"color": "white"}}>Error (Origin - Custom) : {timePercent - timeBarX.substring(0, timeBarX.indexOf('%'))}%</p>
                    </div>
                </div>
            </div>
            <div
                className="time-line-container"
                ref={timelineContainer}
            >
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