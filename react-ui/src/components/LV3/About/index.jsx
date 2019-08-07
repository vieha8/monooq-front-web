// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Hr from 'components/LV1/HorizontalRule';
import Button from 'components/LV1/Forms/Button';
import Text from 'components/LV1/Texts/StaticText';
import InlineText from 'components/LV1/Texts/InlineText';
import ContainerDefault from 'components/LV1/ContainerDefault';
import Footer from 'components/LV2/Footer';
import WhenIUseList from 'components/LV2/Lists/WhenIUseList';
import IfIFindList from 'components/LV2/Lists/IfIFindList';
import mainVisual from 'images/about_main_visual@2x.jpg';
import mainVisualSP from 'images/about_main_visual_sp@2x.jpg';
import useImage1 from 'images/about_use1@2x.jpg';
import useImage2 from 'images/about_use2@2x.jpg';
import useImage3 from 'images/about_use3@2x.jpg';
import useImage4 from 'images/about_use4@2x.jpg';
import useImage5 from 'images/about_use5@2x.jpg';
import useImage6 from 'images/about_use6@2x.jpg';
import iconBrandCredit from 'images/icon-brand-credit.png';
import iconCp from 'images/logo-cp.png';

const ImageBrandCredit = styled.img`
  max-width: 160px;
`;

const ImageCp = styled.img`
  max-width: 300px;
`;

const SubTitle = styled.div`
  font-size: ${FontSizes.large}px;
  line-height: ${FontSizes.large * 1.5}px;
  margin-bottom: 45px;
  ${media.phone`
    font-size: 6vw;
    line-height: 9vw;
    text-align: center;
    margin-bottom: 20px;
  `};
`;

const MainContainer = styled.div`
  min-width: ${Dimens.fixedWidthPc + 32}px;
  ${media.phone`
    min-width: auto;
  `};
`;

const TopContainer = styled.div`
  height: 500px;
  background-image: url(${mainVisual});
  background-size: cover;
  color: ${Colors.white};
  text-align: center;
  ${media.phone`
    height: 100%;
    background-position: 60% 0;
    background-image: url(${mainVisualSP});
  `};
`;

const TopTransparency = styled.div`
  height: 500px;
  padding: 100px 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${media.phone`
    padding: 40px 8vw 80px;
  `};
`;

const TopTitle = styled.div`
  font-size: ${FontSizes.xlarge}px;
  line-height: ${FontSizes.xlarge * 1.5}px;
  margin-bottom: 20px;
  ${media.phone`
    font-size: 8vw;
    line-height: 16vw;
  `};
`;

const TopText = styled.div`
  font-size: ${FontSizes.medium3}px;
  line-height: ${FontSizes.medium3 * 1.75}px;
  margin-bottom: 30px;
  width: 480px;
  ${media.phone`
    font-size: 5vw;
    line-height: 10vw;
    width: 84vw;
  `};
`;

const TopLabelWrapper = styled.div`
  width: 434px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${media.phone`
    width: 100%;
  `};
`;

const TopLabel = styled.div`
  height: 40px;
  width: 212px;
  border-radius: 2px;
  background-color: ${Colors.brandTerciary};
  font-size: ${FontSizes.medium}px;
  line-height: 40px;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  ${media.phone`
    width: 100%;
  `};
`;

const WhenIUseContainer = styled(ContainerDefault)`
  padding-top: 50px;
  ${media.phone`
    padding-top: 20px;
  `};
`;

const ContentContainer = styled(ContainerDefault)`
  ${props =>
    props.bottom &&
    `
    margin-bottom: 164px;
    `};
  ${media.phone`
    ${props =>
      props.bottom &&
      `
      margin-bottom: ${Dimens.large4_80}px;
      `};
  `};
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: 30px auto 30px 0px;
  ${media.phone`
    display: block;
    width: 100%;
    max-width: 100%;
    left: 0px;
    bottom: 0px;
    z-index: 1000;
    text-align: center;
    padding: 0 0 15px;
  `};
`;

export default () => (
  <Fragment>
    <MainContainer>
      <TopContainer>
        <TopTransparency>
          <TopTitle>はじめての方へ</TopTitle>
          <TopText>モノオクは空きスペースを活用する、物置きシェアサービスです。</TopText>
          <TopLabelWrapper>
            {['安心の料金', '面倒な手続きが不要', '拠点数が多い', '1ヶ月だけでもOK'].map((v, i) => (
              <TopLabel key={i.toString()}>{v}</TopLabel>
            ))}
          </TopLabelWrapper>
        </TopTransparency>
      </TopContainer>

      <WhenIUseContainer>
        <SubTitle>こんな時にモノオクを使おう！</SubTitle>
        <WhenIUseList
          list={[
            {
              image: useImage1,
              text: '引越しで一時的に荷物を置きたい。',
            },
            {
              image: useImage2,
              text: '自宅リフォーム中の家具を置く場所がない。',
            },
            {
              image: useImage3,
              text: '出張・転勤・留学で荷物の保管をしたい。',
            },
            {
              image: useImage4,
              text: '仕事場をもっと広く使いたい。',
            },
            {
              image: useImage5,
              text: '費用の高いトランクルームの代わりに。',
            },
            {
              image: useImage6,
              text: '生活空間を広げるため。',
            },
          ]}
        />
        <Hr />
      </WhenIUseContainer>

      <ContentContainer>
        <SubTitle>物置きスペースの探し方。</SubTitle>
        <Text>
          お住まいの地域・引っ越し予定エリアなどを入力するだけです。あなたにとって便利な物置きスペースを探しましょう！
        </Text>
        <Hr />
      </ContentContainer>

      <ContentContainer>
        <SubTitle>物置きスペースが見つかったら。</SubTitle>
        <IfIFindList
          list={[
            {
              label: '相談',
              text:
                'スペースが見つかったら、まずはホストに預けたい荷物の種類や量と希望期間をメッセージで相談しましょう。この時点でまだ支払いは発生しないので、気軽に連絡してみましょう。',
            },
            {
              label: '見積もり',
              text: 'あなたの荷物内容と利用期間に応じて、ホストから見積もりが送られてきます。',
            },
            {
              label: 'お支払い',
              text:
                '提示された見積もりに納得したらお支払いへ進みます。ホストが困らないように支払い前までに荷物の詳細はすべて伝えておきましょう。',
            },
            {
              label: '取引成立',
              text:
                'お支払いが完了したら取り引き成立です！直前に慌ただしくならないように荷物の準備はお早めに。',
            },
            {
              label: '利用開始',
              text:
                'ホストのスペースへ荷物を置かせてもらいます。事前に連絡がない荷物は受けてもらえないこともあるので約束通り誠実な対応を。',
            },
            {
              label: '利用終了',
              text:
                'スペース利用終了日はお忘れなく！無断での延長・あなたと連絡がとれない時は、規約に基づいた対応やペナルティ料金が発生する場合があります。',
            },
            // {
            //   label: 'レビュー',
            //   text: '親切に預かってくれたホストに感謝の気持ちをこめてレビューを送りましょう！',
            // },
          ]}
        />
        <Hr />
      </ContentContainer>

      <ContentContainer>
        <SubTitle>お支払い方法について</SubTitle>
        <Text>
          ■クレジットカード決済
          <br />
          ＜ご利用可能カード＞
          <br />
          VISA、Mastercardがご利用いただけます。
          <br />
          <ImageBrandCredit src={iconBrandCredit} alt="icon-brand-credit" />
          <br />
          <br />
          ■コンビニ払い・Pay-easy決済
          <br />
          ＜対応コンビニ＞
          <br />
          ローソン、ファミリーマート、ミニストップ、セイコーマートのコンビニ決済及びPay-easy決済がご利用いただけます。
          <br />
          <ImageCp src={iconCp} alt="icon-cp" />
          <br />
          <br />
          ■銀行振込
          <br />
          下記口座にお振込後、
          <a href="mailto:support@monooq.com?subject=銀行振込が完了しました&amp;body=こちらのメールに振込明細のお写真と、モノオクに登録しているメールアドレスをお送りください。">
            support@monooq.com
          </a>
          まで振込明細の写真とモノオクに登録しているメールアドレスをお送りください。
          <br />
          <br />
          みずほ銀行 渋谷中央支店
          <br />
          普通 1806441 モノオク(カ
        </Text>
        <Hr />
      </ContentContainer>

      <ContentContainer bottom>
        <SubTitle>お困りの際はモノオクカスタマーサポートまで。</SubTitle>
        <Text>
          <InlineText.Base>
            サービスの不明点・お困りのことがあれば、モノオクカスタマーサポートまでお寄せください。
            <br />
            お問い合わせはLINEにて対応しております。下記より友だち追加の上、ご連絡ください。
            <br />
          </InlineText.Base>
          <ButtonWrap>
            <Button line reactGACategory="About" reactGAAction="Push LINE Register Button">
              友だち追加
            </Button>
          </ButtonWrap>
        </Text>
      </ContentContainer>
    </MainContainer>

    <Footer />
  </Fragment>
);
