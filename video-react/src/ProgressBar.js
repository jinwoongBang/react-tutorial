import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
    position: relative;
    box-sizing: border-box;
    top: 40%;
    left: 2.5%;
    width: 95%;
    height: 0.5vw;
    z-index: 4;
    /* border: 1px solid tomato; */
    /* border-radius: 10px 10px 10px 10px; */
    background-color: rgb(255,255,255, 0.3);
    /* box-shadow: 0 2px 2px 0 gray; */
    /* padding: 2%; */
    

    .video-progress-bar {
        position: absolute;
        top: 0;
        width: 0%;
        height: 100%;
        /* background-color: #FFC2C2; */
        /* background-color: red; */
        border-radius: 10px 10px 10px 10px;
        opacity: 1.0 !important;
        /* box-shadow: 0 2px 2px 0 gray; */
    }
    .video-current-point {
        position: absolute;
        top: -50%;
        /* left: 99%; */
        width: 0.6vw;
        height: 0.6vw;
        border-radius: 100px 100px 100px 100px;
        /* background-color: red; */
    }
`;

const ProgressBar = ({
    percent,
    color,
    onMouseDown
}) => {
    return (
        <ProgressBarContainer
            onMouseDown={onMouseDown}
        >
            <div
                className="video-progress-bar"
                style={{
                    "width": percent + "%",
                    "backgroundColor": color
                }}
            />
            {/* <div
                className="video-current-point"
                style={{
                    "left": percent - 1 + "%",
                    "backgroundColor": color
                }}
            /> */}

        </ProgressBarContainer>
    )
}

export default ProgressBar;