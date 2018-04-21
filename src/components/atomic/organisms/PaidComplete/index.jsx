// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import { H1 } from 'components/atomic/atoms/Headline';
import InlineText from 'components/atomic/atoms/InlineText';
import Button from 'components/atomic/atoms/Button';

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

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.large}px;
`;

type PropTypes = {
  spaceName: string,
  onClickToMessage: boolean,
};

export default (props: PropTypes) => (
  <Fragment>
    <H1>お支払いが完了しました</H1>
    <Row>
      <InlineText.Base>「{props.spaceName}」の予約とお支払いが完了しました。</InlineText.Base>
    </Row>
    <ButtonWrapper>
      <Button primary fill={1} onClick={props.onClickToMessage}>
        ホストに連絡する
      </Button>
    </ButtonWrapper>
  </Fragment>
);
