import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;

  input {
    flex: 1; /* 버튼을 뺀 빈 공간을 모두 채워줍니다 */
    font-size: 1.25rem;
    outline: none;
    border: none;
    border-bottom: 1px solid #c5f6fa;
  }

  .create-button {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: 1rem;
    background: #22b8cf;
    border-radius: 3px;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  .create-button:hover {
    background: #3bc9db;
  }
`;

const Form = ({ value, selectedColor, onChange, onCreate, onKeyPress }) => {
  return (
    <Container>
      <input
        value={value}
        onChange={(e) => {onChange(e.target.value)}}
        onKeyPress={onKeyPress}
        style={{ color: selectedColor }}
      />
      <div className="create-button" onClick={() => onCreate(value, selectedColor)}>
        추가
      </div>
    </Container>
  );
};

export default Form;

// class Form extends Component {

//   onChange = (e) => {
//     this.props.onChange(e.target.value);
//   }

//   onClick = () => {
//     this.props.onCreate(this.props.input, this.props.selectedColor);
//   }

//   onKeyPress = (e) => {
//     if(e.key === 'Enter') this.props.onCreate(this.props.input, this.props.selectedColor);
//   }

//   render() {
//     const { input, selectedColor } = this.props;
//     const { onChange, onClick, onKeyPress } = this;

//     return (
//       <Container>
//         <input
//           value={input}
//           onChange={onChange}
//           onKeyPress={onKeyPress}
//           style={{ color: selectedColor }}
//         />
//         <div className="create-button" onClick={onClick}>
//           추가
//         </div>
//       </Container>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   selectedColor: state.color,
//   input: state.input,
// });

// const mapDispatchToProps = (dispatch) => ({
//   onCreate: (text, color) => dispatch(actions.addTodo(text, color)),
//   onChange: (value) => dispatch(actions.changeTodoInput(value)),
// });

// const FormContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Form);

// export default FormContainer;
