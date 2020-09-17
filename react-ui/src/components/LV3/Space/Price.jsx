import React, { Fragment } from 'react';
import numeral from 'numeral';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import InputPriceOfType from 'components/LV2/Forms/InputPriceOfType';
import { SectionTitle } from 'components/LV2/Space/Section';

const imageFurnitureFull =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-furniture-full.svg?auto=compress';
const imageFurnitureTatami =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-furniture-tatami.svg?auto=compress';

const Wrap = styled.div`
  display: flex;
  margin: auto;
  padding: ${Dimens.medium}px 0 0;
  ${media.tablet`
    display: block;
  `};
`;

export default ({ full, tatami }) => (
  <Fragment>
    <SectionTitle text="料金の目安" />
    <Wrap>
      {full > 0 && (
        <InputPriceOfType
          image={imageFurnitureFull}
          title="全てのスペースの月額料金"
          caption="スペースの全範囲を使用する場合の料金"
          price={numeral(full).format('0,0')}
          detail
        />
      )}
      {tatami && tatami > 0 && full > tatami ? (
        <InputPriceOfType
          image={imageFurnitureTatami}
          title="1畳分のスペースの月額料金"
          caption="スペースの一部を使用する場合の1畳あたりの料金"
          price={numeral(tatami).format('0,0')}
          detail
          marginLeft
        />
      ) : null}
    </Wrap>
  </Fragment>
);
