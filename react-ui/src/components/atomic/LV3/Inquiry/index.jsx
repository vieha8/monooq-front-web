// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import TextLink from 'components/atomic/LV1/TextLink';
import ButtonLineA from 'components/atomic/LV1/ButtonLineA';

import { Dimens } from 'variables';
import Path from 'config/path';

const Text = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const UnsubscribeText = styled.div`
  margin-top: ${Dimens.large}px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

type PropTypes = {
  isLogin: boolean,
};

export default ({ isLogin }: PropTypes) => (
  <Fragment>
    <Text>
      <InlineText.Base>
        サービスの不明点・お困りのことがあれば、モノオクカスタマーサポートまでお寄せください。
        <br />
        お問い合わせはLINEにて対応しております。下記より友だち追加の上、ご連絡ください。
        <br />
      </InlineText.Base>
      <ButtonContainer>
        <ButtonLineA reactGACategory="Inquiry" reactGAAction="Push LINE Register Button" />
      </ButtonContainer>
    </Text>
    {isLogin && (
      <UnsubscribeText>
        <TextLink to={Path.unsubscribe()}>退会希望の方はこちら</TextLink>
      </UnsubscribeText>
    )}
  </Fragment>
);
