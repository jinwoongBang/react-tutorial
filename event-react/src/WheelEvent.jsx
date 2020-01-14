import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const WheelEventContainer = styled.div`

    position: relative;
    left: 50%;
    border: 1px solid tomato;
    width: 10vw;
    height: 10vw;

`;

const WheelEvent = ({ onWheel}) => {
    /*
        deltaX: -0
        deltaY: -100
        deltaZ: 0
        deltaMode: 0
        wheelDeltaX: 0
        wheelDeltaY: 120
        wheelDelta: 120
        screenX: 487
        screenY: 166
        clientX: 608
        clientY: 78
        ctrlKey: false
        shiftKey: false
        altKey: false
        metaKey: false
        pageX: 608
        pageY: 78
        x: 608
        y: 78
        offsetX: 62
        offsetY: 70
        movementX: 0
        movementY: 0
        layerX: 62
        layerY: 70
     */
    return (
        <WheelEventContainer onWheel={onWheel}>
            <div>
                WheelEvent
            </div>
        </WheelEventContainer>
    );
}

export default WheelEvent;