import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';

const SIZE = 140;
const Container = styled.div`
  position: fixed;
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  right: ${Dimens.huge}px;
  bottom: ${Dimens.huge}px;
  padding: 48px 0;
  text-align: center;
  background-color: ${Colors.brandPrimary};
  z-index: ${ZIndexes.float};
  cursor: pointer;
  ${media.phone`
    display: none;
  `}
`;

const Text1 = styled.div`
  color: ${Colors.white};
  font-size: ${FontSizes.medium}px;
`;

const Text2 = Text1.extend`
  font-size: ${FontSizes.medium2}px;
`;

export default () => (
  <Container>
    <Text1>スペースを</Text1>
    <Text2>登録する</Text2>
  </Container>
);
