import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputCalendar from 'components/atomic/LV1/InputCalendar';
import InlineText from 'components/atomic/LV1/InlineText';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';
import InputSchedule from 'components/atomic/LV2/Estimate/InputSchedule';
import Button from 'components/atomic/LV1/Button';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { H2 } from 'components/atomic/LV1/Headline';

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

const Description = styled.div`
  font-size: ${FontSizes.medium}px;
  line-height: 150%;
`;

const CautionList = styled.ul`
  font-size: ${FontSizes.small}px;
  list-style-type: disc;
`;

const CautionListContent = styled.li`
  line-height: 1.5;
  padding: 0.5em 0;
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
    <Description>
      <H2>モノオクハブとは?</H2>
      モノオクハブは、あなたの今すぐに預けたい！を解決します。<br />
      モノオクが一時的にお荷物を引き取り、あなたに最適なスペースを探して配送します！<br />
      1ヶ月あたり、¥7,000(1畳)からご利用いただけます。<br />
    </Description>
    <Row>
      <H2>利用可能条件</H2>
      <CautionList>
        <CautionListContent>
          現在預け入れ可能なスペースは、東京都世田谷区のみとなります。順次エリア拡大予定です。
        </CautionListContent>
        <CautionListContent>
          1畳以上のサイズから利用可能です。1畳未満の荷物を預ける場合でも最低1畳分の料金がかかります。<br />
        </CautionListContent>
        <CautionListContent>
          3ヶ月(90日)以上のご利用に限り、モノオクハブを利用することができます。<br />
        </CautionListContent>
        <CautionListContent>
          対応可能な荷物容量:
          幅1.2m、奥行1.8m、高さ1.2mの荷台に積載でき、合計で350kg未満の物量であれば対応が可能です。縦30cm、横45cm、高さ35cmの段ボールだと30箱程度積載できます。
        </CautionListContent>
      </CautionList>
    </Row>
    <Row>
      <H2>お申込みフォーム</H2>
    </Row>
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
    <Row>
      <Description>
        <H2>注意事項</H2>
        <CautionList>
          <CautionListContent>
            モノオクハブで一時預かり後、ユーザーにもっとも近い引き受け可能なホスト/スペースから選定をいたします。
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
            3ヶ月(90日)以上ご利用の後、元々の依頼期間より早く引き出すことになった場合は、残り期間−1ヶ月(30日)分をご返金いたします。
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
            荷物サイズは厳守いただきますようお願いいたします。申請サイズを超過する荷物が届いた場合は、モノオクで選定した超過分のお荷物を着払で返送させていただきます。
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
            </a>をご覧ください。
          </CautionListContent>
        </CautionList>
      </Description>
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
