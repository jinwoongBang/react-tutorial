import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';
import { calculateTime, calculateWidthToPercent } from './util/CommonUtils';

import timelinePlayButton from './image/play-button-white-08.png';
import timelinePauseButton from './image/play-button-white-09.png';
import playSectionButton from './image//section-play-button.png';
import pauseSectionButton from './image/section-pause-button.png';
import pinOnButton from './image/pin-on.png';
import pinOffButton from './image/pin-off.png';

const VideoCoverContainer = styled.div`
    @media (max-width: 575px) {
        .d-none {
            display: none;
        }
        .video-bottom-time-container, .video-bottom-detail-container {
            width: 50%;
        }
    }

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;

    img {
        width: 2vw;
    }
    

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
    }
    .video-top-button-container {
        position: relative;
        top: 50%;
        left: 0%;
        width: 100%;
        transition: opacity .5s linear;
        opacity: 1.0;
    }
    .deactive-opacity {
        opacity: 0.0;
    }
    .active-opacity {
        opacity: 1.0;
    }

    .video-top-button-container > img {
        position: relative;
        left: 47%;
        width: 5vw;
        height: 5vw;
    }

    .video-top-notification-container {
        position: relative;
        top: 50%;
        width: 100%;
        height: 10vw;
        left: 0%;
        color: white;
        /* background-color: rgb(0, 0, 0, 0.8); */
        /* border: 1px solid tomato; */
    }
    .video-top-notification {
        position: relative;
        transition: opacity .5s linear;
        left: 43%;
        background-color: red;
        background-color: rgb(0, 0, 0, 0.8);
        width: 10vw;
        height: 100%;
        /* border: 1px solid tomato; */
        text-align: center;
        vertical-align: middle;
    }
    
    .video-bottom-cover {
        position: relative;
        z-index: 1;
        left: 0%;
        width: 100%;
        height: 20%;
        background: linear-gradient(360deg, rgba(0,0,0, 1.0), rgba(255,255,255, 0.0));
        /* opacity: 0.0; */
        transition: opacity .3s linear;
        /* border: 1px solid tomato; */
    }
    .active-opacity {
        opacity: 1.0;
    }
    .video-bottom-container {
        position: relative;
        display: flex;
        width: 95%;
        left: 2.5%;
        top: 0;
        /* border: 1px solid tomato; */
    }
    .video-bottom-button-container {
        position: relative;
        /* left: 10%; */
        width: 10vw;
        /* border: 1px solid tomato; */
    }
    
    .video-bottom-volume-container {
        position: relative;
        width: 10vw;
        top: 0;
        /* border: 1px solid tomato; */
    }
    .video-volume {
        position: absolute;
        width: 70%;                  
        top: 40%;                         
        left: 20%;          
    }
    
    .video-bottom-time-container {
        position: relative;
        width: 25vw;
        top: 40%;
        color: white;
        /* border: 1px solid tomato; */
    }
    .video-time {
        position: relative;
        top: 0%;
        left: 0%;
        text-align: center;
        
    }
    .video-bottom-detail-container {
        position: relative;
        width: 25vw;
        top: 40%;
        color: white;
        /* border: 1px solid tomato; */
    }
    .video-detail-time {
        position: relative;
        top: 0%;
        left: 0%;
        text-align: center;
        /* border: 1px solid tomato; */
    }
    .video-bottom-hold-container {
        position: relative;
        /* border: 1px solid tomato; */
    }
`;

const VideoCover = ({
    isPlayed,
    button,
    percent,
    duration,
    currentTime,
    volume,
    readyState,
    isBottomCover,
    isHoldBottomCover,
    detailedTime,

    onPlayFull,
    onMouseDownInVolume,
    onMouseDownInSeekBar,
    onChangeVolume,
    onPlaySection,
    onChangeBottomCoverView,
    onChangeHoldBottomCoverView,
}) => {

    const onPlayInTopCover = useCallback((event) => {
        onPlayFull(event);
    }, [onPlayFull]);

    const onMuteVideoVolume = useCallback((event) => {
        onChangeVolume(event, 0);
    }, [onChangeVolume]);

    const onChangeVideoVolume = useCallback((event) => {
        onChangeVolume(event, 1.0);
    }, [onChangeVolume]);

    const onMouseEnterBottomCover = useCallback(() => {
        if (!isHoldBottomCover) {
            onChangeBottomCoverView(true);
        }
    }, [isHoldBottomCover, onChangeBottomCoverView]);

    const onMouseLeaveBottomCover = useCallback(() => {
        if (!isHoldBottomCover) {
            onChangeBottomCoverView(false);
        }
    }, [onChangeBottomCoverView, isHoldBottomCover]);

    const onClickHoldButton = useCallback(() => {
        onChangeHoldBottomCoverView(!isHoldBottomCover);
    }, [onChangeHoldBottomCoverView, isHoldBottomCover]);

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
                className={[
                    'video-bottom-cover',
                    isHoldBottomCover && 'active-opacity',
                    !isBottomCover && 'deactive-opacity'
                ].join(' ')}
                onMouseEnter={onMouseEnterBottomCover}
                onMouseLeave={onMouseLeaveBottomCover}
            >
                <div style={{ "height": "1.5vw" }}>

                </div>
                <div className="">
                    <ProgressBar
                        className="radius"
                        percent={percent}
                        onMouseDown={onMouseDownInSeekBar}
                        color="red"
                    />
                    <div style={{ "height": "0.5vw" }}>

                    </div>
                    <div className="video-bottom-container">
                        <div className="video-bottom-button-container">
                            {isPlayed
                                ? <img src={button.pause} onClick={onPlayFull} alt="" />
                                : <img src={button.play} onClick={onPlayFull} alt="" />
                            }
                            {isPlayed
                                ? <img
                                    src={pauseSectionButton}
                                    type="play"
                                    alt=""
                                    onClick={onPlaySection}
                                />
                                : <img
                                    src={playSectionButton}
                                    type="play"
                                    alt=""
                                    onClick={onPlaySection}
                                />
                            }
                        </div>
                        <div className="video-bottom-volume-container d-none">
                            {(volume > 70)
                                ? <img src={button.volumes[3]} onClick={onMuteVideoVolume} alt="" />
                                : (volume > 30)
                                    ? <img src={button.volumes[2]} onClick={onMuteVideoVolume} alt="" />
                                    : (volume > 0)
                                        ? <img src={button.volumes[1]} onClick={onMuteVideoVolume} alt="" />
                                        : <img src={button.volumes[0]} onClick={onChangeVideoVolume} alt="" />}
                            <div className="video-volume">
                                <ProgressBar
                                    className="radius"
                                    percent={volume}
                                    color="white"
                                    onMouseDown={onMouseDownInVolume}
                                />
                            </div>
                        </div>

                        <div className="video-bottom-time-container">
                            <div className="video-time">
                                {
                                    calculateTime(currentTime)
                                        .substring(0, calculateTime(currentTime).indexOf("."))
                                    + " / "
                                    + calculateTime(duration)
                                        .substring(0, calculateTime(duration).indexOf("."))
                                }
                            </div>
                        </div>
                        <div className="video-bottom-detail-container">
                            <div className="video-detail-time">
                                Time Tunes : {detailedTime} s
                        </div>
                        </div>
                        <div className="video-bottom-hold-container">
                            {isHoldBottomCover
                                ? <img src={pinOnButton} alt="" onClick={onClickHoldButton} />
                                : <img src={pinOffButton} alt="" onClick={onClickHoldButton} />}
                        </div>
                    </div>
                </div>
            </div>
        </VideoCoverContainer>
    )
}

export default VideoCover;