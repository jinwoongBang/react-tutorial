import React, { Component } from "react";
import Todos from "components/Todos";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as todoActions from "store/modules/todo";
import { Map, List } from "immutable";

// 리덕스와 연동된 컨테이너 컴포넌트 작성
class TodosContainer extends Component {
  handleChange = e => {
    const { changeInput } = this.props;
    changeInput(e.target.value);
  };

  handleInsert = () => {
    const { insert, input, changeInput } = this.props;
    insert(input);
    changeInput('');
  };

  handleToggle = id => {
    const { toggle } = this.props;
    toggle(id);
  };

  handleRemove = id => {
    const { remove } = this.props;
    remove(id);
  };
  
  render() {
    const { handleChange, handleInsert, handleToggle, handleRemove } = this;
    const { input, todos } = this.props;
    return (
      <Todos
        input={input}
        todos={todos}
        onChange={handleChange}
        onInsert={handleInsert}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />
    );
  }
}

const mapStateToProps = ({todo}) => ({
    input: todo.get('input'),
    todos: todo.get('todos')
});

const mapDispatcherToProps = dispatch => ({
  changeInput: value => dispatch(todoActions.changeInput(value)),
  insert: text => dispatch(todoActions.insert(text)),
  toggle: id => dispatch(todoActions.toggle(id)),
  remove: id => dispatch(todoActions.remove(id))
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(TodosContainer);

// export default connect(
//   // state 를 비구조화 할당 해주었습니다
//   (state) => ({
//     // immutable 을 사용하니, 값을 조회 할 때엔느 .get 을 사용해주어야하죠.
//     input: state.get("input"),
//     todos: state.get("todos")
//   }),
//   dispatch => ({
//     TodoActions: bindActionCreators(todoActions, dispatch)
//   })
// )(TodosContainer);
