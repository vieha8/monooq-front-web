import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from '../../variables';

const Container = styled.div`
  width: 100%;
  background-color: ${Colors.lightYellow};
  padding: ${Dimens.medium2}px;
`;

const Title = styled.span`
  display: block;
  color: ${Colors.black};
  font-size: ${FontSizes.medium1}px;
`;

const Text = styled.span`
  display: block;
  color: ${Colors.black};
  font-size: ${FontSizes.small}px;
  margin-top: ${Dimens.medium}px;
  line-height: 2;
`;

export default props => (
  <Container>
    <Title>{props.title}</Title>
    <Text>{props.text}</Text>
  </Container>
);
