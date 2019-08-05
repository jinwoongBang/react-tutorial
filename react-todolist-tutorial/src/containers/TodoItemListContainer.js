import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/ActionCreator';
import TodoItemList from '../components/TodoItemList'

const mapStateToProps = (state) => ({
    todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
    onToggle: (id) => {actions.toggleTodo(id)}
});

const TodoItemListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoItemList)

export default TodoItemListContainer;