import * as types from './ActionType';

export const changeToggle = () => ({
    type: types.CHANGE_TOGGLE
})

export const changePage = (currentPage) => ({
  type: types.CHANGE_PAGE,
  currentPage: currentPage
})

export const searchDevice = (/* 검색 조건 */) => ({
  type: types.SEARCH_DEVICE
})
