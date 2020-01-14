import React, { useCallback } from 'react';
import styled from 'styled-components';

import VideoTimelineBar from './VideoTimelineBar';

import imageSource from './image/ski.JPG';
import thumbnail from './image/thumbnail.jpg';
import thumbnail1 from './image/thumbnail_example.png';
import videoPlayButton from './image/play-button.png';
import timelinePlayButton from './image/play-button-white-08.png';
import timelinePauseButton from './image/play-button-white-09.png';
import timelineRedoButton from './image/redo-button-basic.png';

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
        border-radius: 0 0 10px 10px;
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
        z-index: 3;
        width: 100%;
        height: 100%;
        opacity: 1.0;
        border-radius: 0 0 10px 10px;
    }
    .in-and-out-container {
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 2;
        height: 100%;
        /* border: 4px solid rgb(255,255,255, 0.5); */
        border: 4px solid rgb(255, 8, 0, 0.5);
        /* border: 5px solid #FFC2C2; */
        opacity: 1.0;
        border-radius: 0 0 10px 10px;
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
    onMouseMoveInComponent,
    onMouseMoveInBar,

    onTouchStart,
    onTouchMove,
    onTouchEnd,

    setCurrentTimeBar,
    setInTimeBar,
    setOutTimeBar,
}) => {

    const mouseDownInTimeline = useCallback((event) => {
        onMouseDownInTimeline(event);
    }, [onMouseDownInTimeline]);

    const mouseMoveInComponent = useCallback((event) => {
        onMouseMoveInComponent(event);
    }, [onMouseMoveInComponent]);

    const mouseDownInBar = useCallback((event) => {
        onMouseDownInBar(event);
    }, [onMouseDownInBar]);
    const mouseDownOutBar = useCallback((event) => {
        onMouseDownOutBar(event);
    }, [onMouseDownOutBar]);
    const mouseDownCurrentBar = useCallback((event) => {
        onMouseDownCurrentBar(event);
    }, [onMouseDownCurrentBar]);

    return (
        <VideoTimelineContainer
            onMouseDown={mouseDownInTimeline}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
        >
            <div className="time-img-container">
                <img
                    className="time-img"
                    src={skim}
                    alt=""
                />
            </div>
            <div
                className="in-and-out-container"
                style={{
                    "left": inTimePercent + "%",
                    "right": (100.00 - outTimePercent) + "%",
                    "width": (outTimePercent - inTimePercent) + "%"
                }}
            >
            </div>
            <div
                className="time-img-cover"
                onMouseMove={mouseMoveInComponent}
                onTouchEnd={onTouchEnd}
                type="timeline"
            >
            </div>
            <VideoTimelineBar
                currentTimePercent={currentTimePercent}
                inTimePercent={inTimePercent}
                outTimePercent={outTimePercent}
                onMouseDownCurrentBar={mouseDownCurrentBar}
                onMouseDownInBar={mouseDownInBar}
                onMouseDownOutBar={mouseDownOutBar}
                onMouseMoveInBar={onMouseMoveInBar}
                setCurrentTimeBar={setCurrentTimeBar}
                setInTimeBar={setInTimeBar}
                setOutTimeBar={setOutTimeBar}
            />
        </VideoTimelineContainer>
    );
}

export default VideoTimeline;