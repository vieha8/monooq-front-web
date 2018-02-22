import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from '../../variables';

const Container = styled.div`
  margin-top: ${Dimens.large}px;
`;

const Title = styled.h3`
  display: block;
  color: ${Colors.black};
  font-size: ${FontSizes.medium}px;
`;

const SubTitle = styled.span`
  display: block;
  color: ${Colors.gray};
  font-size: ${FontSizes.small}px;
  margin-top: ${Dimens.medium}px;
`;

export default props => (
  <Container>
    <Title>{props.title}</Title>
    {props.subTitle && <SubTitle>{props.subTitle}</SubTitle>}
  </Container>
);
