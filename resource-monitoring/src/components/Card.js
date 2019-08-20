import React from 'react';
import styled from 'styled-components';
import {
  Row,
  Container,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
  Button
} from 'reactstrap';

const CustomCardContainer = styled(Card)`
  
`;

const CustomCard = ({deviceInfo}) => {
  const { displayName, osVersion, volume, cpuInfo, gpuInfo, date} = deviceInfo;
  return (
    <CustomCardContainer>
      <CardImg top width="100%" src="/favicon.ico" alt="Card image cap" />
      <CardBody>
        <CardTitle>{displayName}</CardTitle>
        <CardSubtitle>{osVersion}</CardSubtitle>
        <CardText>{volume}</CardText>
        <CardText>{cpuInfo}</CardText>
        <CardText>{gpuInfo}</CardText>
        <Button>Button</Button>
      </CardBody>
      <CardFooter>{date}</CardFooter>
    </CustomCardContainer>
  );
};

CustomCard.defaultProps = {
  displayName: 'Data is none.',
  osType: 'Data is none.',
  osVersion: 'Data is none.',
  volume: 'Data is none.',
  cpuInfo: 'Data is none.',
  gpuInfo: 'Data is none.',
  date: 'Data is none.'
};

export default CustomCard;
