import React from 'react';

const PrograssBar = ({ timePercent }) => {
    return (
        <div className="video-time-bar" style={{ "width": timePercent + "%" }}>
        </div>
    )
}

export default PrograssBar;