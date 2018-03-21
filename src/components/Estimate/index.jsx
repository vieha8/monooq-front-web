import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import HintBox from 'components/Shared/HintBox';
import Button from 'components/Shared/Button';
import Template from './template';
import DatePicker from './DatePicker';
import PriceInput from './PriceInput';

const H1 = styled.h1`
  font-size: ${FontSizes.xlarge}px;
  color: ${Colors.black};
  ${media.tablet`
    font-size: ${FontSizes.large}px;
  `}
`;

const H2 = styled.h2`
  font-size: ${FontSizes.large}px;
  color: ${Colors.black};
  ${media.tablet`
    font-size: ${FontSizes.medium2}px;
  `}
`;

const Caption = styled.span`
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.lightGray1};
`;

export default () => (
  <Template
    title={<H1>見積もりを送る</H1>}
    datePickerTitle={<H2>スケジュールを入力</H2>}
    datePicker={<DatePicker />}
    priceTitle={<H2>料金を入力</H2>}
    priceCaption={<Caption>相手の相談に応じて料金を決めましょう。</Caption>}
    priceInput={<PriceInput />}
    button={(
      <Button
        bgColor={Colors.brandPrimary}
        fluid
      >
        この見積もりを送る
      </Button>
    )}
    hint={(
      <HintBox
        title="お見積もりのヒント"
        text="メッセージの相談内容を元に最終的な見積もりを相手に提示しましょう。"
        text2="思っていたより荷物が少なかったり、期間が短い場合はちょっぴり値下げすると喜ばれます。"
      />
    )}
  />
);
