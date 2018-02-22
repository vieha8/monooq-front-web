import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from '../../variables';

const Container = styled.div`
  margin-bottom: ${Dimens.small}px;
`;

const Header = styled.h1`
  display: block;
  color: ${Colors.black};
  font-size: ${FontSizes.xlarge}px;
`;

const SubHeader = styled.h2`
  display: block;
  color: ${Colors.black};
  font-size: ${FontSizes.large}px;
  margin-top: ${Dimens.large}px;
`;

export default props => (
  <Container>
    <Header>{props.header}</Header>
    <SubHeader>{props.subHeader}</SubHeader>
  </Container>
);
