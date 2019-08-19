import * as types from './ActionType';
import axios from 'axios';
import testData from '../lib/test-data';

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

function getPostAPI(url, requestBody) {
  return axios.post(url, requestBody);
}

export const getPost = postId => dispatch => {
  // [1] 먼저, 요청이 시작했다는 것을 알립니다.
  dispatch({ type: types.GET_POST_PENDING });

  // 요청을 시작합니다.
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다.
  return getPostAPI('http://localhost:8080/device/', testData)
    .then(response => {
      // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
      dispatch({
        type: types.GET_POST_SUCCESS,
        result: response
      });
    })
    .catch(error => {
      // 에러가 발생했을 경우, 에러 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치 합니다.
      dispatch({
        type: types.GET_POST_FAILURE,
        result: error
      });
    });
};
