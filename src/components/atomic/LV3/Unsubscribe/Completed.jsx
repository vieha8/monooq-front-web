// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/atomic/LV1/InlineText';

const Row = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${props =>
    props.alignRight &&
    `
    text-align: right;
  `}
  ${props =>
    props.mobile &&
    `
    display: none;
  `}
  ${media.tablet`
    ${props =>
      props.mobile &&
      `
      display: block;
    `}
  `}
`;

export default () => (
  <Fragment>
    <InlineText.Base>
      モノオクをご利用頂き、ありがとうございました。退会処理が完了しました。
    </InlineText.Base>
    <Row>
      <InlineText.Base>
        これからもみなさんにより便利に物置きシェアサービスを使って頂くために、<br />
        サービス改善に努めて参ります。<br />
        このままお待ちください。しばらくするとログイン画面へ戻ります。
      </InlineText.Base>
    </Row>
  </Fragment>
);
