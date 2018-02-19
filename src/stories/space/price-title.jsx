import React from 'react';
import styled from 'styled-components';
import { isMobile } from '../../helpers/style/media-query';
import { FontSizes, Colors, Dimens } from '../../variables';

const Text = styled.span`
  display: inline-block;
  font-size: ${FontSizes.large}px;
  color: ${Colors.black};

  ${isMobile(`
    font-size: ${FontSizes.medium}px;
  `)}
`;

const SubText = styled.span`
  display: inline-block;
  font-size: ${FontSizes.small}px;
  color: ${Colors.black};
  margin-left: ${Dimens.small}px;
`;

export default () => (
  <div>
    <Text>料金の目安</Text>
    <SubText>30日間あたり</SubText>
  </div>
);
