import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import { formatAddComma } from 'helpers/string';
import Hr from 'components/LV1/HorizontalRule';
import InlineText from 'components/LV1/Texts/InlineText';
import ErrorList from 'components/LV2/Lists/ErrorList';

const Wrap = styled.div`
  width: 100%;
`;

const Lavel = styled.div`
  font-size: ${FontSizes.small_12}px;
  font-weight: bold;
  color: ${Colors.lightGray10};
`;

const WrapInner = styled.div`
  width: 100%;
  margin-top: ${Dimens.small}px;
  padding: ${Dimens.medium_20}px ${Dimens.small2}px;
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

const DateLabel = styled.div`
  display: block;
  margin-bottom: ${Dimens.small2}px;
  margin: ${Dimens.xxsmall_5}px auto ${Dimens.xsmall_7}px;
`;

const getItemRow = (caption, val, isTakeLate, isEstimateTotal) => {
  return (
    <ItemRow isEstimateTotal={isEstimateTotal}>
      {isEstimateTotal ? (
        <Fragment>
          <InlineText.Base fontSize={14} lineheight="12px" color={Colors.lightGray10}>
            {caption}
          </InlineText.Base>
          <InlineText.Base fontSize={18} lineheight="12px" bold>
            &nbsp;&nbsp;
            {`${formatAddComma(val)}円`}
          </InlineText.Base>
        </Fragment>
      ) : (
        <Fragment>
          <InlineText.Base fontSize={14} color={Colors.lightGray10}>
            {caption}
          </InlineText.Base>
          <InlineText.Base fontSize={14} color={isTakeLate ? Colors.lightGray10 : null}>
            {isTakeLate ? val : `${formatAddComma(val)}円`}
          </InlineText.Base>
        </Fragment>
      )}
    </ItemRow>
  );
};

export default ({ price, isTakelateBefore, errors }) => (
  <Wrap>
    <Lavel>
      <InlineText.Bold>内訳</InlineText.Bold>
    </Lavel>
    <WrapInner>
      <DateLabel>
        {getItemRow('スペース基本料金', price, false, false)}
        {getItemRow('販売手数料', isTakelateBefore ? '-20%' : '-30%', true, false)}
        {getItemRow(
          'あなたの利益',
          Math.floor(price * (isTakelateBefore ? 0.8 : 0.7)),
          false,
          false,
        )}
        <Hr margin="12px 0" />
        {getItemRow('スペース基本料金', price, false, false)}
        {getItemRow('ゲストの手数料', isTakelateBefore ? '0%' : '+10%', true, false)}
        {getItemRow(
          'ゲスト支払料金',
          String(Math.floor(price * (isTakelateBefore ? 1 : 1.1))),
          false,
          true,
        )}
      </DateLabel>
    </WrapInner>
    <ErrorList keyName="tatami_errors" errors={errors} />
  </Wrap>
);
