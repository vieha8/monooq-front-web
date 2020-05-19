import React from 'react';
import styled from 'styled-components';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { formatAddComma } from 'helpers/string';
import InlineText from 'components/LV1/Texts/InlineText';

const Wrap = styled.div`
  width: 100%;
  margin-top: ${Dimens.medium_20}px;
`;

const TitleSub = styled.div`
  margin: ${Dimens.small}px auto ${Dimens.xsmall}px;
  font-weight: bold;
  line-height: normal;
  ${media.phone`
    font-size: ${FontSizes.small}px;
  `};
`;

const WrapInner = styled.div`
  width: 100%;
  padding: ${Dimens.medium}px ${Dimens.small2}px;
  border: solid 1px ${Colors.borderGray};
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${Dimens.xsmall}px;
  ${props =>
    props.isEstimateTotal &&
    `
    justify-content: flex-end;
    margin-top: ${Dimens.medium}px;
  `};
`;

export default ({ price }) => (
  <Wrap>
    <TitleSub>お支払い金額</TitleSub>
    <WrapInner>
      <ItemRow>
        <InlineText.Base fontSize={14} color={Colors.lightGray10}>
          スペース基本料金
        </InlineText.Base>
        <InlineText.Base fontSize={14}>{`${formatAddComma(price)}円`}</InlineText.Base>
      </ItemRow>
      <ItemRow>
        <InlineText.Base fontSize={14} color={Colors.lightGray10}>
          ゲストの手数料
        </InlineText.Base>
        <InlineText.Base fontSize={14} color={Colors.lightGray10}>
          +10%
        </InlineText.Base>
      </ItemRow>
      <ItemRow isEstimateTotal>
        <InlineText.Base fontSize={14} lineheight="12px" color={Colors.lightGray10}>
          ゲスト支払料金
        </InlineText.Base>
        <InlineText.Base fontSize={18} lineheight="12px" bold>
          &nbsp;&nbsp;
          {`${formatAddComma(String(Math.floor(price * 1.1)))}円`}
        </InlineText.Base>
      </ItemRow>
    </WrapInner>
  </Wrap>
);
