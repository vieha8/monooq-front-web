// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';

const Content = styled.div`
  margin-top: ${Dimens.medium1}px;
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `};
`;

const ToProfileLink = styled(Link)`
  display: block;
  font-size: ${FontSizes.medium}px;
  text-align: left;
  color: ${Colors.linkBlue};
  &:hover {
    color: ${Colors.linkBlue};
  }
`;

type PropTypes = {
  userId: number,
};

export default (props: PropTypes) => (
  <Content>
    <ToProfileLink to={Path.profile(props.userId)}>プロフィールページを確認する</ToProfileLink>
  </Content>
);
