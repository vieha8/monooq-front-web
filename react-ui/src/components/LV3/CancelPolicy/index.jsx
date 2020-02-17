import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import PageDefault from 'components/LV1/PageDefault';
import Text from 'components/LV1/Texts/TextStatic';
import MainTitleWrap from 'components/LV2/Texts/MainTitleStatic';
import AboutCancelList from 'components/LV2/Lists/AboutCancelList';
import ContentDescription from 'components/LV2/Texts/ContentDescription';

const Section = styled.div`
  ${props =>
    props.margin &&
    `
      margin: ${props.margin};
    `};
`;

const HilightText = styled(Text)`
  font-size: ${FontSizes.medium1}px;
  line-height: ${FontSizes.medium1 * 1.5}px;
  margin: ${Dimens.medium_20}px auto ${Dimens.small}px auto;
  ${media.phone`
    font-size: 5vw;
    line-height: 7.5vw;
  `};
`;

const ExampleWrap = styled.div`
  margin-top: ${Dimens.medium1}px;
  padding: ${Dimens.medium_20}px;
  border: 1px solid #d6d6d6;
  border-radius: 7px;
`;

const ExampleTextWrap = styled.ul`
  margin-top: ${Dimens.medium2}px;
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
      <MainTitle
        mainTitle="荷物を置く方のキャンセルについて"
        text="ホストはあなたのために荷物スペースや搬入の準備を整えてくれています。直前のキャンセルは迷惑となってしまいます。ホストと契約した日程の15日前からキャンセル手数料が発生します。"
        sub
      />
      <HilightText>利用開始日から</HilightText>
      <Section margin="0 auto 20px">
        <AboutCancelList
          cancelContentList={[
            {
              header: '15日前まで',
              data: '決済金額の0%（決済金額の100％を返金）',
            },
            {
              header: '15日前',
              data: '決済金額の25%（決済金額の75％を返金）',
            },
            {
              header: '7日前',
              data: '決済金額の50%（決済金額の50％を返金）',
            },
            {
              header: '利用開始日以降',
              data: '決済金額の100%（返金はありません）',
            },
          ]}
        />
      </Section>
      <Text>
        ※連絡がつかないなど、無断でのキャンセルも利用開始日以降の返金はありません。（*）
        <br />
        ※取引成立日が利用開始日まで15日未満の場合も、同様のキャンセル手数料が発生します。
        <br />
        ※同様のキャンセルを繰り返し行われる場合は、アカウント自体の停止等の措置を取らせていただくことがございます。
      </Text>
    </Section>
    <Section>
      <MainTitle
        mainTitle="無断でスペース利用を延長されている、お荷物を引き取られない場合"
        text="無断でのスペース利用延長は荷物を引き取る意思がないとみなし、利用規約に費用を請求いたします。"
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
        mainTitle="ホストのキャンセルについて"
        text="取引成立後にホスト都合のキャンセルがあると、ユーザーの予定が立たなくなり、あなたにもサービスの信頼にも影響が出ます。スペースのキャンセルを行う場合は下記のペナルティが発生します。"
        sub
      />
    </Section>
    <Section>
      <MainTitle
        mainTitle="ご自身でゲストにお荷物を返送する場合"
        text="予めゲストにキャンセルの旨をお伝えし、了承を得てから返送日を指定して対応してください。下記に関しては、ホスト自身が負担するものとなります。"
        sub
      />
      <ContentDescription
        title="＜負担事項＞"
        dontActionList={[
          {
            text: '見積もりに記載された期間との差分の金額を返金',
          },
          {
            text: 'ゲスト宛の荷物の返送料',
          },
          {
            text: '荷物の返送にかかる工数',
          },
        ]}
      />
    </Section>
    <Section margin="0 auto 80px">
      <MainTitle
        mainTitle="荷物の返送手配などを行えない場合"
        text="万が一、ゲスト宛の荷物の返送手配をご自身で行えない場合は、モノオクが代行いたします。その場合、ホストは下記事項を負担するものとなります。"
        sub
      />
      <ContentDescription
        title="＜負担事項＞"
        dontActionList={[
          {
            text: '見積もりに記載された期間との差分の金額を返金',
          },
          {
            text: 'ゲスト宛の荷物の返送料',
          },
          {
            text: '弊社の返送にかかる作業費用',
          },
          {
            text: '荷物の一時保管にかかる費用',
          },
          {
            text: 'ペナルティ金額 10万円',
          },
        ]}
      />
      <Text>
        <br />
        キャンセルを繰り返される場合は、下記の対応を取らせていただきます。
      </Text>
      <Section margin="10px auto 16px">
        <AboutCancelList
          cancelContentList={[
            {
              header: 'アカウント停止',
              data:
                '1年間の間に3回以上キャンセルすると、スペース掲載が無効・アカウント停止などの対応をします。',
            },
          ]}
        />
      </Section>
      <Text>
        避けられない事故や緊急な事情により、止むを得ずキャンセルしなければならない場合など、モノオクがホストのキャンセル理由が酌量すべき事情と判断した場合には、上記のペナルティは免除される可能性があります。キャンセルをしなくてはならない場合は、速やかにユーザーに事情を連絡してください。その上でモノオクカスタマーサポートまでスペースや荷物の状況をご連絡ください。
      </Text>
    </Section>
  </PageDefault>
);
