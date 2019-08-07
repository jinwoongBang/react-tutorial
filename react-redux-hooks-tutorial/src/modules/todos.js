const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE_CHECK = 'todos/TOGGLE_CHECK';
const REMOVE = 'todos/REMOVE';

let id = 0;
export const changeInput = input => ({ type: CHANGE_INPUT, payload: input });
export const insert = text => ({
    type: INSERT,
    payload: {
        id: ++id,
        text
    }
})
export const toggleCheck = id => ({ type: TOGGLE_CHECK, payload: id });
export const remove = id => ({ type: REMOVE, payload: id });

const initialState = {
    input: '',
    todos: []
}

const todos = (state = initialState, action) => {
    
}