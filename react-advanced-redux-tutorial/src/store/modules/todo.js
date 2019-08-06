import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";

// [ 1. Action Type ]
const CAHNGE_INPUT = "todo/CAHNGE_INPUT";
const INSERT = "todo/INSERT";
const TOGGLE = "todo/TOGGLE";
const REMOVE = "todo/REMOVE";

// [ 2. Action Creator ]
export const changeInput = createAction(CAHNGE_INPUT, value => value);
export const insert = createAction(INSERT, text => text);
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

// [ createAction 으로 액션 생성 후 파라미터를 전달했을 때 결과 값 예시 ]
// const sample = createAction( #{액션타입} , #{payload Creator}, #{meta Creator});

// const sample = createAction('SAMPLE', (value) => value + 1, (value) => value - 1);
// sample(1);
// { type: 'SAMPLE', payload: 2, meta: 0 }

// [ 3. Reducer ]
const initialState = Map({
  input: "",
  todos: List()
});
let id = 0;

export default handleActions(
  {
    [CAHNGE_INPUT]: (state, action) => (state.set("input", action.payload)),
    [INSERT]: (state, action) => {
      const text = action.payload;
      const item = Map({ id: id++, checked: false, text });
      state.set('input', '');
      console.log(state.toJS());
      return state.update("todos", todos => todos.push(item));
    },
    [TOGGLE]: (state, action) => {
      const id = action.payload;
      const index = state.get("todos").findIndex(item => item.get("id") === id);
      console.log('찾은 인덱스 : ', index);
      // immutable : 불변의
      // {todos : [...]}
      //  todos[index] 의 checked 프로퍼티로 들어감
      return state.updateIn(["todos", index, "checked"], checked => !checked);
    },
    [REMOVE]: (state, action) => {
      const id = action.payload;
      const index = state.get("todos").findIndex(item => item.get("id") === id);
      // todos[index] 를 찾아 삭제 함
      return state.deleteIn(["todos", index]);
    }
  },
  initialState
);
