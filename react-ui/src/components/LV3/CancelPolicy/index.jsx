import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import PageDefault from 'components/LV1/PageDefault';
import Text from 'components/LV1/Texts/TextStatic';
import MainTitleWrap from 'components/LV2/Texts/MainTitleStatic';
import AboutCancelList from 'components/LV2/Lists/AboutCancelList';
import ContentDescription from 'components/LV2/Texts/ContentDescription';

const HyperLink = styled.a``;

const Section = styled.div`
  ${props =>
    props.margin &&
    `
      margin: ${props.margin};
    `};
`;

const HilightText = styled(Text)`
  font-size: ${FontSizes.medium1_22}px;
  font-weight: bold;
  line-height: ${FontSizes.medium1 * 1.5}px;
  margin: ${Dimens.medium2}px auto ${Dimens.small}px auto;
  ${media.phone`
    font-size: 5vw;
    line-height: 7.5vw;
  `};
`;

const ExampleWrap = styled.div`
  margin-top: ${Dimens.medium_20}px;
  padding: ${Dimens.medium_20}px;
  border: 1px solid #d6d6d6;
  border-radius: 7px;
`;

const ExampleTextWrap = styled.ul`
  margin-top: ${Dimens.medium_20}px;
  display: table;
  width: 100%;
`;

const ExampleText = styled.li`
  display: table-cell;
  font-size: ${FontSizes.small}px;
  line-height: ${FontSizes.small * 2}px;
  width: 50%;
  ${media.tablet`
    &:not(:first-child) {
      margin-top: ${Dimens.medium}px;
    }
    display: block;
    width: 100%;
  `};
`;

const MainTitle = props => {
  return <MainTitleWrap {...props} fontSizeSp={24} />;
};

export default () => (
  <PageDefault>
    <MainTitle
      mainTitle="キャンセルポリシー"
      text="キャンセルポリシーとは、モノオクが定める取引成立後のキャンセルに発生する手数料や注意事項です。見積もりを送る前、お支払いの前に必ずご確認ください。"
      isHr
    />
    <Section>
      <MainTitle mainTitle="荷物を置く方(ゲスト)のキャンセルについて" sub />
      <Text>
        ホストはあなたのために荷物スペースや搬入の準備を整えてくれています。
        <br />
        直前のキャンセルは迷惑となってしまいます。
        <br />
        ホストと契約した日程の15日前からキャンセル手数料が発生します。
      </Text>
      <HilightText>利用開始日から</HilightText>
      <Section margin="0 auto 20px">
        <AboutCancelList
          cancelContentList={[
            {
              header: '15日前まで',
              data: '決済金額の100%を返金します',
            },
            {
              header: '15日前',
              data: '決済金額の75%を返金します',
            },
            {
              header: '7日前',
              data: '決済金額の50%を返金します',
            },
            {
              header: '利用開始日以降',
              data: <Fragment>原則返金はありません</Fragment>,
            },
          ]}
        />
      </Section>
      <Text>
        ※連絡がつかないなど、無断でのキャンセルも利用開始日以降の返金はありません。
        <br />
        ※取引成立日が利用開始日まで15日未満の場合も、同様のキャンセル手数料が発生します。
        <br />
        ※同様のキャンセルを繰り返し行われる場合は、アカウント自体の停止等の措置を取らせていただくことがございます。
      </Text>
      <ExampleWrap>
        <Text>支払い金額が20,000円の場合のキャンセル例</Text>
        <ExampleTextWrap>
          <ExampleText>
            開始15日前(00:00以降)のキャンセル
            <br />
            20,000×0.75＝15,000円を返金
          </ExampleText>
          <ExampleText>
            開始7日前(00:00以降)のキャンセル
            <br />
            20,000×0.5＝10,000円を返金
          </ExampleText>
        </ExampleTextWrap>
      </ExampleWrap>
    </Section>
    <Section>
      <MainTitle
        mainTitle="無断でスペース利用を延長されている、お荷物を引き取られない場合"
        text="無断でのスペースの延長利用は荷物を引き取る意思がないとみなし、利用規約に基づき下記費用を請求いたします。"
        sub
      />
      <ContentDescription
        title="＜負担事項＞"
        dontActionList={[
          {
            text: 'サービス違約金 50万円',
          },
          {
            text: '弊社の引取対応作業費用 要見積もり',
          },
          {
            text: '荷物の一時保管費用 要見積もり',
          },
        ]}
      />
    </Section>
    <Section>
      <MainTitle mainTitle="荷物を預かる方(ホスト)のキャンセルについて" sub />
      <Text>
        契約成立後にホスト都合による利用キャンセルが発生すると、ゲストの予定が立たなくなり、あなたにもサービスの信頼にも影響が出ます。
        <br />
        契約前に利用期間や荷物量を確認し、原則確実にお預かりいただける荷物を保管されてください。
        <br />
        急なお引っ越しや天災などで荷物の保管が難しくなった場合は、下記の手順で速やかにご連絡ください。
      </Text>
    </Section>
    <HilightText>すでにお荷物を預かっている場合</HilightText>
    <Section>
      <Text>
        ゲストにキャンセルの旨を伝え、モノオクサポートLINEまでに下記をご連絡ください。
        <br />
        モノオクサポートが近隣で新たなホストスペースを探し、ゲストにご紹介いたします。
      </Text>
      <ContentDescription
        title="＜モノオクサポートへの連絡事項＞"
        dontActionList={[
          {
            text: '移動させたい荷物の内容',
          },
          {
            text: '荷物の写真',
          },
          {
            text: '必要スペースの広さ',
          },
          {
            text: 'エリア',
          },
          {
            text: '搬出期限',
          },
        ]}
      />
      <ContentDescription
        title="＜負担事項＞"
        dontActionList={[
          {
            text:
              '決済済みの契約期間と搬出日までの差分の利用料を返金（モノオクサービス利用料を除く）',
          },
          {
            text: '新たなホストスペースへの荷物の配送費用',
          },
          {
            text: '30,000円以下の場合：モノオクが全額負担',
          },
          {
            text: '30,000円以上の場合：モノオクとホストで折半',
          },
        ]}
      />
      <Text>※モノオクサービス利用料はホスト・ゲスト両者の利用料が共に対象となります。</Text>
    </Section>
    <HilightText>決済が完了していてまだお荷物を預かっていない場合</HilightText>
    <Section margin="0 auto 80px">
      <Text>
        ゲストにキャンセルの旨を速やかに伝え、モノオクサポートLINEまでに下記をご連絡ください。
        <br />
        モノオクサポートが近隣で新たなホストスペースを探し、ゲストにご紹介いたします。
        <br />
        尚、決済された利用料は全額ゲストに返金いたします。
      </Text>
      <Text>
        <br />
        度重なるキャンセルが行われた場合は、下記の対応をいたします。
      </Text>
      <Section margin="10px auto 16px">
        <AboutCancelList
          cancelContentList={[
            {
              header: 'アカウント停止',
              data:
                '1年間に3回以上キャンセルすると、スペース掲載が無効・アカウント停止などの対応をします。',
            },
          ]}
        />
      </Section>
      <Text>
        避けられない事故や緊急な事情により、止むを得ずキャンセルしなければならない場合など、モノオクがホストのキャンセル理由が酌量すべき事情と判断した場合には、上記のペナルティは免除される可能性があります。キャンセルをしなくてはならない場合は、速やかにゲストに事情を連絡してください。その上でモノオクサポートまでスペースや荷物の状況をご連絡ください。
      </Text>
    </Section>
  </PageDefault>
);
