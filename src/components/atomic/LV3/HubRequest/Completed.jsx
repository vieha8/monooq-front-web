// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';

const Content = styled.div`
  line-height: 150%;
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

export default () => (
  <Content>
    お申し込みありがとうございます。<br />
    翌営業日以内にお見積りのご連絡をさせていただきます。<br />
    <ToProfileLink to={Path.top()}>トップへ戻る</ToProfileLink>
  </Content>
);
