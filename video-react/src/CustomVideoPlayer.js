import React, { useRef, useEffect, useState } from 'react';
/* import imageSource from './image/IMG_7839.JPG'; */

import styled from 'styled-components';

const CustomVideoPlayerContainer = styled.div`
    border: 1px solid tomato;
    padding: 10px 10px 10px 10px;

    video {
        width: 100%;
    }

    .border {
        border: 1px solid tomato;
    }

    /* [1] Timeline Container*/
    .time-line-container {
        position: relative;
        z-index: 0;
        overflow: hidden;
        height: 20vw;
        width: 100%;
    }

    /* [2] Time Bar's Thumbnail image */
    .time-img-container {
        position: relative;
        top: 0px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
    }

    .hide-container {
        position: absolute;
        top: 0px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.0;
    }

    .time-img {
        position: relative;
        z-index: 0;
        /*
        top: 0px;
        bottom: 0;
        left: 0;
        right: 0; */
        width: 100%;
    } 

    /* [3] Time Bar */
    .time-bar-container {
        position: absolute;
        z-index: 3;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
        height: 20vw;
        width: 1%;
        opacity: 0.1;
        padding: 0;
        margin: 0;
    }
    .time-bar-button {
        width: 100%;
        height: 100%;
        opacity: 0.0;
    }
    .time-bar-button:hover, .time-bar-button:active {
        cursor: col-resize;
    }
`;

const printProp = (event) => {
    const { screenX, clientX, pageX, target, currentTarget } = event;
    console.log("Mouse Down : ", event);
    console.log("screenX : ", screenX);
    console.log("clientX : ", clientX);
    console.log("pageX : ", pageX);
}

const calculatePercent = (width, clientX) => {
    let currentX = (clientX - 20) / width * 100;
    currentX = currentX < 0 ? 0 : currentX;
    currentX = currentX > 100 ? 100 : currentX;

    return currentX;
}


const CustomVideoPlayer = ({ src, skim }) => {
    const playerContainer = useRef(null);
    const timelineContainer = useRef(null);
    const [timeBarX, setTimeBarX] = useState(10.00);
    const [mouseY, setMouseY] = useState(10.00);
    const [draggable, setDraggable] = useState(false);

    const [player, setPlayer] = useState(playerContainer.current);

    useEffect(() => {
        console.log('init playerContainer');
        const { current } = playerContainer;
        console.log("current : ", playerContainer);
        console.log("loadedmetadata : ", current.loadedmetadata);
        setPlayer(current);
    }, [playerContainer]);

    // useEffect(() => {
    //     if(player.readyState) {
    //         console.log("readyState : ", player.readyState);
    //     }
    // }, [player.readyState]);

    const onMouseDown = ({ screenX, clientX, pageX, target, currentTarget }) => {
        const { offsetWidth } = timelineContainer.current;
        const currentX = calculatePercent(offsetWidth, clientX);

        setTimeBarX(currentX);
        setDraggable(true);
    };

    const onMouseDownButton = ({ screenX, clientX, pageX, target, currentTarget }) => {
        const { offsetWidth } = timelineContainer.current;
        const currentX = calculatePercent(offsetWidth, clientX);

        setTimeBarX(currentX);
        setDraggable(true);
    }

    const onMouseMove = ({ screenX, clientX, pageX, clientY, target, currentTarget }) => {
        if (draggable) {
            const { offsetWidth } = timelineContainer.current;
            const currentX = calculatePercent(offsetWidth, clientX);
            setTimeBarX(currentX);
        }
    }

    const onMouseUp = ({ screenX, clientX, pageX, target, currentTarget }) => {
        setDraggable(false);
    };

    const onContextMenu = (event) => {
        event.preventDefault();
    }


    return (
        <CustomVideoPlayerContainer onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
            <div className="video-container border">
                <video ref={playerContainer} controls={true} preload="metadata">
                    <source src={src}></source>
                </video>
            </div>
            <div
                className="time-line-container border"
                ref={timelineContainer}
                onContextMenu={onContextMenu}
            >
                <div
                    className="time-img-container"
                    // onMouseDown={onMouseDown}
                >
                    <img className="time-img border" src={skim} />
                </div>
                <div className="hide-container" onMouseDown={onMouseDown} onDrag={(event) => {console.log("drag"); event.preventDefault();}}/>
                <div
                    className="time-bar-container"
                    style={{ "left": timeBarX + "%" }}
                >
                    <button
                        className="time-bar-button"
                        onMouseDown={onMouseDownButton}
                    />
                </div>
            </div>

        </CustomVideoPlayerContainer>
    )
}

export default CustomVideoPlayer;