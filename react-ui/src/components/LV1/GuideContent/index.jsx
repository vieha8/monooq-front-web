// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const GuideContent = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
  font-size: 15px;
  line-height: 140%;
  padding: 16px;
  margin-bottom: 16px;
  ${media.phone`
    margin-top: ${Dimens.small_15}px;
  `};
`;

type PropTypes = {
  data: String,
};

export default ({ data }: PropTypes) => <GuideContent>{data}</GuideContent>;
