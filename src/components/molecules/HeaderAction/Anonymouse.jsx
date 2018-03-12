// @flow

import React from 'react';
import styled from 'styled-components';
import TextLink from 'components/atoms/TextLink';

const TextWrapper = styled.span`
  display: inline-block;
  &:not(:first-child) {
    margin-left: 8px;
  }
`;

type PropTypes = {
  loginUri: string,
  signupUri: string,
}

export default (props: PropTypes) => (
  <span>
    <TextWrapper>
      <TextLink href={props.loginUri}>ログイン</TextLink>
    </TextWrapper>
    <TextWrapper>
      /
    </TextWrapper>
    <TextWrapper>
      <TextLink href={props.signupUri}>登録</TextLink>
    </TextWrapper>
  </span>
);
