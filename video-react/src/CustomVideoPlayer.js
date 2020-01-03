import React, { useRef, useEffect } from 'react';
/* import imageSource from './image/IMG_7839.JPG'; */

import styled from 'styled-components';

const CustomVideoPlayerContainer = styled.div`
   
    border: 1px solid tomato;
    
    video {
        width: 100%;
    }

    .border {
        border: 1px solid tomato;
    }
    .time-line-container {
        position: absolute;
        z-index: 0;
        overflow: hidden;
        height: 20vw;
        width: 100%;
    }
    .time-img {
        position: relative;
        z-index: 1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        transform: translateY(-20%);
    }
    .time-line-background {
        width: 100%;
    }
    .time-bar {
        position: relative;
        z-index: 2;
        top: 0px;
        bottom: 20vw;
        left: 10%;
        right: 0;
        background-color: white;
        height: 20vw;
        width: 1vw;
    }
`;


const CustomVideoPlayer = ({ src, poster }) => {
    const playerContainer = useRef(null);

    useEffect(() => {
        const player = playerContainer.current;
        console.log("player : ", player.duration);
    });

    const checkCurrentTime = (e) => {
        const player = playerContainer.current;
        console.log("event : ", e);
        console.log("player.currentTime : ", player.currentTime);
    }

    const onMouseDown = (event) => {
        console.log("Mouse Down : ", event);
    }
    const onMouseUp = (event) => {
        console.log("Mouse Up : ", event);
    }
    const onDrag = (event) => {
        console.log("onDrag : ", event);
    }
    const onDragStart  = (event) => {
        console.log("onDragStart : ", event);
    }

    return (
        <CustomVideoPlayerContainer>
            <div className="border">
                <video ref={playerContainer} controls={true}>
                    <source src={src}></source>
                </video>
            </div>
            <div className="time-line-container border" /* onMouseDown={onMouseDown} onMouseUp={onMouseUp} */>
                {/* <img className="time-img border" src={imageSource}></img> */}
                <div className="time-line-background border-black" style={{"backgroundImage":`url(${poster})`}}>

                </div>
            </div>
            <div className="time-bar" onDrag={onDrag} onDragStart={onDragStart}>
            </div>
        </CustomVideoPlayerContainer>
    )
}

export default CustomVideoPlayer;