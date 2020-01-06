import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Row, Col, Layout } from 'antd';

import CustomVideoPlayerBar from './CustomVideoPlayerBar';

// [1] html tag
const CustomReactPlayerContainer = styled.div`

    video {
        width: 100%;
    }

    .border {
        border: 1px solid tomato;
        text-align: center;
    }

    .time-line {
        position: relative;
    }

    .time-bar {
        position: relative;
        background-color: tomato;
        width: 1.5%;
        height: 100%;
    }
    


`;

const CustomReactPlayer = ({ src, poster }) => {
    const playerContainer = useRef(null);

    useEffect(() => {
        const player = playerContainer.current;
    }, [playerContainer]);

    return (

        // [1] html tag
        <CustomReactPlayerContainer>
            <div className="border">
                <video className="" ref={playerContainer} controls={true} preload="auto">
                    <source src={src}></source>
                </video>
            </div>
            <div className="border">
                <div className="border">
                    player time line
                </div>
                <div className="border time-bar">
                </div>
            </div>
        </CustomReactPlayerContainer>
    )
}

export default CustomReactPlayer;