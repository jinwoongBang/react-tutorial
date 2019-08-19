import React, { useCallback, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { Container, Row, Col } from 'reactstrap';
import axios, { withAxios } from 'axios';
import testData from '../lib/test-data';

const CardListContainer = styled(Container)``;

const CardList = ({ DeviceActions, deviceList }) => {
  useEffect(() => {
    console.log('useEffect() invoked');
    DeviceActions.getPost().then((res) => {
      console.log(res);
    });
  }, []);

  console.log('deviceList : ', deviceList);

  return (
    <CardListContainer fluid={true} className="border p-0">
      <Row className="">
      </Row>
    </CardListContainer>
  );
};

// CardList.defaultProps = {
//   list: [{}, {}, {}]
// };

export default CardList;
