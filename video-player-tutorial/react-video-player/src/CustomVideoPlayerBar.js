import React, { useEffect, useState } from 'react';

const CustomVideoPlayerBar = ({ player }) => {
    // const [initPlayer, setInitPlayer] = useState();

    useEffect(() => {
        const _player = player.current;
        console.log("useEffect 안(init) : ", _player.currentTime);
        
        // setInitPlayer(player.current);
    }, [player]);



    return (
        <div>
            <div className="playing-bar">
                <div className="current-bar" style={{ "left": "10%" }}></div>
            </div>
            <h2></h2>
        </div>
    )
};

export default CustomVideoPlayerBar;