import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';

const VideoCoverContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    /* max-width: 100%; */
    /* width: 64vw;
    height: auto; */
    /* background-color: rgba(255,255,255, 0.6); */
    /* border: 1px solid tomato; */

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
    .video-overall-cover {
        position: absolute;
        z-index: 3;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.8);
        text-align: center;
        color: white;
    }

    .video-top-cover {
        position: relative;
        z-index: 2;
        top: 0;
        width: 100%;
        height: 80%;
        overflow: hidden;
        border: 1px solid tomato;
    }
    .video-top-button-container {
        position: relative;
        transition: opacity .5s linear;
        border: 1px solid tomato;
        top: 50%;
        width: 100%;
        left: 0%;
        opacity: 1.0;
    }
    .click {
        opacity: 0.0;
    }
    /* .click {
        animation-name: play-button;
        animation-duration: 1s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        opacity: 0.0;
    } */

    .video-top-button-container > img {
        position: relative;
        left: 47%;
        width: 5vw;
        height: 5vw;
    }

    .video-top-notification-container {
        position: relative;
        border: 1px solid tomato;
        top: 50%;
        width: 100%;
        height: 10vw;
        left: 0%;
        /* background-color: rgb(0, 0, 0, 0.8); */
        color: white;
        text-align: center;
    }
    .video-top-notification {
        position: relative;
        transition: opacity .5s linear;
        left: 43%;
        /* background-color: red; */
        background-color: rgb(0, 0, 0, 0.8);
        width: 10vw;
        height: 100%;
        border: 1px solid tomato;
    }
    
    .video-bottom-cover {
        position: relative;
        z-index: 1;
        /* top: 80%; */
        /* bottom: 10px */
        left: 0;
        /* height: 15%; */
        width: 100%;
        height: 20%;
        background: linear-gradient(360deg, rgba(0,0,0, 1.0), rgba(255,255,255, 0.0));
        opacity: 0.0;
    }
    .video-bottom-cover:hover {
        opacity: 1.0;
    }
    .video-bottom-container {
        position: relative;
        display: flex;
        width: 95%;
        top: 53%;
        left: 2.5%;
        border: 1px solid tomato;
    }
    .video-bottom-button-container {
        position: relative;
        /* left: 10%; */
        border: 1px solid tomato;
    }
    .video-bottom-button-container > img {
        width: 2vw;
    }
    .video-bottom-volume-container {
        width: 10%;
    }
    
    .video-time-container {
        position: relative;
        width: 50%;
        top: 40%;
        left: 2.5%;
        border: 1px solid tomato;
        color: white;
    }
    .video-time {
        position: relative;
        top: 10%;
        /* border: 1px solid tomato; */
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

const VideoCover = ({
    onPlayFull,
    onMouseDownInVolume,
    onChangeVolume,
    isPlayed,
    button,
    percent,
    duration,
    currentTime,
    volume,
    readyState
}) => {

    const onPlayInTopCover = useCallback((event) => {
        onPlayFull(event);
    });

    const onMuteVideoVolume = useCallback((event) => {
        onChangeVolume(event, 0);
    }, [onChangeVolume]);

    const onChangeVideoVolume = useCallback((event) => {
        onChangeVolume(event, 1.0);
    }, [onChangeVolume]);

    return (
        <VideoCoverContainer>
            {readyState ? null : <div className="video-overall-cover">Loading...</div>}
            <div
                className="video-top-cover"
                onClick={onPlayInTopCover}
            >
                <div
                    className={[
                        'video-top-button-container',
                        isPlayed && 'click'
                    ].join(' ')}
                >
                    {isPlayed
                        ? <img src={button.pause} alt="" />
                        : <img src={button.play} alt="" />
                    }
                </div>
                <div
                    className={[
                        'video-top-notification-container',
                        isPlayed && 'click'
                    ].join(' ')}
                >
                    <div className="video-top-notification">
                        In Time Bar
                    </div>
                </div>
            </div>

            <div className="video-bottom-cover" onMouseLeave={() => {
                console.log('mouseleave');
            }}>
                <ProgressBar className="radius" percent={percent} color="red" />
                <div className="video-bottom-container">
                    <div className="video-bottom-button-container">
                        {isPlayed
                            ? <img src={button.pause} onClick={onPlayFull} alt="" />
                            : <img src={button.play} onClick={onPlayFull} alt="" />
                        }
                    </div>
                    <div className="video-bottom-button-container">
                        {volume === 0
                            ? <img src={button.volumes[0]} alt="" onClick={onChangeVideoVolume} />
                            : <img src={button.volumes[1]} alt="" onClick={onMuteVideoVolume} />
                        }

                    </div>
                    <div className="video-bottom-volume-container">
                        <ProgressBar
                            className="radius"
                            percent={volume}
                            color="white"
                            onMouseDown={onMouseDownInVolume}
                        />
                    </div>
                    <div className="video-time-container">
                        <div className="video-time">
                            {currentTime.toFixed(2)} / {duration.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </VideoCoverContainer>
    )
}

export default VideoCover;