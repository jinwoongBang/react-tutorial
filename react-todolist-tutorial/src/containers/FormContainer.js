import Form from '../components/Form';
import * as actions from '../actions/ActionCreator';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  selectedColor: state.color,
  value: state.input,
});

const mapDispatchToProps = (dispatch) => ({
  onCreate: (text, color) => dispatch(actions.addTodo(text, color)),
  onChange: (input) => dispatch(actions.changeTodoInput(input)),
});

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

export default FormContainer;
