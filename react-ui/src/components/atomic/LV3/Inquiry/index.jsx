// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import TextLink from 'components/atomic/LV1/TextLink';
import { Dimens } from 'variables';
import Path from 'config/path';
import ReactGA from 'react-ga';

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
        <a href="https://line.me/R/ti/p/%40wna0649g" target="_blank" rel="noopener noreferrer">
          <img
            height="48"
            border="0"
            alt="友だち追加"
            src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
            onClick={() =>
              ReactGA.event({ category: 'Inquiry', action: 'Push LINE Register Button' })
            }
          />
        </a>
      </ButtonContainer>
    </Text>
    {isLogin && (
      <UnsubscribeText>
        <TextLink to={Path.unsubscribe()}>退会希望の方はこちら</TextLink>
      </UnsubscribeText>
    )}
  </Fragment>
);
