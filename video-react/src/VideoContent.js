import React, { useRef, useCallback, useEffect }from 'react';
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
        setVideoReadyState,
        src,
        percent
    }) => {
        
    const videoRef = useRef(null);

    useEffect(() => {
        console.log("src : ", src);
    }, [src]);

    const onTimeUpdateVideo = useCallback(() => {
        const player = videoRef.current;
        onTimeUpdate(player);
    }, [onTimeUpdate]);

    const onLoadedVideoMetadata = useCallback(() => {
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
                onLoadedMetadata={onLoadedVideoMetadata}
                onVolumeChange={(event) => {
                    console.log(event);
                }}
                onCanPlay={(event) => {
                    const player = videoRef.current;
                    console.log({player: player});
                    setVideoReadyState(true);
                }}
            >
                <source src={src}></source>
            </video>
        </VideoContentContainer>
    );
}

export default VideoContent;