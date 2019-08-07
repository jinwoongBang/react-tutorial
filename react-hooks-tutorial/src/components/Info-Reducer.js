import React, { useReducer } from 'react';

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}

const InfoReducer = () => {
  const [state, dispatch] = useReducer(reducer, { name: '', nickname: '' });
  const { name, nickname } = state;
  const onChange = (e) => {
    console.log(e.target);
    dispatch(e.target)
  }

  // useState 사용 (reducer 적용 전)
  // const onChangeName = e => {
  //   setName(e.target.value);
  // };

  // const onChangeNickname = e => {
  //   setNickname(e.target.value);
  // };

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

export default InfoReducer;
