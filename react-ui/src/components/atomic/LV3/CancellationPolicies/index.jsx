import React, { Fragment } from 'react';

import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import DefaultContainer from 'components/atomic/LV1/DefaultContainer';
import Footer from 'components/atomic/LV2/Footer';
import MainTitleContainer from 'components/atomic/LV2/StaticMainTitle';
import AboutCancellContent from 'components/atomic/LV2/AboutCancellContent';
import Hr from 'components/atomic/LV1/HorizontalRule';
import Text from 'components/atomic/LV1/StaticText';

const HilightText = styled(Text)`
  font-size: ${FontSizes.medium1}px;
  line-height: ${FontSizes.medium1 * 1.5}px;
  margin: ${Dimens.medium_20}px auto ${Dimens.small}px auto;
  ${media.phone`
    font-size: 5vw;
    line-height: 7.5vw;
  `};
`;

const AboutCancellContainer = styled(DefaultContainer)`
  ${props =>
    props.hostcancel &&
    `
      margin-bottom: ${Dimens.large4_80}px;
    `};
`;

const AboutCancellContentWrapper = styled.div`
  margin-bottom: ${Dimens.medium2}px;
  ${props =>
    props.hostcancel &&
    `
      margin: ${Dimens.medium2}px auto;
    `};
`;

const NoticeWrapper = styled.div`
  margin-bottom: ${Dimens.medium2}px;
`;

const AboutCancellExampleWrapper = styled.div`
  padding: ${Dimens.medium_20}px;
  border: 1px solid #d6d6d6;
  border-radius: 7px;
`;

const ExampleTextContainer = styled.div`
  margin-top: ${Dimens.medium2}px;
  display: table;
  width: 100%;
`;

const ExampleText = styled.div`
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

export default () => (
  <Fragment>
    <MainTitleContainer
      mainTitle="キャンセルポリシー"
      text="キャンセルポリシーとは、モノオクが定める取引成立後のキャンセルに発生する手数料やご注意事項です。見積もりを送る前・お支払いの前に必ずご確認ください。"
      isHr
    />

    <AboutCancellContainer>
      <MainTitleContainer
        mainTitle="荷物を置く方のキャンセルについて"
        text="ホストはあなたのために荷物スペースや搬入の準備を整えてくれています。直前のキャンセルは迷惑となってしまいます。ホストと契約した日程の15日前からキャンセル手数料が発生します。"
        sub
      />
      <HilightText>利用開始日から</HilightText>
      <AboutCancellContentWrapper>
        <AboutCancellContent
          cancelContentList={[
            {
              header: '15日前まで',
              data: '決済金額の0％（決済金額の100％を返金）',
            },
            {
              header: '15日前',
              data: '決済金額の25％（決済金額の75％を返金）',
            },
            {
              header: '7日前',
              data: '決済金額の50％（決済金額の50％を返金）',
            },
            {
              header: '利用開始日以降',
              data: '決済金額の100％（返金はありません）',
            },
          ]}
        />
      </AboutCancellContentWrapper>
      <NoticeWrapper>
        <Text>
          ※連絡がつかないなど、無断でのキャンセルも利用開始日以降の返金はありません。*1
          <br />
          ※取引成立日が利用開始日まで15日未満の場合も、同様のキャンセル手数料が発生します。
          <br />
          <br />
          *1
          無断でのスペース利用延長は荷物を引き取る意思がないとみなし、利用規約に基づき荷物の引き取り費用10万円（税別）と処分に要した費用全額を請求いたします。
        </Text>
      </NoticeWrapper>
      <AboutCancellExampleWrapper>
        <Text>支払い金額が20,000円の場合のキャンセル例</Text>
        <ExampleTextContainer>
          <ExampleText>
            開始日の15日前(00:00以降)のキャンセル
            <br />
            20000×0.75=15000円を返金
          </ExampleText>
          <ExampleText>
            開始日の7日前(00:00以降)のキャンセル
            <br />
            20000×0.5=10000円を返金
          </ExampleText>
        </ExampleTextContainer>
      </AboutCancellExampleWrapper>
      <Hr />
    </AboutCancellContainer>

    <AboutCancellContainer hostcancel>
      <MainTitleContainer
        mainTitle="ホストのキャンセルについて"
        text="取引成立後にホスト都合のキャンセルがあると、ユーザーの予定が立たたなくなり、あなたにもサービスの信頼にも影響が出ます。スペースのキャンセルを行う場合は下記のペナルティが発生します。"
        sub
      />
      <AboutCancellContentWrapper hostcancel>
        <AboutCancellContent
          cancelContentList={[
            {
              header: 'アカウント停止',
              data:
                '1年間の間に3回以上キャンセルすると、スペース掲載が無効・アカウント停止などの対応をします。',
            },
          ]}
        />
      </AboutCancellContentWrapper>
      <NoticeWrapper>
        <Text>
          避けられない事故や緊急な事情により、やむを得ずキャンセルしなければならない場合など、モノオクがホストのキャンセル理由が酌量すべき事情と判断した場合には、上記のペナルティは免除される可能性があります。キャンセルをしなくてはならない場合は、すみやかにユーザーに事情を連絡してください。その上でモノオクカスタマーサポートまでスペースや荷物の状況をご連絡ください。
        </Text>
      </NoticeWrapper>
    </AboutCancellContainer>

    <Footer />
  </Fragment>
);
