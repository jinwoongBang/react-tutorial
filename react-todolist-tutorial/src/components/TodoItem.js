import React, { Component } from 'react';
import styled from 'styled-components';

const TodoItemContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;

  &:hover {
    background: #e3fafc;
  }

  /* todo-item 에 마우스가 있을때만 .remove 보이기 */
  &:hover .remove {
    opacity: 1;
  }

  /* todo-item 사이에 윗 테두리 */
  & + & {
    border-top: 1px solid #f1f3f5;
  }

  .remove {
    margin-right: 1rem;
    color: #e64980;
    font-weight: 600;
    opacity: 0;
  }

  .todo-text {
    flex: 1; /* 체크, 엑스를 제외한 공간 다 채우기 */
    word-break: break-all;
  }

  .checked {
    text-decoration: line-through;
    color: #adb5bd;
  }

  .check-mark {
    font-size: 1.5rem;
    line-height: 1rem;
    margin-left: 1rem;
    color: #3bc9db;
    font-weight: 800;
  }
`;

class TodoItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked;
  }

  render() {
    const { text, checked, id, onToggle, onRemove, color } = this.props;

    return (
      <TodoItemContainer onClick={() => onToggle(id)}>
        <div
          className="remove"
          onClick={(e) => {
            e.stopPropagation(); // onToggle 이 실행되지 않도록 함
            onRemove(id);
          }}
        >
          &times;
        </div>
        <div className={`todo-text ${checked && 'checked'}`} style={{color: color}}>
          <div>{text}</div>
        </div>
        {checked && <div className="check-mark">&#x2713;</div>}
      </TodoItemContainer>
    );
  }
}

export default TodoItem;
