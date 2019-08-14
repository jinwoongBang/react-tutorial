import React from 'react';
import * as types from '../actions/ActionType';
// import {} from 'axios';

const initialState = {
  deviceList: [
    {
      displayName: '',
      osType: '',
      osVersion: '',
      volume: '',
      cpuInfo: '',
      gpuInfo: '',
      date: new Date()
    }
  ]
};

const reducer = (state = initialState, action) => {
  console.log('state : ', state);
  switch (action.type) {
    case types.SEARCH_DEVICE:
      /* api 검색 조건 */
      const searchCondition = action.searchCondition;
      /* api 검색 결과 */
      const result = [
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ];
      return {
        ...state,
        deviceList: result
      };
    default:
      return state;
  }
};

export default reducer;
