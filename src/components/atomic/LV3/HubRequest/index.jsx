import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputCalendar from 'components/atomic/LV1/InputCalendar';
import InlineText from 'components/atomic/LV1/InlineText';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';
import InputSchedule from 'components/atomic/LV2/Estimate/InputSchedule';
import Button from 'components/atomic/LV1/Button';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Row = styled.div`
  &:not(:first-child) {
    margin: ${Dimens.large}px 0;
  }
`;

const Container = styled.div`
  width: 100%;
  display: table;
`;

const DateCell = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 280px;
  ${media.tablet`
    display: block;
    width: 100%;
    &:not(:first-child) {
      margin-top: ${Dimens.medium}px;
    }
  `};
`;

const DateLabel = styled.span`
  display: block;
  margin-bottom: ${Dimens.small2}px;
`;

const DateSpacer = styled.i`
  display: inline-block;
  vertical-align: middle;
  width: 10px;
  ${media.tablet`
    display: none;
  `};
`;

const sizeList = [
  { key: 1, value: 1, text: '約1畳(182cm x 91cm)' },
  { key: 2, value: 2, text: '約2畳(364cm x 182cm)' },
  { key: 3, value: 3, text: '約3畳(546cm x 273cm)' },
];

const timeList = [
  { key: 1, value: 1, text: '9時〜12時' },
  { key: 2, value: 2, text: '12時〜15時' },
  { key: 3, value: 3, text: '15時〜18時' },
  { key: 4, value: 4, text: '18時〜21時' },
];

export default props => (
  <Fragment>
    <Row>モノオクハブとは何か的な説明をいれる</Row>
    <Row>
      <InputSchedule {...props.schedule} />
    </Row>
    <Row>
      <SelectForm
        label="荷物の大きさ"
        options={sizeList}
        onChange={e => props.onChangeBaggageSize(e.target.value)}
        value={props.baggageSize}
      />
    </Row>
    <Row>
      <InputForm
        label="荷物の種類"
        onChange={e => props.onChangeBaggageInfo(e.target.value)}
        value={props.baggageInfo}
        placeholder="衣類、家電製品など、預けたいお荷物の詳細"
      />
    </Row>
    <Row>
      <Container>
        <DateCell>
          <DateLabel>
            <InlineText.Base>希望集荷日</InlineText.Base>
          </DateLabel>
          <InputCalendar
            date={props.cargoDate}
            block
            focused={Boolean(props.cargoDateFocused)}
            onDateChange={date => props.onDateChangeCargo(date)}
            onFocusChange={e => props.onFocusChangeCargo(e.focused)}
          />
        </DateCell>
        <DateSpacer />
        <DateCell>
          <DateLabel>
            <InlineText.Base>時間帯</InlineText.Base>
          </DateLabel>
          <SelectForm
            options={timeList}
            onChange={e => props.onChangeCargoTime(e.target.value)}
            value={props.cargoTime}
          />
        </DateCell>
      </Container>
    </Row>
    <Row>
      <InputForm
        label="集荷先住所"
        onChange={e => props.onChangeAddress(e.target.value)}
        placeholder="東京都世田谷区南烏山1-15-15 ロイヤルフラッツ芦花101"
        value={props.address}
      />
    </Row>
    <Row>
      <InputForm
        label="電話番号"
        onChange={e => props.onChangeTel(e.target.value)}
        value={props.tel}
      />
    </Row>
    <Row>注意事項をいれる</Row>
    <Row>目安料金の見積もりを表示する</Row>
    <Button
      primary
      fill={1}
      disabled={props.buttonDisabled}
      onClick={props.buttonLoading ? null : props.onClickButton}
      loading={props.buttonLoading}
    >
      送信
    </Button>
  </Fragment>
);
