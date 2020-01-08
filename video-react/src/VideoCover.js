import React, { useCallback } from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';

const VideoCoverContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    /* height: 7vw; */
    /* background-color: #FFC2C2; */
    /* opacity: 0.0; */
    padding: 5px 5px 5px 5px;
    /* border: 1px solid tomato; */

    .video-button-container {
        position: relative;
        top: 0;
        width: 100%;
        height: 90%;
        overflow: hidden;
    }

    .video-button {
        position: relative;
        top: 45%;
        bottom: 0;
        left: 45%;
        /* width: 100%; */
        height: 20%;
    }
    .video-button:hover {
        opacity: 0.5;
    }
    .video-button:active {
        position: relative;
        /* top: 1px; */
        /* left: 45.3%; */
    }
`;

const VideoCover = ({ onClick, isPlayed, button, percent }) => {
    return (
        <VideoCoverContainer>
            <div className="video-button-container" >
                {isPlayed ? <img src={button.pause} className="video-button" onClick={onClick} /> : <img src={button.play} className="video-button" onClick={onClick} />}
            </div>
            <ProgressBar className="radius" percent={percent} />
        </VideoCoverContainer>
    )
}

export default VideoCover;