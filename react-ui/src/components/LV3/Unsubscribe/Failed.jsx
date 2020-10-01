import React from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';
import { H1 } from 'components/LV1/Texts/Headline';

const Wrap = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${media.phone`
    margin-top: ${Dimens.medium_20}px;
  `}
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

export default ({ userId }) => (
  <Wrap>
    <H1 bold>退会処理が完了できませんでした</H1>
    <Row>
      <InlineText.Base>
        現在進行中の取引があります。
        <br />
        荷物の引取りや、引き渡しが完了していない場合は退会ができません。
        <br />
        スケジュールを確認して取引を完了してください。
      </InlineText.Base>
    </Row>
    <Row>
      <TextLink to={Path.schedule(userId)}>スケジュールを確認する</TextLink>
    </Row>
    <Row>
      ご不明な点がありましたら、以下からモノオクサポートにご連絡ください。
      <br />
      <br />
      <TextLink to={Path.inquiry()}>お問い合わせ</TextLink>
    </Row>
  </Wrap>
);
