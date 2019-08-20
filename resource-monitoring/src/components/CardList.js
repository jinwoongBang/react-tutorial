import React, { useCallback, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';
import Pagination from './Pagination';
import { Container, Row, Col, Spinner, Button } from 'reactstrap';

const CardListContainer = styled(Container)``;

const CardList = ({ DeviceActions, deviceList, pending, error }) => {
  console.log('pending : ', pending);
  useEffect(() => {
    DeviceActions.getPost();
  }, []);

  return (
    <CardListContainer fluid={true} className="border">
      {pending === true && (
        <Row className="my-4">
          <Col>
            <Spinner size="lg" color="primary" />
            {'loading...'}
          </Col>
        </Row>
      )}
      <Row className="border">
        <Col xs="9" className="border">
          <p className="text-left border">총 <span>10</span> 개의 장비</p>
        </Col>
        <Col xs="3" className="border">
            <Button>썸네일</Button>
            <Button>리스트</Button>
        </Col>
      </Row>
      <Row className="">
        {deviceList.length > 0 || pending === false ? (
          deviceList.map(item => {
            return (
              <Col md="3" key={item.deviceId} className="mt-3">
                <Card deviceInfo={item} />
              </Col>
            );
          })
        ) : (
          <Col>
            <p>Device is none</p>
          </Col>
        )}
      </Row>
      <Row className="my-4">
        <Col>
          <Pagination onClick={DeviceActions.awaitChangePage} />
        </Col>
      </Row>
    </CardListContainer>
  );
};

export default CardList;
