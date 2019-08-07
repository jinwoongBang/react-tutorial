import React, { useState, useMemo } from 'react';

const getAverage = numbers => {
  console.log('평균값 계산 중...');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);

  return sum / numbers.length;
};

const AverageUseMemo = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');

  const onInsert = e => {
    console.log("onInsert()");
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  };

  const onChange = e => {
    console.log("onChange()");
    setNumber(e.target.value);
  };

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        {/* <b>평균 값 : </b> {getAverage(list)} */}
        <b>평균 값 : </b> {avg}
      </div>
    </div>
  );
};

export default AverageUseMemo;
