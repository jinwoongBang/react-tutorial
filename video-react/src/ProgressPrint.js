import React from 'react';

const ProgressPrint = ({ time, percent}) => {

    return (
        <div>
            <div>
                <p style={{ "color": "black" }}>진행 시간 : {time} 초</p>
                <p style={{ "color": "black" }}>진행 률 : {percent + "%"}</p>
            </div>
            <hr></hr>
        </div>
    );
}

export default ProgressPrint;