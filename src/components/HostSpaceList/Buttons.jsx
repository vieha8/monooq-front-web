import React from 'react';
import styled from 'styled-components';
import Button from 'components/Shared/Button';
import { Colors, FontSizes, Dimens } from 'variables';

const Container = styled.div`
  float: right;
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
        fluid
        fontSize={FontSizes.xsmall}
      >
        編集する
      </Button>
    </ButtonWrapper>
    <ButtonWrapper>
      <Button
        fluid
        fontSize={FontSizes.xsmall}
        bgColor={Colors.white}
        fontColor={Colors.darkGray1}
        borderColor={Colors.darkGray1}
      >
        非公開にする
      </Button>
    </ButtonWrapper>
  </Container>
);
