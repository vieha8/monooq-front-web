import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

import InputPriceOfType from 'components/LV2/Forms/InputPriceOfType';
import imageFurnitureFull from 'images/furniture-full.svg';
import imageFurnitureTatami from 'images/furniture-tatami.svg';

const Wrap = styled.div`
  display: flex;
  margin: auto;
  padding: ${Dimens.medium}px 0 0;
  ${media.tablet`
    display: block;
  `};
`;

export default ({ full, tatami }) => (
  <Wrap>
    {full && (
      <InputPriceOfType
        image={imageFurnitureFull}
        title="全てのスペースの月額料金"
        caption="スペースの全範囲を使用する場合の料金"
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
        marginLeft
      />
    )}
  </Wrap>
);
