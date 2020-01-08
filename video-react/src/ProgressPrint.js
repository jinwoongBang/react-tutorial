import React from 'react';

const ProgressPrint = ({
    currentTime,
    currentTimePercent,
    inTimePercent,
    inTime,
    outTimePercent,
    outTime,
}) => {

    return (
        <div>
            <div>
                <p style={{ "color": "black" }}>진행 시간 : {currentTime} 초</p>
                <p style={{ "color": "black" }}>진행 률 : {currentTimePercent + "%"}</p>
                <p style={{ "color": "black" }}>In Time : {inTime + "초"} / {inTimePercent + "%"}</p>
                <p style={{ "color": "black" }}>Out Time : {outTime + "초"} / {outTimePercent + "%"}</p>
            </div>
            <hr></hr>
        </div>
    );
}

export default ProgressPrint;