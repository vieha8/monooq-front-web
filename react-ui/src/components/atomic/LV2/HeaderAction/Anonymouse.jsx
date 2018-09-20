// @flow

import React from 'react';
import styled from 'styled-components';
import TextLink from 'components/atomic/LV1/TextLink';

const Container = styled.span`
  display: table;
  height: 100%;
`;

const TextWrapper = styled.span`
  display: table-cell;
  vertical-align: middle;
  &:not(:first-child) {
    padding-left: 8px;
  }
`;

type PropTypes = {
  loginUri: string,
  signupUri: string,
};

export default (props: PropTypes) => (
  <Container>
    <TextWrapper>
      <TextLink href={props.loginUri}>ログイン</TextLink>
    </TextWrapper>
    <TextWrapper>/</TextWrapper>
    <TextWrapper>
      <TextLink href={props.signupUri}>登録</TextLink>
    </TextWrapper>
  </Container>
);
