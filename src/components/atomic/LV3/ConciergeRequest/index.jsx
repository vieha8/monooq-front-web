import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';
import InputSchedule from 'components/atomic/LV2/Estimate/InputSchedule';
import Button from 'components/atomic/LV1/Button';
import { Dimens, FontSizes } from 'variables';
import { H2 } from 'components/atomic/LV1/Headline';

const Row = styled.div`
  &:not(:first-child) {
    margin: ${Dimens.large}px 0;
  }
`;

const Description = styled.div`
  font-size: ${FontSizes.medium}px;
  line-height: 150%;
`;

const sizeList = [
  { key: 1, value: '約1畳', text: '約1畳(182cm x 91cm)' },
  { key: 2, value: '約2畳', text: '約2畳(364cm x 182cm)' },
  { key: 3, value: '約3畳', text: '約3畳(546cm x 273cm)' },
];

export default props => (
  <Fragment>
    <Description>
      <H2>モノオクコンシェルジュとは?</H2>
      モノオクコンシェルジュは、あなたのお荷物の保管スペース探しをお手伝いするサービスです!<br />
      スペース検索で理想のスペースが見つからない、そもそも探し方がよくわからない、、そんな方にオススメです。<br />
      いただいた条件から合致するスペースを探し、ご提案させていただきます。<br />
      下記のフォームより、お気軽にお問い合わせください。<br />
    </Description>
    <Row>
      <H2>ご相談フォーム</H2>
    </Row>
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
        unit="円"
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
