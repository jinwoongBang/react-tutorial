import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';
import { calculateTime, calculateWidthToPercent } from './util/CommonUtils';

import thumbnail from './image/thumbnail_example.png';

const VideoCoverContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* border: 1px solid tomato; */

    .loading-cover {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.8);
        text-align: center;
        color: white;
    }
    
    .video-play-cover {
        position: relative;
        z-index: 1;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .play-button-container {
        position: relative;
        top: 40%;
        left: 0%;
        width: 100%;
        transition: opacity .5s linear;
        opacity: 1.0;
    }
    .play-button-container > img {
        position: relative;
        left: 47%;
        width: 5vw;
        height: 5vw;
    }
    .deactive-opacity {
        opacity: 0.0;
    }
    .active-opacity {
        opacity: 1.0;
    }

    .hover-point-container {
        position: absolute;
        bottom: 2%;

        width: 8vw;
        height: 4.5vw;

        overflow: hidden;
        border-radius: 7px 7px 7px 7px;
        box-shadow: 0 0 5px 0 black;
        /* border: 1px solid tomato; */
    }
    .hover-point-container > img {
        position: relative;
        width: 100%;
    }
    .hover-point-time {
        position: absolute;
        left: 10%;

        bottom: 2%;
        width: 80%;
        color: white;
        text-align: center;
        background-color: rgb(0, 0, 0, 0.2);
    }
`;

const VideoCover = ({
    isPlayed,
    button,
    readyState,
    hoverPointView,
    hoverPointX,
    hoverPointTime,

    onPlayFull,
}) => {

    const onPlayInTopCover = useCallback((event) => {
        onPlayFull(event);
    }, [onPlayFull]);

    return (
        <VideoCoverContainer>
            {readyState ? null : <div className="loading-cover">Loading...</div>}
            <div
                className="video-play-cover"
                onClick={onPlayInTopCover}
            >
                <div
                    className={[
                        'play-button-container',
                        isPlayed && 'deactive-opacity'
                    ].join(' ')}
                >
                    {isPlayed
                        ? <img src={button.pause} alt="" />
                        : <img src={button.play} alt="" />
                    }
                </div>
            </div>
            <div
                className="hover-point-container"
                style={{
                    "left": hoverPointX + "%",
                    "opacity": (hoverPointView ? 1.0 : 0.0)
                }}
            >
                <img src={thumbnail}></img>
                <div className="hover-point-time">
                    <span>{calculateTime(hoverPointTime).substring(0, 8)}</span>
                </div>
            </div>
        </VideoCoverContainer>
    )
}

export default VideoCover;