// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/atomic/LV1/InlineText';
import TextLink from 'components/atomic/LV1/TextLink';
import ButtonLineA from 'components/atomic/LV1/ButtonLineA';

import { Colors, Dimens } from 'variables';
import Path from 'config/path';

const Text = styled.div`
  margin-top: ${Dimens.medium1_26}px;
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: 30px auto;
  ${media.phone`
    display: block;
    width: 100%;
    max-width: 100%;
    left: 0px;
    bottom: 0px;
    z-index: 1000;
    text-align: center;
    padding: 0 0 15px;
  `};
`;

const UnsubscribeText = styled.div`
  ${media.phone`
    position: absolute;
    bottom: 15px;
  `};
`;

type PropTypes = {
  isLogin: boolean,
};

export default ({ isLogin }: PropTypes) => (
  <Fragment>
    <Text>
      <InlineText.Base>
        サービスの不明点・お困りのことがあれば、モノオクカスタマーサポートまでお寄せください。
        お問い合わせはLINEにて対応しております。下記より友だち追加の上、ご連絡ください。
        <br />
      </InlineText.Base>
      <ButtonWrap>
        <ButtonLineA reactGACategory="Inquiry" reactGAAction="Push LINE Register Button" />
      </ButtonWrap>
    </Text>
    {isLogin && (
      <UnsubscribeText>
        <TextLink to={Path.unsubscribe()} fontSizeSp={15} color={Colors.brandPrimary}>
          退会希望の方はこちら
        </TextLink>
      </UnsubscribeText>
    )}
  </Fragment>
);
