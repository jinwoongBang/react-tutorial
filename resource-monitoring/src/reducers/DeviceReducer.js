import React from 'react';
import * as types from '../actions/ActionType';

const initialState = {
  pending: false,
  error: false,
  result: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POST_PENDING:
      return {
        ...state,
        pending: true,
        error: false
      };
    case types.GET_POST_SUCCESS:
      const { data } = action.result;
      return {
        ...state,
        pending: false,
        error: false,
        result: data
      };
    case types.GET_POST_FAILURE:
      return {
        ...state,
        pending: false,
        error: true
      };
    case types.CHANGE_PENDING:
      return {
        ...state,
        pending: true
      };
    default:
      return state;
  }
};

export default reducer;
