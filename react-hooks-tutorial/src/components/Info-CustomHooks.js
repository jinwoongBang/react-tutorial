import React, { useReducer } from 'react';
import useInputs from '../module/useInputs';

const Info = () => {
  const [state, onChange] = useInputs({
    name: '',
    nickname: ''
  });

  const { name, nickname } = state;

  return (
    <div>
      <div>
        <input value={name} name="name" onChange={onChange} />
        <input value={nickname} name="nickname" onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름 : </b> {name}
        </div>
        <div>
          <b>닉네임 : </b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
