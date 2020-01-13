import React from 'react';

const ProgressPrint = ({
    currentTime,
    currentTimePercent,
    inTimePercent,
    inTime,
    outTimePercent,
    outTime,
    timeControlVolume,
    selectedBar
}) => {

    return (
        <div>
            <div>
                <p style={{ "color": "black" }}>진행 시간 : {currentTime} 초</p>
                <p style={{ "color": "black" }}>진행 률 : {currentTimePercent} %</p>
                <p style={{ "color": "black" }}>In Time : {inTime} 초 / {inTimePercent} %</p>
                <p style={{ "color": "black" }}>Out Time : {outTime} 초 / {outTimePercent} %</p>
                <p style={{ "color": "black" }}>미세 조정 : {timeControlVolume} 초</p>
                <p style={{ "color": "black" }}>선택된 막대 : {(selectedBar !== null) ? selectedBar.attributes.type.value : null}</p>
            </div>
            <hr></hr>
        </div>
    );
}

export default ProgressPrint;