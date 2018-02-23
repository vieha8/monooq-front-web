import React from 'react';
import styled from 'styled-components';
import { Dimens } from '../../../variables';

const Container = styled.div`
  max-width: 340px;
  width: 40%;
  height: 100%;
  float: right;
  margin-top: 100px;
`;

const SaveContainer = styled.div`
  width: 100%;
`;

const HintContainer = styled.div`
  width: 100%;
  margin-top: ${Dimens.medium3}px;
`;

export default props => (
  <Container>
    <SaveContainer>{props.renderSaveContent && props.renderSaveContent()}</SaveContainer>
    <HintContainer>{props.renderHintContent && props.renderHintContent()}</HintContainer>
  </Container>
);
