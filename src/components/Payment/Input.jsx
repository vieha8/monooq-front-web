import React from 'react';
import styled from 'styled-components';
import Input from 'components/Shared/Input';
import ErrorText from 'components/Shared/ErrorText';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

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
  width: 60%;
  ${props => props.width && `
    width: ${props.width}px;
  `}
  vertical-align: middle;
  ${media.phone`
    width: 100%;
  `}
`;

export default props => (
  <Container>
    <Label>{props.label}</Label>
    <div>
      <InputWrapper width={props.width}>
        <Input
          type={props.type}
          onChange={e => props.onChange(e.target.value)}
          placeholder={props.placeholder}
          invalid={(props.errors || []).length > 0}
        />
      </InputWrapper>
    </div>
    {props.errors && <ErrorText errors={props.errors} />}
  </Container>
);
