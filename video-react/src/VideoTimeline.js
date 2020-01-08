import React, { useCallback } from 'react';
import styled from 'styled-components';

import VideoTimelineBar from './VideoTimelineBar';

import imageSource from './image/ski.JPG';

const VideoTimelineContainer = styled.div`
    position: relative;
    z-index: 0;
    height: 14.00vw;
    width: 100%;

    .time-img-container {
        position: relative;
        top: 0%;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-shadow: 0 10px 10px 0 gray;
    }
    .time-img {
        position: relative;
        z-index: 0;
        width: 100%;
        height: 100%;
    } 

    .time-img-cover {
        position: absolute;
        top: 0%;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.0;
        padding: 10px 10px 10px 10px;
    }
    .in-and-out-container {
        position: absolute;
        top: 0;
        bottom: 0;
        /* left: 10%; */
        /* right: 10%; */
        z-index: 3;
        /* width: 80%; */
        height: 100%;
        border: 4px solid #FFC2C2;
        background-color: black;
        opacity: 0.3;
    }
    .in-bar {
        position: relative;
        top: 5%;
        bottom: 0;
        left: 8.75%;
        right: 0;
        z-index: 5;
        width: 2.5%;
        height: 90%;
        background-color: #FFC2C2;
        box-shadow: 0 10px 10px 0 black;
        border: 1px solid #FFC2C2;
    }
    .out-bar {
        position: relative;
        top: 0;
        bottom: 0;
        left: 90%;
        right: 0%;
        z-index: 2;
        width: 2.5%;
        height: 100%;
        border: 2px solid #FFC2C2;
    }
`;

const VideoTimeline = ({
    skim,
    currentTimePercent,
    inTimePercent,
    outTimePercent,
    onMouseDownInTimeline,
    onMouseDownCurrentBar,
    onMouseDownInBar,
    onMouseDownOutBar,
    onMouseMove,
    setCurrentTimeBar,
    setInTimeBar,
    setOutTimeBar,
    onMouseEnter,
    onMouseLeave
}) => {

    const mouseDownInTimeline = useCallback((event) => {
        // console.log("mouseDownInTimeline()");
        onMouseDownInTimeline(event);
    }, [onMouseDownInTimeline]);

    const mouseMoveInComponent = useCallback((event) => {
        const { nativeEvent } = event;
        // console.log("nativeEvent : ", nativeEvent.movementX);
        onMouseMove(event);
        event.persist();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    }, [onMouseMove]);

    const mouseDownInBar = useCallback((event) => {
        // console.log("mouseDownInBar()");
        onMouseDownInBar(event);
    });
    const mouseDownOutBar = useCallback((event) => {
        onMouseDownOutBar(event);
    });
    const mouseDownCurrentBar = useCallback((event) => {
        onMouseDownCurrentBar(event);
    });
    const mouseOver = useCallback((event) => {
        const { target, currentTarget } = event;
        console.log({ target: target });
        console.log({ currentTarget: currentTarget });
    });

    return (
        <VideoTimelineContainer
            // onMouseOver={mouseOver}
            onMouseMoveCapture={mouseMoveInComponent}
            onMouseDown={mouseDownInTimeline}
        >
            <div className="time-img-container radius">
                <img className="time-img" src={imageSource} />
            </div>
            <div
                className="in-and-out-container radius"
                style={{
                    "left": inTimePercent + "%",
                    "right": (100.00 - outTimePercent) + "%",
                    "width": (100.00 - inTimePercent - (100.00 - outTimePercent)) + "%"
                }}
            />
            <div className="time-img-cover" />
            <VideoTimelineBar
                currentTimePercent={currentTimePercent}
                inTimePercent={inTimePercent}
                outTimePercent={outTimePercent}
                onMouseDownCurrentBar={mouseDownCurrentBar}
                onMouseDownInBar={mouseDownInBar}
                onMouseDownOutBar={mouseDownOutBar}
                // setCurrentTimeBar={setCurrentTimeBar}
                // setInTimeBar={setInTimeBar}
                // setOutTimeBar={setOutTimeBar}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        </VideoTimelineContainer>
    );
}

export default VideoTimeline;