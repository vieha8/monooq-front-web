import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from '../../../variables';
import { media } from '../../../helpers/style/media-query';

const Container = styled.div`
  margin-bottom: ${Dimens.small}px;
`;

const Header = styled.h1`
  display: block;
  color: ${Colors.black};
  font-size: ${FontSizes.xlarge}px;
  ${media.phone`
    font-size: ${FontSizes.large}px;
  `}
`;

const SubHeader = styled.h2`
  display: block;
  color: ${Colors.black};
  font-size: ${FontSizes.large}px;
  margin-top: ${Dimens.large}px;
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
  `}
`;

export default props => (
  <Container>
    <Header>{props.header}</Header>
    <SubHeader>{props.subHeader}</SubHeader>
  </Container>
);
