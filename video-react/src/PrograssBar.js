import React from 'react';

const PrograssBar = ({ timePercent }) => {
    return (
        <div className="video-progress-bar" style={{ "width": timePercent + "%" }}>
        </div>
    )
}

export default PrograssBar;