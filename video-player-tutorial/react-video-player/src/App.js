import React from 'react';
import ReactPlayer from 'react-player';
import { Player } from 'video-react';

function App() {
  return (
    <div>
      <h1>test</h1>
      {/* <ReactPlayer playing
        url={[
          { src: './유출금지.mov', type: 'video/mp4' },
        ]}
        config={{
          file: {
            forceVideo: true,
            attributes: {
              src: "./유출금지.mov",
              preload: "auto",
            }
          }
        }}
      /> */}

      <Player
        playsInline>
        {/* <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"></source> */}
        <source src="/src/유출금지.mov"></source>
      </Player>

    </div>
  );
}

export default App;
