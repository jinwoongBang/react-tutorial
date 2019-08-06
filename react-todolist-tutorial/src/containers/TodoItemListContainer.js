import { connect } from 'react-redux';
import * as actions from '../actions/ActionCreator';
import TodoItemList from '../components/TodoItemList'

const mapStateToProps = (state) => ({
    todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
    onToggle: (id) => dispatch(actions.toggleTodo(id)),
    onRemove: (id) => dispatch(actions.removeTodo(id))
});

const TodoItemListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoItemList)

export default TodoItemListContainer;