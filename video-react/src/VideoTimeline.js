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

    .time-img-cap {
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
        left: 10%;
        right: 10%;
        z-index: 2;
        width: 80%;
        height: 100%;
        border: 4px solid #FFC2C2;
        
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
        /* border: 1px solid #FFC2C2; */
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
    onDragStart,
    onDragEnd,
    onDrag,
}) => {

    const mouseDownInTimeline = useCallback((event) => {
        onMouseDownInTimeline(event);
    }, [onMouseDownInTimeline]);

    const mouseMoveInComponent = useCallback((event) => {
        onMouseMove(event);
    }, [onMouseMove]);

    const mouseDownInBar = useCallback((event) => {
        const { target, currentTarget } = event;
        console.log("event : ", event);
        console.log("target : ", {target: target});
        console.log("attributes : ", target.attributes.type.value);
        console.log("currentTarget : ", currentTarget);
        onMouseDownInBar(event);
    });
    const mouseDownOutBar = useCallback((event) => {
        const { target, currentTarget } = event;
        console.log("event : ", event);
        console.log("target : ", {target: target});
        console.log("attributes : ", target.attributes.type.value);
        console.log("currentTarget : ", currentTarget);
        onMouseDownOutBar(event);
    });
    const mouseDownCurrentBar = useCallback((event) => {
        const { target, currentTarget } = event;
        console.log("event : ", event);
        console.log("target : ", {target: target});
        console.log("attributes : ", target.attributes.type.value);
        console.log("currentTarget : ", currentTarget);
        onMouseDownCurrentBar(event);
    });

    return (
        <VideoTimelineContainer>
            <div className="time-img-container radius">
                <img className="time-img" src={imageSource} />
            </div>
            <div
                className="in-and-out-container radius"
                // style={{}}
            />
            <div className="time-img-cap"
                onMouseDown={mouseDownInTimeline}
                onMouseMove={mouseMoveInComponent}
            >
            </div>
            
            <VideoTimelineBar
                percent={inTimePercent}
                onMouseDown={mouseDownInBar}
                type="in"
            />
            <VideoTimelineBar
                percent={outTimePercent}
                onMouseDown={mouseDownOutBar}
                type="out"
            />
            <VideoTimelineBar
                percent={currentTimePercent}
                onMouseDown={mouseDownCurrentBar}
                type="current"
            />
        </VideoTimelineContainer>
    );
}

export default VideoTimeline;