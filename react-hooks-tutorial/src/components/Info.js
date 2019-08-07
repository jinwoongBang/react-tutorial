import React, { useState, useEffect } from 'react';

const Info = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  // [1] 랜더링 될 때마다 특정 작업 수행
  // useEffect(() => {
  //   console.log('렌더링이 완료 되었습니다!');
  //   console.log(name, nickname);
  // });

  // [2] 마운트 될 때만 실행
  // useEffect(() => {
  //   console.log('마운트 될때만 실행');
  // }, []);

  // [3] 마운트 및 특정 값이 업데이트 될 때만 실행

  // [3-1] 클래스형태
  // componentDidUpdate(prevProps, prevState){
  //   if (prevProps.value !=== this.props.value) {
  //     doSomething();
  //   }
  // }

  // [3-2] 함수 형태
  // useEffect(() => {
  //   console.log('name 업데이트 되었습니다.');
  // }, [name]);

  // [4] 뒷정리 함수
  // useEffect(() => {
  //   console.log('effect');
  //   console.log(name);

  //   return () => {
  //     console.log('cleanup');
  //     console.log(name);
  //   };
  // });

  // [4-1] 뒷정리 함수 - 마운트 및 언마운트 될때만 실행
  useEffect(() => {
    // (1) 마운트 될 때 실행
    console.log('effect');
    console.log(name);
    // (2) 언마운트 될 때 실행
    return () => {
      console.log('cleanup');
      console.log(name);
    };
  }, []); // 특정 값이 업데이트 될 때 useEffect 전체 실행

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
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
