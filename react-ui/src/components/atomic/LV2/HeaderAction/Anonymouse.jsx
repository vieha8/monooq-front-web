// @flow

import React from 'react';
import styled from 'styled-components';
import TextLink from 'components/atomic/LV1/TextLink';
import { Colors, FontSizes } from 'variables';
import Button from 'components/atomic/LV1/Button';
import { media } from 'helpers/style/media-query';

const Container = styled.span`
  display: table;
  height: 100%;
  margin-right: 35px;
  ${media.phone`
    margin-right: 10px;
  `};
`;

const TextWrapper = styled.span`
  width: 120px;
  ${media.phone`
    width: auto;
  `};
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  &:not(:first-child) {
    padding-left: 8px;
  }
`;

const OnlyPC = styled.span`
  display: block;
  ${media.phone`
    display: none;
  `};
`;

const OnlyPhone = styled.span`
  display: none;
  ${media.phone`
    display: block;
  `};
`;

type PropTypes = {
  loginUri: string,
  signupUri: string,
};

export default (props: PropTypes) => (
  <Container>
    <OnlyPC>
      <TextWrapper>
        <TextLink
          href={props.signupUri}
          fontSize={FontSizes.small}
          color={Colors.brandPrimary}
          bold
        >
          新規登録
        </TextLink>
      </TextWrapper>
      <TextWrapper>
        <Button primary link href={props.loginUri} height={40}>
          ログイン
        </Button>
      </TextWrapper>
    </OnlyPC>
    <OnlyPhone>
      <TextWrapper>
        <Button primary link href={props.loginUri} height={40}>
          新規登録・ログイン
        </Button>
      </TextWrapper>
    </OnlyPhone>
  </Container>
);
