// @flow

import React from 'react';
import styled from 'styled-components';
import GuideContent from 'components/LV1/GuideContent';

const GuideContainer = styled.div`
  width: 100%;
  margin-bottom: 100px;
`;

const GuideHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  padding-bottom: 16px;
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
    <GuideContent data={data1} />
    <GuideContent data={data2} />
    <GuideContent data={data3} />
  </GuideContainer>
);
