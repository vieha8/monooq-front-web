// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/atomic/LV1/InlineText';
import TextLink from 'components/atomic/LV1/TextLink';
import Path from 'config/path';

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

export default (props: { userId: number }) => (
  <Fragment>
    <InlineText.Base>
      現在進行中の取引があります。<br />
      荷物の引取りや、引き渡しが完了していない場合は退会退会ができません。<br />
      スケジュールを確認して取引を完了してください。
    </InlineText.Base>
    <Row>
      <TextLink path={Path.schedule(props.userId)}>スケジュールを確認する</TextLink>
    </Row>
  </Fragment>
);
