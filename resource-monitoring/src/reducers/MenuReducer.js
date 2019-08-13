import React from 'react';
import * as types from '../actions/ActionType';

const initialState = {
    toggle: true
}

const reducer = (state = initialState, action) => {
    console.log("state : ", state);
    switch (action.type) {
        case types.CHANGE_TOGGLE:
        return {
            ...state,
            toggle: !state.toggle
        };
        default:
            return state;
    }
}

export default reducer;