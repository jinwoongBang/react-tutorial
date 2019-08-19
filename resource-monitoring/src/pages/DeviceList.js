import React from 'react';
import CardListContainer from '../container/CardListContainer';
import styled from 'styled-components';
import { Container } from 'reactstrap';

const DeviceListContainer = styled(Container)``;

const DeviceList = ({ match }) => {
  // console.log(match);

  // api 요청을 통해 장비 정보를 가져오고
  // DeviceCardList 에게 props 로 데이터 전달
  return (
    <DeviceListContainer>
      <CardListContainer/>
    </DeviceListContainer>
  );
};

export default DeviceList;
