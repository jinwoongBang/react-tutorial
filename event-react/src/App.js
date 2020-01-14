import React, { useState, useCallback } from 'react';
import WheelEvent from './WheelEvent';



const App = () => {
    const [fineCtrl, setFineCtrl] = useState(5);
    const [cipher, setCipher] = useState(0);

    /**
     * [1] 범위 지정
     *  - infinity ~ 0.01 : ++0
     *  - 0.01 ~ 0.1 : ++0.01
     *  - 0.1 ~ 1 : ++0.1
     *  - 1 ~ 10 : ++1
     *  - 10 ~ 60 : ++10
     *  - 60 ~ infinity : ++0
     */
    const onWheel = useCallback((event) => {
        const {
            nativeEvent,
            deltaX,
            deltaY,
            deltaZ,
            deltaMode,
        } = event;
        const isWheelPositive = deltaY > 0 ? false : true;
        const z = fineCtrl.toFixed(cipher);

        let wheelCnt = (deltaY * 0.01); // 1;
        let cipherValue = cipher; // 0

        if (fineCtrlValue <= 1.0 && !isWheelPositive) {
            wheelCnt = (wheelCnt * 0.1).toFixed(1); // 0.1
            if(cipherValue < 1) {
                cipherValue += 1;
            }
        } else if (fineCtrlValue < 1.0 && isWheelPositive) {
            wheelCnt = (wheelCnt * 0.1).toFixed(1); // 0.1
            if(cipherValue >= 1) {
                cipherValue -= 1;
            }
        }; 

        if (fineCtrlValue <= 0.1 && !isWheelPositive) {
            wheelCnt = (wheelCnt * 0.1).toFixed(2); // 0.1
            if(cipherValue < 2) {
                cipherValue += 1;
            }
        } else if (fineCtrlValue < 0.1 && isWheelPositive) {
            wheelCnt = (wheelCnt * 0.1).toFixed(2); // 0.01
            console.log("up : ", wheelCnt);
            if(cipherValue >= 2) {
                cipherValue -= 1;
            }
        }; 
        setFineCtrl(Number((fineCtrlValue - wheelCnt).toFixed(cipherValue)));
        setCipher(cipherValue);
    }, [fineCtrl, cipher]);
    return (
        <div>
            <h1>미세조정 값 : {fineCtrl}</h1>
            <h1>소수 자리수 : {cipher}</h1>
            <WheelEvent onWheel={onWheel} />
        </div>
    );
}

export default App;