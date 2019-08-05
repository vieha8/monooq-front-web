// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import { H1 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';

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
  margin: ${Dimens.medium2}px auto;
  max-width: 240px;
  ${props =>
    props.mobile &&
    `
    max-width: 100%;
  `};
`;

type PropTypes = {
  spaceName: string,
  onClickToMessage: boolean,
  onKeyDownMessage: Function,
};

export default ({ spaceName, onClickToMessage, onKeyDownMessage }: PropTypes) => (
  <Fragment>
    <H1>お支払いが完了しました</H1>
    <Row>
      <InlineText.Base>{`「${spaceName}」の予約とお支払いが完了しました。`}</InlineText.Base>
    </Row>
    <ButtonWrapper>
      <Button primary fill={1} fontbold onClick={onClickToMessage} onKeyDown={onKeyDownMessage}>
        ホストに連絡する
      </Button>
    </ButtonWrapper>
  </Fragment>
);
