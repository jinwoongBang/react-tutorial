import React from 'react';
import {
  Row,
  Col,
  Container,
  Button,
  ButtonGroup
} from 'reactstrap';
import styled from 'styled-components';

const PaginationContainer = styled(Container)`
  .test {
    border: 1px solid tomato;
    list-style: none;
  }
`;

const CustomPagination = ({onClick}) => {
  return (
    <PaginationContainer>
      <Row className="">
        <Col className="">
            <ButtonGroup>
                <Button>&lt;</Button>
                <Button onClick={onClick}>1</Button>
                <Button>2</Button>
                <Button>3</Button>
                <Button>4</Button>
                <Button>5</Button>
                <Button>&gt;</Button>
            </ButtonGroup>
        </Col>
      </Row>
    </PaginationContainer>
  );
};

export default CustomPagination;
