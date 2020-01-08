import React, { useRef, useCallback }from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';

const VideoContentContainer = styled.div`
    position: relative;

    video {
        position: relative;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: auto;
        padding: 0;
        margin: 0;
        box-shadow: 0 10px 10px 0 gray;
    }
`;

const VideoContent = ({ onTimeUpdate, onCanPlay, src, percent}) => {
    const videoRef = useRef(null);

    const onCanPlayVideo = useCallback(() => {
        const player = videoRef.current;
        onCanPlay(player);
    }, [onCanPlay]);

    const onTimeUpdateVideo = useCallback(() => {
        const player = videoRef.current;
        onTimeUpdate(player);
    }, [onTimeUpdate]);

    return (
        <VideoContentContainer>
            <video
                ref={videoRef}
                controls={false}
                preload="auto"
                onTimeUpdate={onTimeUpdateVideo}
                onCanPlay={onCanPlayVideo}
                className="radius"
            >
                <source src={src}></source>
            </video>
        </VideoContentContainer>
    );
}

export default VideoContent;