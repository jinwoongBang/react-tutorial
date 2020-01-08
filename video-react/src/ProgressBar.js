import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
    position: relative;
    left: 5%;
    width: 90%;
    height: 1vh;
    z-index: 4;
    /* border: 1px solid black; */
    border-radius: 10px 10px 10px 10px;
    /* background-color: rgb(255,255,255); */
    box-shadow: 0 2px 2px 0 gray;
    

    .video-progress-bar {
        position: relative;
        top: 0%;
        width: 0%;
        height: 100%;
        background-color: #FFC2C2;
        border-radius: 10px 10px 10px 10px;
        box-shadow: 0 2px 2px 0 gray;
    }
`;

const ProgressBar = ({ percent }) => {
    return (
        <ProgressBarContainer>
            <div className="video-progress-bar" style={{ "width": percent + "%" }}>
            </div>
        </ProgressBarContainer>
    )
}

export default ProgressBar;