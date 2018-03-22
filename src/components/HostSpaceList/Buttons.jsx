import React from 'react';
import styled from 'styled-components';
import Button from 'components/Shared/Button';
import { FontSizes, Dimens } from 'variables';
import path from '../../config/path'

const Container = styled.div`
  float: right;
`;

const ButtonWrapper = styled.div`
  &:not(:first-child) {
    margin-top: ${Dimens.small}px;
  }
`;

export default (props) => (
  <Container>
    <ButtonWrapper>
      <Button
        fluid
        fontSize={FontSizes.xsmall}
        onClick={() => {
          props.history.push(path.editSpaceInfo(props.space.ID))
        }}
      >
        編集する
      </Button>
    </ButtonWrapper>
  </Container>
);
