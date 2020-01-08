import React, { useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';

const VideoTimelineBarContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 14vw;
    top: 0%;
    bottom: 0;
    left: 0%;
    right: 0;
    
    /* border: 2px solid tomato; */

    .time-bar {
        position: absolute;
        z-index: 5;
        top: 5%;
        bottom: 0;
        left: 0;
        right: 0;
        /* background-color: white; */
        background-color: #FFC2C2;
        height: 90%;
        width: 0.5%;
        opacity: 1.0;
        box-shadow: 0 10px 10px 0 black;
        margin: 0;
    }
    .time-bar:hover, .time-bar:active {
        cursor: col-resize;
    }
`;

const VideoTimelineBar = ({
    currentTimePercent,
    inTimePercent,
    outTimePercent,

    onMouseDownCurrentBar,
    onMouseDownInBar,
    onMouseDownOutBar,

    setCurrentTimeBar,
    setInTimeBar,
    setOutTimeBar,
    onMouseEnter,
    onMouseLeave
}) => {
    // const currentTimeBarRef = useRef(null);
    // const inTimeBarRef = useRef(null);
    // const outTimeBarRef = useRef(null);

    useEffect(() => {
        console.log("init bar");
        // setCurrentTimeBar(currentTimeBarRef.current);
        // setInTimeBar(inTimeBarRef.current);
        // setOutTimeBar(outTimeBarRef.current);
    }, [setCurrentTimeBar, setInTimeBar, setOutTimeBar]);

    return (
        <VideoTimelineBarContainer>
            <div
                className="time-bar radius"
                style={{ "left": currentTimePercent + "%" }}
                onMouseDown={onMouseDownCurrentBar}
                draggable={false}
                type="current"
                // onMouseMove={(event) => {
                //     event.persist(); 
                //     event.stopPropagation();
                //     event.nativeEvent.stopImmediatePropagation();
                //     console.log("Mouse Move", event.nativeEvent);
                //     // onMouseEnter();
                // }}
                // onMouseEnter={(event) => {
                //     console.log("Mouse enter", event.nativeEvent);
                // }}
                // onMouseOver={(event) => {
                //     console.log("Mouse Over", event.nativeEvent);
                // }}
            />
            <div
                className="time-bar radius"
                style={{ "left": inTimePercent + "%" }}
                onMouseDown={onMouseDownInBar}
                draggable={false}
                type="in"
                // ref={inTimeBarRef}
            />
            <div
                className="time-bar radius"
                style={{ "left": outTimePercent + "%" }}
                onMouseDown={onMouseDownOutBar}
                draggable={false}
                type="out"
                // ref={outTimeBarRef}
            />
        </VideoTimelineBarContainer>
    );
}

export default VideoTimelineBar;