import React, { useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';

const VideoTimelineBarContainer = styled.div`
    position: absolute;
    width: 99.6%;
    height: 14vw;
    top: 0%;
    bottom: 0;
    left: 0%;
    right: 0%;
    
    /* border: 2px solid tomato; */

    .time-bar {
        position: absolute;
        z-index: 5;
        top: 5%;
        bottom: 0;
        left: 0;
        right: 0;
        height: 90%;
        width: 0.5%;
        margin: 0;
        /* transition: left 0.04s linear; */
    }
    .current {
        background-color: rgb(255, 255, 255, 0.6);
    }
    .current > .time {
        top: 40%;
        left: -40px;
    }
    .in {
        background-color: rgb(255, 255, 255, 0.0);
    }
    .in > .time {
        left: 15px;
    }
    .out {
        background-color: rgb(255, 255, 255, 0.0);
    }
    .out > .time{
        top: 85%;
        left: -100px;
    }
    .time-bar:hover, .time-bar:active {
        cursor: col-resize;
    }
    .time {
        position: relative;
        z-index: 1;
        width: 100%;
        color: white;
        opacity: 0.7;
        cursor: pointer;
    }
    .time:hover {
        opacity: 1.0;
    }
`;

const VideoTimelineBar = ({
    currentTime,
    inTime,
    outTime,
    currentTimePercent,
    inTimePercent,
    outTimePercent,

    onMouseDownCurrentBar,
    onMouseDownInBar,
    onMouseDownOutBar,

    onMouseMoveInBar,

    setCurrentTimeBar,
    setInTimeBar,
    setOutTimeBar,
}) => {

    const currentRef = useRef(null);
    const inRef = useRef(null);
    const outRef = useRef(null);

    useEffect(() => {
        setCurrentTimeBar(currentRef.current);
        setInTimeBar(inRef.current);
        setOutTimeBar(outRef.current);
    }, [setCurrentTimeBar, setInTimeBar, setOutTimeBar]);

    const mouseMoveInBar = useCallback(({ target, currentTarget, nativeEvent }) => {
        if (nativeEvent.movementX > 0) {
            onMouseMoveInBar("right");
        }
        if (nativeEvent.movementX < 0) {
            onMouseMoveInBar("left");
        }
    }, [onMouseMoveInBar]);

    return (
        <VideoTimelineBarContainer
            onMouseMove={mouseMoveInBar}
        >
            <div
                className="time-bar current radius"
                style={{ "left": currentTimePercent + "%" }}
                onMouseDown={onMouseDownCurrentBar}
                draggable={false}
                type="current"
                ref={currentRef}
            >
                <div className="time" type="time">
                    {currentTime}
                </div>
            </div>

            <div
                className="time-bar in radius"
                style={{ "left": inTimePercent + "%" }}
                onMouseDown={onMouseDownInBar}
                draggable={false}
                type="in"
                ref={inRef}
            >
                <div className="time" type="time">
                    {inTime}
                </div>
            </div>
            <div
                className="time-bar out radius"
                style={{ "left": outTimePercent + "%" }}
                onMouseDown={onMouseDownOutBar}
                draggable={false}
                type="out"
                ref={outRef}
            >
                <div className="time" type="time">
                    {outTime}
                </div>
            </div>
        </VideoTimelineBarContainer>
    );
}

export default VideoTimelineBar;