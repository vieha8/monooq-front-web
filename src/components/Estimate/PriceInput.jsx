import React from 'react';
import styled from 'styled-components';
import Input from 'components/Shared/Input';
import { FontSizes, Colors, Dimens } from 'variables';

const Container = styled.div`
  width: 100%;
`;

const Label = styled.span`
  display: block;
  margin-bottom: ${Dimens.small2}px;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.black};
`;

const InputWrapper = styled.div`
  display: inline-block;
  width: 80%;
  vertical-align: middle;
`;

const Unit = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin-top: ${Dimens.medium}px;
  margin-left: ${Dimens.small}px;
`;

export default () => (
  <Container>
    <Label>お見積もり料金</Label>
    <div>
      <InputWrapper>
        <Input
          type="number"
        />
      </InputWrapper>
      <Unit>円</Unit>
    </div>
  </Container>
);
