const loggerMiddleware = store => next => action => {
  /* 미들웨어 내용 */

  // [1] 현재 스토어 상태 값 기록
  console.log('현재 상태', store.getState());

  // [2] 액션 기록
  console.log('액션', action);

  // [3] 액션을 다음 미들웨어, 혹은 리듀서로 넘김
  const result = next(action);

  // [4] 액션 처리 후의 스토어 상태 기록
  console.log('다음 상태', store.getState());
  console.log('\n');

  return result; // 여기서 반환하는 값은 store.dispatch(ACTION_TYPE) 했을 때의 결과로 설정됩니다.
  
};

export default loggerMiddleware;
