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
        /* border: 1px solid tomato; */
    }
    .video-top-button-container {
        position: relative;
        transition: opacity .5s linear;
        /* border: 1px solid tomato; */
        top: 50%;
        width: 100%;
        left: 0%;
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
        border: 1px solid tomato;
        top: 50%;
        width: 100%;
        height: 10vw;
        left: 0%;
        /* background-color: rgb(0, 0, 0, 0.8); */
        color: white;
    }
    .video-top-notification {
        position: relative;
        transition: opacity .5s linear;
        left: 43%;
        background-color: red;
        background-color: rgb(0, 0, 0, 0.8);
        width: 10vw;
        height: 100%;
        border: 1px solid tomato;
        text-align: center;
        vertical-align: middle;
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
        /* opacity: 0.0; */
        transition: opacity .3s linear;
    }
    .active-opacity {
        opacity: 1.0;
    }
    /* .video-bottom-cover:hover {
        opacity: 1.0;
    } */
    .video-bottom-container {
        position: relative;
        display: flex;
        width: 95%;
        top: 53%;
        left: 2.5%;
        /* border: 1px solid tomato; */
    }
    .video-bottom-button-container {
        position: relative;
        /* left: 10%; */
        /* border: 1px solid tomato; */
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
        /* border: 1px solid tomato; */
        color: white;
    }
    .video-time {
        position: relative;
        top: 10%;
        /* border: 1px solid tomato; */
    }
    .video-bottom-hold-container {
        position: relative;
        left: 25%;
    }
    .video-bottom-hold-container > img {
        width: 2vw;
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
    onMouseDownInTimeline,
    onChangeVolume,
    onPlaySection,

    bottomCoverView,
    holdBottomCoverView,

    setBottomCoverView,
    setHoldBottomCoverView,

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

    const onMouseEnterBottomCover = useCallback(() => {
        // console.log("mouse Enter : ", holdBottomCoverView);
        if(!holdBottomCoverView) {
            console.log("mouse Enter : ", holdBottomCoverView);
            setBottomCoverView(true);
        }
    }, [setBottomCoverView, holdBottomCoverView]);
    const onMouseLeaveBottomCover = useCallback(() => {
        // console.log("mouse Leave : ", holdBottomCoverView);
        if(!holdBottomCoverView) {
            console.log("mouse Leave : ", holdBottomCoverView);
            setBottomCoverView(false);
        }
    }, [setBottomCoverView, holdBottomCoverView]);

    const onClickHoldButton = useCallback(() => {
        console.log('holdBottomCoverView : ', holdBottomCoverView);
        setHoldBottomCoverView(!holdBottomCoverView);
        setBottomCoverView(!holdBottomCoverView);
    }, [setHoldBottomCoverView, holdBottomCoverView, setBottomCoverView]);

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
                    holdBottomCoverView && 'active-opacity',
                    !bottomCoverView && 'deactive-opacity',
                ].join(' ')}
                onMouseEnter={onMouseEnterBottomCover}
                onMouseLeave={onMouseLeaveBottomCover}
            >
                <ProgressBar
                    className="radius"
                    percent={percent}
                    onMouseDown={onMouseDownInTimeline}
                    color="red"
                />
                <div className="video-bottom-container">
                    <div className="video-bottom-button-container">
                        {isPlayed
                            ? <img src={button.pause} onClick={onPlayFull} alt="" />
                            : <img src={button.play} onClick={onPlayFull} alt="" />
                        }
                    </div>
                    <div className="video-bottom-button-container">
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
                            />}
                    </div>
                    <div className="video-bottom-button-container">
                        {(volume > 70)
                            ? <img src={button.volumes[3]} onClick={onMuteVideoVolume} alt="" />
                            : (volume > 30)
                                ? <img src={button.volumes[2]} onClick={onMuteVideoVolume} alt="" />
                                : (volume > 0)
                                    ? <img src={button.volumes[1]} onClick={onMuteVideoVolume} alt="" />
                                    : <img src={button.volumes[0]} onClick={onChangeVideoVolume} alt="" />}
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
                            {calculateTime(currentTime)} / {calculateTime(duration)}
                        </div>
                    </div>
                    <div className="video-bottom-hold-container">
                        {holdBottomCoverView
                            ? <img src={pinOnButton} onClick={onClickHoldButton} />
                            : <img src={pinOffButton} onClick={onClickHoldButton} />}
                    </div>
                </div>
            </div>
        </VideoCoverContainer>
    )
}

export default VideoCover;