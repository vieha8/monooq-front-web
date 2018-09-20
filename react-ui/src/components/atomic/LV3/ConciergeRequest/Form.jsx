import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Button from 'components/atomic/LV1/Button';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';
import InputSchedule from 'components/atomic/LV2/Estimate/InputSchedule';

const Row = styled.div`
  max-width: ${Dimens.fixedWidthPc}px;
  &:not(:first-child) {
    margin: ${Dimens.large}px auto;
  }
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `};
`;

const TitleForm = styled.div`
  width: 100%;
  padding: 25px 0;
  text-align: center;
  color: ${Colors.white};
  background-color: ${Colors.brandPrimary};
  ${media.phone`
    padding: 15px 0;
    margin: 5px auto;
  `};
`;

const MainTitle = styled.p`
  width: 100%;
  margin: 10px auto;
  text-align: center;
  color: ${Colors.white};
  font-size: ${FontSizes.medium3}px;
  font-weight: 900;
  ${media.phone`
    font-size: ${FontSizes.medium1}px;
  `};
`;

const SubTitle = styled.p`
  width: 100%;
  text-align: center;
  color: ${Colors.white};
  font-size: ${FontSizes.medium2}px;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
  `};
`;

const SubmitButton = styled(Button)`
  margin: auto;
`;

const sizeList = [
  { key: 1, value: '約1畳', text: '約1畳(182cm x 91cm)' },
  { key: 2, value: '約2畳', text: '約2畳(364cm x 182cm)' },
  { key: 3, value: '約3畳', text: '約3畳(546cm x 273cm)' },
];

export default props => (
  <Fragment>
    <TitleForm>
      <MainTitle>お申込みフォーム</MainTitle>
      <SubTitle>まずはお気軽にご相談ください</SubTitle>
    </TitleForm>
    <Row>
      <InputForm
        label="預けたい地域"
        onChange={e => props.onChangeAddress(e.target.value)}
        placeholder="例)東京都世田谷区"
        value={props.address}
      />
    </Row>
    <Row>
      <InputSchedule {...props.schedule} beginTitle="希望利用開始日" endTitle="希望利用終了日" />
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
        label="荷物の内容"
        onChange={e => props.onChangeBaggageInfo(e.target.value)}
        value={props.baggageInfo}
        placeholder="衣類、家電製品など、預けたいお荷物の詳細"
        multiline={true}
      />
    </Row>
    <Row>
      <InputForm
        label="ご予算の目安"
        onChange={e => props.onChangeBudget(e.target.value)}
        value={props.budget}
        placeholder="10000"
        unit="円/月"
      />
    </Row>
    <Row>
      <InputForm
        label="補足事項"
        onChange={e => props.onChangeNotes(e.target.value)}
        value={props.notes}
        placeholder="その他お伝えしたい要望や、不安な点があればご記載ください"
        multiline={true}
      />
    </Row>
    <Row>
      <InputForm
        label="メールアドレス"
        onChange={e => props.onChangeEmail(e.target.value)}
        value={props.email}
        placeholder="example@monooq.com"
      />
    </Row>
    <SubmitButton
      primary
      disabled={props.buttonDisabled}
      onClick={props.buttonLoading ? null : props.onClickButton}
      loading={props.buttonLoading}
    >
      送信
    </SubmitButton>
  </Fragment>
);
