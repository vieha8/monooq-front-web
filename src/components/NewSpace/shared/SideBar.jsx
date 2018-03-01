import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  max-width: 340px;
  width: 40%;
  height: 100%;
  float: right;
  margin-top: 100px;
  ${media.phone`
    display: none;
  `}
`;

const MainContainer = styled.div`
  width: 100%;
`;

const HintContainer = styled.div`
  width: 100%;
  margin-top: ${Dimens.medium3}px;
`;

export default props => (
  <Container>
    <MainContainer>{props.renderMainContent && props.renderMainContent()}</MainContainer>
    <HintContainer>{props.renderHintContent && props.renderHintContent()}</HintContainer>
  </Container>
);
