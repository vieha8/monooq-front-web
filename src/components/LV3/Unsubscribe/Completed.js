import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/LV1/Texts/InlineText';
import { H1 } from 'components/LV1/Texts/Headline';

const Wrap = styled.div`
  width: 100%;
  margin-top: ${Dimens.medium_20}px;
`;

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
  <Wrap>
    <H1 bold>退会処理が完了しました</H1>
    <InlineText.Base>
      モノオクをご利用頂き、ありがとうございました。退会処理が完了しました。
    </InlineText.Base>
    <Row>
      <InlineText.Base>
        これからもみなさんにより便利に物置きシェアサービスを使って頂くために、
        <br />
        サービス改善に努めて参ります。
        <br />
        このままお待ちください。しばらくするとトップページへ戻ります。
      </InlineText.Base>
    </Row>
  </Wrap>
);
