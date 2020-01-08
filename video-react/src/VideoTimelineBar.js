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
        position: relative;
        z-index: 5;
        top: 5%;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
        /* background-color: #FFC2C2; */
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
    percent,
    onMouseDown,
    onDragStart,
    onDragEnd,
    onDrag,
    type
}) => {

    // const onMouseDownInBar = useCallback((event) => {
    //     onMouseDown(event);
    // }, [onMouseDown]);

    return (
        <VideoTimelineBarContainer>
            <div
                className="time-bar radius"
                style={{ "left": percent + "%" }} 
                onMouseDown={onMouseDown}
                draggable={false}
                onDrag={onDrag}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                type={type}
            />
                {/* <button
                    className="time-bar-button"
                // onMouseDown={mouseDownInBar}
                // onTouchStart={onTouchStart}
                // onTouchMove={onTouchMove}
                // onTouchEnd={onTouchEnd}
                /> */}
        </VideoTimelineBarContainer>
    );
}

export default VideoTimelineBar;