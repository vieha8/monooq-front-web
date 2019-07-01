// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import PriceHead from 'components/LV2/Space/PriceHead';
import { Colors, Dimens } from 'variables';

import InputPriceOfType from 'components/LV2/InputPriceOfType';
import imageFurnitureFull from 'images/furniture-full.svg';
import imageFurnitureHalf from 'images/furniture-half.svg';
import imageFurnitureQuarter from 'images/furniture-quarter.svg';

const Wrap = styled.div`
  margin: ${Dimens.medium2}px auto 0;
  padding: ${Dimens.medium2}px 0 20px;
  border-top: 1px solid ${Colors.borderGray};
  ${media.phone`
    margin: ${Dimens.medium_20}px auto 0;
    padding: ${Dimens.medium_20}px 0 0px;
  `};
`;

type PropTypes = {
  full?: string,
  half?: string,
  quarter?: string,
};

export default ({ full, half, quarter }: PropTypes) => (
  <Wrap>
    <PriceHead />
    {full && (
      <InputPriceOfType
        image={imageFurnitureFull}
        title="全てのスペースの月額料金"
        caption="このスペースすべてを使用する場合"
        price={full}
        detail
      />
    )}
    {half && (
      <InputPriceOfType
        image={imageFurnitureHalf}
        title="半分のスペースの月額料金"
        caption="このスペースの半分を使用する場合"
        price={half}
        detail
      />
    )}
    {quarter && (
      <InputPriceOfType
        image={imageFurnitureQuarter}
        title="1/4程度のスペースの月額料金"
        caption="このスペースの1/4程度を使用する場合"
        price={quarter}
        detail
      />
    )}
  </Wrap>
);
