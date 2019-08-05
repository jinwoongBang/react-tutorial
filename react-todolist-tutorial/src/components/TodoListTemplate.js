import React from 'react';
import styled from 'styled-components';
import Palette from './Palette';

const MainContainer = styled.main`
  background: white;
  width: 512px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); /* 그림자 */
  margin: 0 auto; /* 페이지 중앙 정렬 */
  margin-top: 4rem;

  .title {
    padding: 2rem;
    font-size: 2.5rem;
    text-align: center;
    font-weight: 100;
    background: #22b8cf;
    color: white;
  }

  .form-wrapper {
    padding: 1rem;
    border-bottom: 1px solid #22b8cf;
  }

  .palette-wrapper {
    padding: 1rem;
    background: #E5E5E5;
  }

  .todos-wrapper {
    min-height: 5rem;
  }
`;

const TodoListTemplate = ({ form, children, palette }) => {
  return (
    <MainContainer className="todo-list-template">
      <div className="title">오늘 할 일</div>
      <section className="palette-wrapper">{palette}</section>
      <section className="form-wrapper">{form}</section>
      <section className="todo-wrapper">{children}</section>
    </MainContainer>
  );
};

export default TodoListTemplate;
