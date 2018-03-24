import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import HintBox from 'components/Shared/HintBox';
import Button from 'components/Shared/Button';
import Template from './Template';
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
  color: ${Colors.black};
  line-height: 1.5;
`;

export default props => (
  <Template
    title={<H1>見積もりを送る</H1>}
    datePickerTitle={<H2>スケジュールを入力</H2>}
    datePicker={(
      <DatePicker
        onDateChangeBegin={date => props.onDateChange('begin', date)}
        onDateChangeEnd={date => props.onDateChange('end', date)}
        beginDate={props.beginDate}
        endDate={props.endDate}
        beginDateFocused={props.beginDateFocused}
        endDateFocused={props.endDateFocused}
        onFocusChangeBegin={focus => props.onFocusChangeDatePicker('begin', focus)}
        onFocusChangeEnd={focus => props.onFocusChangeDatePicker('end', focus)}
      />
    )}
    priceTitle={<H2>料金を入力</H2>}
    priceCaption={<Caption>相手の相談に応じて料金を決めましょう。</Caption>}
    priceInput={(
      <PriceInput
        onChange={props.handleChangePrice}
        errors={props.priceErrors}
      />
    )}
    caption={(
      <Caption>
        取引成立時の売上は、ユーザーがホストへお支払いするスペース利用総額からサービス手数料20%を引いた金額となります。
      </Caption>
    )}
    button={(
      <Button
        disabled={props.buttonDisabled}
        onClick={props.onClickButton}
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
