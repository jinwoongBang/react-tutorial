import { createAction, handleActions } from 'redux-actions';

// 카운터 관련 상태 로직
// 하나의 파일에 액션 타입, 액션 생성 함수, 리듀서를 모두 다 넣는 것을 'Ducks' 구조 라고 한다

// [ 1. Action Type ]
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// [ 2-1. Action Creator ]
// export const increment = () => ({ type: INCREMENT });
// export const decrement = () => ({ type: DECREMENT });

// [ 2-2. Action Creator ]
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

// [ 3-1. Reducer ]
// const initialState = {
//     number: 0
// }

// export default function reducer(state = initialState, action) {
//     switch (action.type) {
//         case INCREMENT:
//             return { number : state.number + 1 }
//         case DECREMENT:
//             return { number : state.number - 1 }
//         default:
//             return state;
//     }
// }

// [ 3-2. Reducer ]
const initialState = {
    number: 0
}

// handleActions 의 첫번째 파라미터(액션함수)는 액션을 처리하는 함수들로 이뤄진 객체이고
// 두번째 파라미터(최초 상태)는 초기 상태입니다.
export default handleActions({
    [INCREMENT]: (state, action) => {
        return { number: state.number + 1 };
    },
    [DECREMENT]: ({ number }) => ({ number: number - 1 })
}, initialState);