import React from 'react';
import * as types from '../actions/ActionType';

const initialState = {
  toggle: true,
  currentPage: 'Home'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_TOGGLE:
      return {
        ...state,
        toggle: !state.toggle
      };
    case types.CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      };
    default:
      return state;
  }
};

export default reducer;
