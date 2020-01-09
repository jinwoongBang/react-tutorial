import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
    position: relative;
    top: 20%;
    left: 0%;
    width: 100%;
    height: 0.6vh;
    z-index: 4;
    /* border: 1px solid black; */
    border-radius: 10px 10px 10px 10px;
    background-color: rgb(255,255,255, 0.3);
    box-shadow: 0 2px 2px 0 gray;
    

    .video-progress-bar {
        position: relative;
        top: 0;
        width: 0%;
        height: 100%;
        /* background-color: #FFC2C2; */
        background-color: red;
        border-radius: 10px 10px 10px 10px;
        opacity: 1.0 !important;
        /* box-shadow: 0 2px 2px 0 gray; */
    }
    .video-current-point {
        position: relative;
        bottom: 5px;
        left: 100%;
        width: 1vw;
        height: 1vw;
        border-radius: 100px 100px 100px 100px;
        background-color: red;
    }
`;

const ProgressBar = ({ percent }) => {
    return (
        <ProgressBarContainer className="">
            <div className="video-progress-bar" style={{ "width": percent + "%" }}>
                <div className="video-current-point"></div>
            </div>
            
        </ProgressBarContainer>
    )
}

export default ProgressBar;