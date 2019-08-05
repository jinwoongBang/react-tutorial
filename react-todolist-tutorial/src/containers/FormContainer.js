import React, { Component } from 'react';
import Form from '../components/Form';
import * as actions from '../actions/ActionCreator';
import { connect } from 'react-redux';

// class FormContainer extends Component {
//   onKeyPress = (e) => {
//     if (e.key === 'Enter') this.handleCreate();
//   };

//   render() {
//     // console.log(this.props);
//     return <Form />;
//   }
// }

const mapStateToProps = (state) => ({
  selectedColor: state.color,
  value: state.input,
});

const mapDispatchToProps = (dispatch) => ({
  onCreate: (text, color) => dispatch(actions.addTodo(text, color)),
  onChange: (e) => dispatch(actions.changeTodoInput(e.target.value)),
  // onKeyPress: (e, text, color) => {
  //   if (e.key === 'Enter') dispatch(actions.addTodo(text, color));
  // },
});

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

// export default FormContainer;
