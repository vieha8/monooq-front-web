// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';

const TextGuide = styled.div`
  background-color: #f2f2f2;
  border-radius: ${Dimens.xxsmall_4}px;
  padding: ${Dimens.medium}px;
  margin-bottom: ${Dimens.medium}px;
  font-size: ${FontSizes.small_15}px;
  line-height: 140%;
`;

type PropTypes = {
  data: String,
};

export default ({ data }: PropTypes) => <TextGuide>{data}</TextGuide>;
