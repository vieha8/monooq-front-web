import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import PriceHead from 'components/LV2/Space/PriceHead';
import { Colors, Dimens } from 'variables';

import InputPriceOfType from 'components/LV2/Forms/InputPriceOfType';
import imageFurnitureFull from 'images/furniture-full.svg';
import imageFurnitureTatami from 'images/furniture-tatami.svg';

const Wrap = styled.div`
  margin: ${Dimens.medium2}px auto 0;
  padding: ${Dimens.medium2}px 0 20px;
  border-top: 1px solid ${Colors.borderGray};
  ${media.phone`
    margin: ${Dimens.medium_20}px auto 0;
    padding: ${Dimens.medium_20}px 0 0px;
  `};
`;

export default ({ full, tatami }) => (
  <Wrap>
    <PriceHead />
    {full && (
      <InputPriceOfType
        image={imageFurnitureFull}
        title="全てのスペースの月額料金"
        caption="スペースを全範囲使用する場合の料金"
        price={full}
        detail
      />
    )}
    {tatami && (
      <InputPriceOfType
        image={imageFurnitureTatami}
        title="1畳分のスペースの月額料金"
        caption="スペースの一部を使用する場合の1畳あたりの料金"
        price={tatami}
        detail
      />
    )}
  </Wrap>
);
