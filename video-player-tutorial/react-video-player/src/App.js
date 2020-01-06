import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import videoSource from './video/유출금지.mov';
import poster from './video/download.jpg';

// [1] react-player
// import ReactPlayer from 'react-player';
// [2] video-react
// import { Player } from 'video-react';
// [3] video.js
import VideoPlayer from './VideoPlayer';
// [4] custom video player
import CustomVideoPlayer from './CustomVideoPlayer';



const App = () => {

  // const [player, setPlayer] = useState(null);
  // const playerContainer = useRef(null);

  // useEffect(() => {
  //   console.log("player : ", player);
  //   console.log("playerContainer : ", playerContainer);
  //   console.log("playerContainer current : ", playerContainer.current);
  //   setPlayer(playerContainer.current);
  //   playerContainer.current.play();
  // });

  // const onPlay = useMemo(() => {
  //   player.play();
  // }, []);

  // const videoJsOptions = {
  //   autoplay: true,
  //   controls: true,
  //   sources: [{
  //     src: videoSource,
  //     type: 'video/mp4'
  //   }]
  // }

  return (
    <div>
      <div>
        <h1>Custom</h1>
        <CustomVideoPlayer src={videoSource} poster={poster}></CustomVideoPlayer>
      </div>
    </div>
  );
}

export default App;

