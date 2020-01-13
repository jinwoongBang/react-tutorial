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
    /* border: 1px solid black; */
    /* padding: 10px 10px 10px 10px; */
    /* box-shadow: 10px 10px 0 0 gray; */

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
        /* background-color: black; */
        opacity: 1.0;
        /* padding: 10px 10px 10px 10px; */
        border-radius: 0 0 10px 10px;
    }
    .in-and-out-container {
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 2;
        height: 100%;
        border: 4px solid rgb(255,255,255, 0.5);
        /* border: 5px solid #FFC2C2; */
        opacity: 1.0;
        border-radius: 0 0 10px 10px;
    }
    .in-and-out-play-button-container {
        position: absolute;
        top: 5%;
        z-index: 4;
        width: 2vw;
        /* border: 1px solid tomato; */
        
    }
    .in-and-out-play-button {
        position: relative;
        left: 50%;
        height: 2vw;
        /* border: 1px solid tomato; */
    }
    
`;

const VideoTimeline = ({
    skim,
    isPlayed,
    currentTimePercent,
    inTimePercent,
    outTimePercent,
    onMouseDownInTimeline,
    onMouseDownCurrentBar,
    onMouseDownInBar,
    onMouseDownOutBar,
    onMouseMoveInComponent,
    onMouseMoveInBar,
    onMouseEnter,
    onMouseLeave,
    onPlaySection
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
        >
            <div className="time-img-container">
                <img
                    className="time-img"
                    src={thumbnail1}
                    alt=""
                />
            </div>
            <div
                className="in-and-out-container"
                style={{
                    "left": inTimePercent + "%",
                    "right": (100.00 - outTimePercent) + "%",
                    "width": (100.00 - inTimePercent - (100.00 - outTimePercent)) + "%"
                }}
            />
            <div
                className="time-img-cover"
                onMouseMove={mouseMoveInComponent}
                type="timeline"
            >
            </div>
            {/* <img
                src={buttonImg}
                className="in-and-out-play-button"
                type="play"
                alt=""
                style={{
                    "left": outTimePercent - 10 + "%",
                }}
                onClick={onPlaySection}
            /> */}
            <div
                className="in-and-out-play-button-container"
                style={{
                    "left": inTimePercent + "%",
                    "right": (100.00 - outTimePercent) + "%",
                }}
            >
                {isPlayed ? (<img
                    src={timelinePauseButton}
                    className="in-and-out-play-button"
                    type="play"
                    alt=""
                    onClick={onPlaySection}
                />) : (<img
                    src={timelinePlayButton}
                    className="in-and-out-play-button"
                    type="play"
                    alt=""
                    onClick={onPlaySection}
                />)}
                
            </div>
            <VideoTimelineBar
                currentTimePercent={currentTimePercent}
                inTimePercent={inTimePercent}
                outTimePercent={outTimePercent}
                onMouseDownCurrentBar={mouseDownCurrentBar}
                onMouseDownInBar={mouseDownInBar}
                onMouseDownOutBar={mouseDownOutBar}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseMoveInBar={onMouseMoveInBar}
            />
        </VideoTimelineContainer>
    );
}

export default VideoTimeline;