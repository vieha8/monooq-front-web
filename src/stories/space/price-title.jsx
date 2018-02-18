import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from '../../variables';

const Text = styled.span`
  display: inline-block;
  font-size: ${FontSizes.large}px;
  color: ${Colors.black};
`;

const SubText = styled.span`
  display: inline-block;
  font-size: ${FontSizes.small}px;
  color: ${Colors.black};
  margin-left: ${Dimens.medium}px;
`;

export default () => (
  <div>
    <Text>料金の目安</Text>
    <SubText>30日間あたり</SubText>
  </div>
);
