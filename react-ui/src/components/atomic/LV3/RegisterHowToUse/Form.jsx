// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

const Title = styled.div`
  text-align: center;
  margin-top: ${Dimens.small}px;
  ${media.phone`
    text-align: left;
    margin-top: ${Dimens.xxsmall}px;
  `};
`;

const Caption = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const CaptionSub = styled.div`
  text-align: center;
  margin: ${Dimens.medium2}px auto;
  ${media.phone`
    margin: 20px auto;
  `};
`;

const IsHost = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const Button = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

type PropTypes = {
  title: React.Element<*>,
  caption: React.Element<*>,
  isHost: React.Element<*>,
  captionSub: React.Element<*>,
  button: React.Element<*>,
};

export default (props: PropTypes) => (
  <Fragment>
    <Title>{props.title}</Title>
    <Caption>{props.caption}</Caption>
    <IsHost>{props.isHost}</IsHost>
    <CaptionSub>{props.captionSub}</CaptionSub>
    <Button>{props.button}</Button>
  </Fragment>
);
