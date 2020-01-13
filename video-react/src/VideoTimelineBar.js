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
        /* background-color: white; */
        background-color: rgb(255,255,255, 0.7);
        height: 90%;
        width: 0.5%;
        opacity: 1.0;
        /* box-shadow: 0 10px 10px 0 black; */
        margin: 0;
    }
    .time-bar:hover, .time-bar:active {
        cursor: col-resize;
    }

    .in-bar, .out-bar {
        opacity: 0.0;
    }
    /* .in-bar:hover, .out-bar:hover {
        opacity: 1.0;
    } */
`;

const VideoTimelineBar = ({
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
                className="time-bar radius"
                style={{ "left": currentTimePercent + "%" }}
                onMouseDown={onMouseDownCurrentBar}
                draggable={false}
                type="current"
                ref={currentRef}
            />
            <div
                className="time-bar in-bar radius"
                style={{ "left": inTimePercent + "%" }}
                onMouseDown={onMouseDownInBar}
                draggable={false}
                type="in"
                ref={inRef}
            />
            <div
                className="time-bar out-bar radius"
                style={{ "left": outTimePercent + "%" }}
                onMouseDown={onMouseDownOutBar}
                draggable={false}
                type="out"
                ref={outRef}
            />
        </VideoTimelineBarContainer>
    );
}

export default VideoTimelineBar;