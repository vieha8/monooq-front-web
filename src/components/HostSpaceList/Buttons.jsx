import React from 'react';
import styled from 'styled-components';
import Button from 'components/Shared/Button';
import { FontSizes, Dimens } from 'variables';
import Path from 'config/path';

const Container = styled.div`
  float: left;
  width: 120px;
`;

const ButtonWrapper = styled.div`
  &:not(:first-child) {
    margin-top: ${Dimens.small}px;
  }
`;

export default props => (
  <Container>
    <ButtonWrapper>
      <Button
        small
        fontSize={FontSizes.xsmall}
        onClick={() => props.history.push(Path.editSpaceInfo(props.space.ID))}
      >
        編集する
      </Button>
    </ButtonWrapper>
  </Container>
);
