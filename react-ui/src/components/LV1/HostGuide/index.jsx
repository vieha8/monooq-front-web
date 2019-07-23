// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const GuideContainer = styled.div`
  width: 100%;
  margin-bottom: 8px；;
`;

const GuideHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  padding: 16px;
`;

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
  header: String,
  data1: String,
  data2: String,
  data3: String,
};

export default ({ header, data1, data2, data3 }: PropTypes) => (
  <GuideContainer>
    <GuideHeader>{header}</GuideHeader>
    <GuideContent>{data1}</GuideContent>
    <GuideContent>{data2}</GuideContent>
    <GuideContent>{data3}</GuideContent>
  </GuideContainer>
);
