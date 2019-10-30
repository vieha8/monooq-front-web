// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import { H1 } from 'components/LV1/Texts/Headline';
import Path from 'config/path';

const Content = styled.div`
  margin-top: ${Dimens.medium1}px;
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `};
`;

const ToProfileLink = styled(Link)`
  margin-top: ${Dimens.medium2}px;
  display: block;
  font-size: ${FontSizes.medium}px;
  text-align: left;
  color: ${Colors.linkBlue};
  ${media.phone`
    margin-top: ${Dimens.medium_20}px;
  `}
`;

type PropTypes = {
  userId: number,
};

export default ({ userId }: PropTypes) => (
  <Content>
    <H1 bold>プロフィール編集が完了しました</H1>
    <ToProfileLink to={Path.profile(userId)}>プロフィールページを確認する</ToProfileLink>
  </Content>
);
