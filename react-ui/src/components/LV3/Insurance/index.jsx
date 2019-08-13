import React, { Fragment } from 'react';
import { HashLink } from 'react-router-hash-link';
import Path from 'config/path';

import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import ContainerDefault from 'components/LV1/ContainerDefault';
import Footer from 'components/LV2/Footer';
import MainTitleContainer from 'components/LV2/Texts/MainTitleStatic';
import Hr from 'components/LV1/HorizontalRule';
import WhySafeList from 'components/LV2/Lists/WhySafeList';
import HowSafeList from 'components/LV2/Lists/HowSafeList';
import QuestionList from 'components/LV2/Lists/QuestionList';

import insuranceImage1 from 'images/insurance-img01.svg';
import insuranceImage2 from 'images/insurance-img02.svg';
import insuranceImage3 from 'images/insurance-img03.svg';

const ContentContainer = styled(ContainerDefault)`
  ${props =>
    props.bottom &&
    `
      margin-bottom: 110px;
    `};
`;

const SubTitle = styled.div`
  font-size: ${FontSizes.large}px;
  line-height: ${FontSizes.large}px;
  margin-bottom: ${Dimens.medium3_45}px;
  ${media.phone`
    font-size: 6.5vw;
    line-height: ${6.5 * 1.5}vw;
    margin-bottom: ${Dimens.medium_20}px;
  `};
`;

const WhenAttentionHilightText = styled.div`
  font-size: ${FontSizes.medium2}px;
  line-height: ${FontSizes.medium2 * 1.5}px;
  margin-bottom: ${Dimens.medium_20}px;
  ${media.phone`
    font-size: 5vw;
    line-height: ${5 * 1.5}vw;
  `};
`;

export default () => (
  <Fragment>
    <MainTitleContainer mainTitle="荷物に対する保険" />

    <ContentContainer>
      <SubTitle>もしもの時も大丈夫。三井住友海上と協力し、安心サポート。</SubTitle>
      <WhySafeList
        list={[
          {
            label: '最大10万円の保証',
            text:
              'モノオクでは、あなたの荷物やホストをお守りするために保証制度をご用意しています。もしも、破損・紛失・盗難などが起きてしまった場合には、最大10万円（免責金額3,000円）までの補償を提供しています。',
          },
          {
            label: 'すべての取引に対応',
            text:
              'モノオクのサービス内で成立したスペースを利用する、すべての取引に自動的に適用されます。保険料のお支払いは必要ありません。',
          },
          {
            label: 'ホストも安心',
            text:
              'スペースに置いてある荷物に予期せぬ事故や災害があった場合、ホストが荷物の保険を申請することができます。',
          },
        ]}
      />
      <Hr />
    </ContentContainer>

    <ContentContainer>
      <SubTitle>安心して取引をするために。</SubTitle>
      <HowSafeList
        list={[
          {
            image: insuranceImage1,
            label: 'ユーザーは何をすれば良い？',
            text:
              'しっかりと荷物の内容と写真をメッセージに残しましょう。何かが起こった場合にスムーズな対応を行うためです。もし事前に連絡をしていない荷物はホストに受け入れを断られてしまったり、保証の対象となりません。',
          },
          {
            image: insuranceImage2,
            label: 'ホストは何をすれば良い？',
            text:
              '荷物の受け取りが完了したら、すべての荷物とスペース状況を写真に残しましょう。そして相手にメッセージで送信してください。もしも何かが起こった際に、発生した時期や内容を特定する参考として必要です。',
          },
          {
            image: insuranceImage3,
            label: '気持ちの良い取引をするには？',
            text:
              'ユーザーもホストも荷物の内容やスペースに関して、事前にしっかりと確認しましょう。当日になって「思っていたのと内容が違う」なんてことはトラブルの原因です。お互いが気持ち良くサービスを使えるようなコミュニケーションを。',
          },
        ]}
      />
    </ContentContainer>

    <ContentContainer>
      <SubTitle>こんな場合もご注意を。</SubTitle>
      <WhenAttentionHilightText>
        以下のサービス利用上の注意が守られていない場合は、一切の保証を行うことができません。
      </WhenAttentionHilightText>
      <QuestionList
        list={[
          {
            text: 'モノオクサービス内で決済を行われていない場合。',
          },
          {
            text: 'メッセージ上で記録に残っていない、ホストが把握していない荷物の場合。',
          },
          {
            text: 'モノオクに登録していないスペースに置いた荷物の場合。',
          },
          {
            text: 'スペース登録をした本人が管理していない場合。',
          },
        ]}
      />
      <Hr />
    </ContentContainer>

    <ContentContainer bottom>
      <SubTitle>よくある質問</SubTitle>
      <QuestionList
        title="保証の適用範囲は？"
        text="受託者賠償責任保険が適応され、モノオクで取引・決済を行ったスペースへ置いた荷物に対して最大10万円（免責金額3,000円）までの補償を提供しています。"
      />
      <QuestionList
        title="保証対象外の荷物は？"
        list={[
          {
            text: 'サービス内で確認が不可能な荷物の場合。',
          },
          {
            textCustom: (
              <Fragment>
                モノオクで定める
                <HashLink to={`${Path.rule()}#not-allowed`}>「取引ができない荷物」</HashLink>
                に記載された違反の荷物の場合。
              </Fragment>
            ),
          },
        ]}
        text="これらに対しては保証対象外となります。"
      />
      <QuestionList
        title="緊急なトラブルの時は？"
        text="もしも緊急のトラブルが発生した場合は、警察・消防など所轄窓口に通報してください。その上でモノオクカスタマーサポートまでご連絡ください。"
      />
    </ContentContainer>

    <Footer />
  </Fragment>
);
