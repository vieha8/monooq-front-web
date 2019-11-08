import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';

const TextCard = styled.div`
  background-color: ${Colors.lightGray4};
  border-radius: ${Dimens.xxsmall_4}px;
  padding: ${Dimens.medium}px;
  margin-bottom: ${Dimens.medium}px;
  font-size: ${FontSizes.small_15}px;
  line-height: 140%;
`;

export default ({ data }) => <TextCard>{data}</TextCard>;
