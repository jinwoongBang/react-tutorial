import React, { useRef, useCallback }from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';

const VideoContentContainer = styled.div`
    position: relative;
    width: 100%;

    video {
        width: 100%;
        height: auto;
        display:block; 
        border-radius: 10px 10px 0 0;
    }
`;

const VideoContent = ({
        onTimeUpdate,
        onCanPlay,
        onLoadedMetadata,
        src,
        percent
    }) => {
    const videoRef = useRef(null);

    const onCanPlayVideo = useCallback(() => {
        const player = videoRef.current;
        onCanPlay(player);
    }, [onCanPlay]);

    const onTimeUpdateVideo = useCallback(() => {
        const player = videoRef.current;
        onTimeUpdate(player);
    }, [onTimeUpdate]);

    const onLoadedVideoMetadata = useCallback(() => {
        console.log("onLoadedVideoMetadata()");
        const player = videoRef.current;
        onLoadedMetadata(player);
    }, [onLoadedMetadata]);

    return (
        <VideoContentContainer>
            <video
                ref={videoRef}
                controls={false}
                preload="auto"
                onTimeUpdate={onTimeUpdateVideo}
                onCanPlay={onCanPlayVideo}
                className=""
                onLoadedMetadata={onLoadedVideoMetadata}
                onVolumeChange={(event) => {
                    console.log(event);
                }}
            >
                <source src={src}></source>
            </video>
        </VideoContentContainer>
    );
}

export default VideoContent;