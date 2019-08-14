import React, { useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { Container, Row, Col } from 'reactstrap';

const CardListContainer = styled(Container)``;

const CardList = ({ searchDevice, list }) => {
  console.log('test');

  const deviceList = useCallback((e) => {
    console.log(searchDevice());
  }, []);

  return (
    <CardListContainer fluid={true} className="border p-0">
      <Row className="">
        {list.map((item, key) => {
        return (
          <Col md="4" className="" key={key} >
            <Card info={item} />
          </Col>
        )})}
      </Row>
    </CardListContainer>
  );
};

CardList.defaultProps = {
  list: [{}, {}, {}]
};

export default CardList;
