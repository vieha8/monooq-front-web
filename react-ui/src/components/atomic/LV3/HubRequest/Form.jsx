import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputCalendar from 'components/atomic/LV1/InputCalendar';
import InlineText from 'components/atomic/LV1/InlineText';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';
import InputSchedule from 'components/atomic/LV2/Estimate/InputSchedule';
import Button from 'components/atomic/LV1/Button';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Row = styled.div`
  max-width: ${Dimens.fixedWidthPc}px;
  &:not(:first-child) {
    margin: ${Dimens.large}px auto;
  }
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `};
`;

const Container = styled.div`
  width: 100%;
  display: table;
`;

const TitleForm = styled.div`
  width: 100%;
  padding: 25px 0;
  text-align: center;
  color: ${Colors.white};
  background-color: ${Colors.hub};
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

const Description = styled.div`
  height: 300px;
  overflow-y: scroll;
  border: 1px solid ${Colors.black};
  font-size: ${FontSizes.medium}px;
  line-height: 150%;
  padding: 10px;
`;

const CautionList = styled.ul`
  font-size: ${FontSizes.small}px;
  list-style-type: disc;
`;

const CautionListContent = styled.li`
  line-height: 1.5;
  padding: 0.5em 0;
`;

const SubmitButton = styled(Button)`
  margin: auto;
`;

const sizeList = [
  { key: 1, value: '約1畳', text: '約1畳(182cm x 91cm)' },
  { key: 2, value: '約2畳', text: '約2畳(364cm x 182cm)' },
  { key: 3, value: '約3畳', text: '約3畳(546cm x 273cm)' },
];

const timeList = [
  { key: 1, value: '9時〜12時', text: '9時〜12時' },
  { key: 2, value: '12時〜15時', text: '12時〜15時' },
  { key: 3, value: '15時〜18時', text: '15時〜18時' },
  { key: 4, value: '18時〜21時', text: '18時〜21時' },
];

export default props => (
  <Fragment>
    <TitleForm>
      <MainTitle>お申込みフォーム</MainTitle>
      <SubTitle>まずはお気軽にご相談ください</SubTitle>
    </TitleForm>
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
            <InlineText.Bold>希望集荷日</InlineText.Bold>
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
            <InlineText.Bold>時間帯</InlineText.Bold>
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
        placeholder="東京都杉並区高円寺南2-48-12 クリニカルコーポ1F"
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
    <Row>
      <InputForm
        label="メールアドレス"
        onChange={e => props.onChangeEmail(e.target.value)}
        value={props.email}
      />
    </Row>
    <Row>
      <InlineText.Bold>注意事項</InlineText.Bold>
      <Description>
        <CautionList>
          <CautionListContent>
            モノオクハブで一時預かり後、ユーザーにもっとも近い引き受け可能なホスト/スペースから選定を致します。
          </CautionListContent>
          <CautionListContent>
            送信いただいた後、料金(保管費用＋配送費用)をお見積りし、ご連絡致します。
          </CautionListContent>
          <CautionListContent>
            モノオクハブでお預かりしている期間は荷物の引き出しができません。また、配送後に追加で荷物を預けられる際は新規依頼としてお申し込みください。(ホストへ移動後はホストに直接可能かご相談ください。)
          </CautionListContent>
          <CautionListContent>
            モノオクハブへの送料(元払)とホストから返送頂く費用はユーザー負担(着払)、モノオクハブからホストへの配送はモノオク負担とします。
          </CautionListContent>
          <CautionListContent>
            集荷日決定後の1週間を切ったお預け依頼キャンセルは、依頼料金の総額50％+配送料金をキャンセル料としていただきます。
          </CautionListContent>
          <CautionListContent>
            3ヶ月(90日)以上ご利用の後、元々の依頼期間より早く引き出すことになった場合は、残り期間−1ヶ月(30日)分をご返金致します。
          </CautionListContent>
          <CautionListContent>
            やむを得ない事情により、3ヶ月(90日)未満での引き取りをご希望の場合、最低ご利用期間分として3ヶ月(90日)分料金をいただきます。
          </CautionListContent>
          <CautionListContent>
            引受先ホストが決まった後の延長申請や新規の追加依頼は直接ホストとモノオク上でやりとりを行っていただけます。モノオク上でのやりとりをされない場合は、もし破損・紛失があった際に保険適用がされないためご注意ください。
          </CautionListContent>
          <CautionListContent>
            荷物保管における責任の所在は、モノオクハブ保管期間はモノオク株式会社に、ホストのスペース保管期間はホストに帰属します。
          </CautionListContent>
          <CautionListContent>
            荷物サイズは厳守いただきますようお願い致します。申請サイズを超過する荷物が届いた場合は、モノオクで選定した超過分のお荷物を着払で返送させていただきます。
          </CautionListContent>
          <CautionListContent>
            やむを得ない事情により引き取りが遅れる場合や期間延長をご希望される場合はあらかじめホストへご相談ください。無断で引き取り遅滞が続く場合、悪質であると認められた際は処分・または罰金等のペナルティを課される場合がございます。
          </CautionListContent>
          <CautionListContent>
            保管期限終了後のお引き取り日程は余裕を持ってホストとご相談ください。急な引き取り打診は日程調整が困難になる恐れがございます。
          </CautionListContent>
          <CautionListContent>
            その他利用に関する規約は
            <a href="https://monooq.com/terms" rel="noopener noreferrer" target="_blank">
              こちら
            </a>
            をご覧ください。
          </CautionListContent>
        </CautionList>
      </Description>
    </Row>
    <SubmitButton
      hub
      disabled={props.buttonDisabled}
      onClick={props.buttonLoading ? null : props.onClickButton}
      loading={props.buttonLoading}
    >
      送信
    </SubmitButton>
  </Fragment>
);
