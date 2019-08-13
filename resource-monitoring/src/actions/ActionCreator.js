import * as types from './ActionType';

export const testAction = test => ({
  type: types.TEST_TYPE,
  test: test
});

export const changeToggle = () => ({
    type: types.CHANGE_TOGGLE
})
