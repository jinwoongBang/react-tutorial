import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';

const VideoCoverContainer = styled.div`
    @keyframes play-button {
        from {
            width: 10px;
            height: 10px;
            opacity: 1.0;
        }

        to {
            width: 100px;
            height: 100px;
            opacity: 0.0;
        }
    }

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
        z-index: 2;
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
        opacity: 0.0;
    }
    .click {
        animation-name: play-button;
        animation-duration: 1s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        opacity: 0.0;
    }
    .video-info-container {
        position: absolute;
        z-index: 1;
        top: 85%;
        /* bottom: 10px */
        left: 0;
        height: 15%;
        width: 100%;
        color: white;
        font-size: 1.5em;
        background: linear-gradient(360deg, rgba(0,0,0, 1.0), rgba(255,255,255, 0.0));
        opacity: 0.8;
    }
    .video-info {
        position: relative;
        width: 95%;
        top: 30%;
        left: 2.5%;
    }
`;

const calculateSecondToHour = (time) => {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    if (time)
        if (minutes < 60) {
            const seconds = minutes % 60;

            return minutes + ":" + seconds;
        } else if (minutes >= 60) {
            const hours = minutes / 60;
            return minutes + ":" + seconds;
        }
}

const VideoCover = ({ onClick, isPlayed, button, percent, duration, currentTime }) => {
    const [animation, setAnimation] = useState("video-button");
    const onMouseDown = useCallback((event) => {
        console.log("down");
        setAnimation("video-button click");
        onClick();
    }, []);
    const onMouseUp = useCallback((event) => {
        setAnimation("video-button");
        console.log("up");
    }, []);

    return (
        <VideoCoverContainer >
            <div className="video-button-container" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                {isPlayed ? <img src={button.pause} className={animation} alt="" /> : <img src={button.play} className={animation} alt="" />}
            </div>

            <div className="video-info-container">
                <ProgressBar className="radius" percent={percent} />
                <div className="video-info">
                    {currentTime.toFixed(2)} / {duration.toFixed(2)}
                </div>
            </div>
        </VideoCoverContainer>
    )
}

export default VideoCover;