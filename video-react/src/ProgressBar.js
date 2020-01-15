import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    z-index: 4;
    top: 0%;
    left: 2.5%;
    width: 95%;
    height: 0.5vw;
    
    background-color: rgb(255,255,255, 0.3);
    
    .video-progress-bar {
        position: absolute;
        top: 0;
        width: 0%;
        height: 100%;
        border-radius: 10px 10px 10px 10px;
        opacity: 1.0 !important;
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
        </ProgressBarContainer>
    )
}

export default ProgressBar;