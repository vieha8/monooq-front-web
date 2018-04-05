import React from 'react';
import styled from 'styled-components';
import Button from 'components/Shared/Button';
import { FontSizes, Dimens } from 'variables';

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
        onClick={props.onClickEdit}
      >
        編集する
      </Button>
    </ButtonWrapper>
    <ButtonWrapper>
      <Button
        tertiary
        small
        fontSize={FontSizes.xsmall}
        onClick={props.onClickDelete}
      >
        削除する
      </Button>
    </ButtonWrapper>
  </Container>
);
