import React, { Fragment } from 'react';
import { HashLink } from 'react-router-hash-link';
import Path from 'config/path';

import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import ContainerDefault from 'components/LV1/ContainerDefault';
import TextLink from 'components/LV1/Texts/TextLink';
import MainTitleContainer from 'components/LV2/Texts/MainTitleStatic';
import Hr from 'components/LV1/HorizontalRule';
import WhySafeList from 'components/LV2/Lists/WhySafeList';
import HowSafeList from 'components/LV2/Lists/HowSafeList';
import QuestionList from 'components/LV2/Lists/QuestionList';

import insuranceImage1 from 'images/insurance-img01.svg';
import insuranceImage2 from 'images/insurance-img02.svg';
import insuranceImage3 from 'images/insurance-img03.svg';

const ContentContainer = styled.div`
  ${props =>
    props.bottom &&
    `
      margin-bottom: 110px;
    `};
`;

const SubTitle = styled.div`
  font-size: ${FontSizes.medium2}px;
  line-height: normal;
  font-weight: bold;
  margin: ${Dimens.medium3}px auto;
  ${props =>
    props.sub &&
    `
      margin: ${Dimens.medium3}px auto ${Dimens.medium}px;
    `};
  ${media.phone`
    font-size: ${FontSizes.medium1}px;
    margin: ${Dimens.medium_22}px auto ${Dimens.medium1}px;
    ${props =>
      props.sub &&
      `
        margin: ${Dimens.medium3}px auto ${Dimens.small_10}px;
      `};
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
  <ContainerDefault>
    <MainTitleContainer mainTitle="荷物に対する補償サービス" />
    <ContentContainer>
      <SubTitle>
        もしもの時も大丈夫。
        <br />
        三井住友海上と協力したあんしん荷物補償サービス
      </SubTitle>
      <WhySafeList
        list={[
          {
            label: '最大10万円の補償',
            text:
              'モノオクでは、ゲストとホストの双方が安心してご契約いただけるよう補償サービスを用意しています。万が一、契約中に荷物の破損・紛失・盗難などのトラブルが起きてしまった場合には、最大10万円（免責金額3,000円）までの補償を提供しています。',
          },
          {
            label: 'すべての取引に対応',
            text:
              '補償サービスは、モノオクサービス内で成立したすべての取引に自動的に適用されます。加入手続きや保険料のお支払いは必要ございません。',
          },
          {
            label: 'ホストも安心',
            text:
              'ゲストの荷物を保管しているスペースに予期せぬ事故や災害があった場合は、ホストから荷物の補償を申請することができます。',
          },
        ]}
      />
      <Hr />
    </ContentContainer>
    <ContentContainer>
      <SubTitle>安心して取引をするために</SubTitle>
      <HowSafeList
        list={[
          {
            image: insuranceImage1,
            label: 'ゲストが気をつけること',
            text:
              'ホストに利用リクエストをする際は、荷物の内容と量を必ずメッセージに明記しましょう。荷物の写真を撮影してメッセージに添付するとなお良いです。事前に連絡をしていない荷物は預けることができず、補償の対象外となります。',
          },
          {
            image: insuranceImage2,
            label: 'ホストが気をつけること',
            text:
              'ゲストの荷物を受け取ったら荷物を置いたスペースの状態を撮影し、メッセージで写真をゲストに送信しましょう。もしもトラブルが起こった際に、荷物の状態や保管状況を確認する上で必要となります。',
          },
          {
            image: insuranceImage3,
            label: '気持ち良く取引をするには？',
            text:
              'ゲスト/ホストも、荷物の内容や量、状態をこまめに確認・共有し、トラブルが起こらないよう注意しましょう。お互いが気持ち良く利用できるような丁寧なコミュニケーションを。',
          },
        ]}
      />
    </ContentContainer>
    <ContentContainer>
      <SubTitle sub>こんな場合もご注意を</SubTitle>
      <WhenAttentionHilightText>
        以下のサービス利用上の注意が守られていない場合は、一切の補償をいたしかねます。
      </WhenAttentionHilightText>
      <QuestionList
        list={[
          {
            text: 'モノオクサービス上で決済が行われていない場合。',
          },
          {
            text: 'モノオクのメッセージ上で記録に残っていない荷物の場合。',
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
          {
            text: 'モノオクに登録していないスペースに置いた荷物の場合。',
          },
          {
            text: 'スペース登録をした本人が管理していないスペースに荷物を置いた場合。',
          },
        ]}
      />
      <Hr />
    </ContentContainer>
    <ContentContainer bottom>
      <SubTitle>よくある質問</SubTitle>
      <QuestionList
        title="補償サービスの適用範囲は？"
        text="受託者賠償責任保険が適応され、モノオクで取引・決済を行ったスペースへ置いた荷物に対して最大10万円（免責金額3,000円）までの補償を提供しています。"
      />
      <QuestionList
        title="補償サービスを申請するには？"
        list={[
          {
            textCustom: (
              <Fragment>
                下記の必要事項を明記の上、モノオクサポートまでメールまたはLINEで速やかにご連絡ください。
                <br />
                取引完了後、30日以内が申請期限です。
              </Fragment>
            ),
            isNoDisc: true,
          },
          {
            text: 'モノオクに登録のメールアドレス',
          },
          {
            text: 'トラブルの内容',
          },
          {
            text: 'トラブルの経緯',
          },
          {
            text: 'トラブルの状態を確認できるもの（写真など）',
          },
          {
            textCustom: (
              <Fragment>
                モノオクサポート
                <br />
                メール：
                <TextLink href="mailto:support@monooq.com">support@monooq.com</TextLink>
                <br />
                LINE：
                <TextLink
                  href="https://line.me/R/ti/p/%40wna0649g"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://line.me/R/ti/p/%40wna0649g
                </TextLink>
              </Fragment>
            ),
            isNoDisc: true,
          },
        ]}
      />
      <QuestionList
        title="保証対象外の荷物は？"
        list={[
          {
            text: 'モノオクサービス上で確認が不可能な荷物。',
          },
          {
            text: 'モノオクサービス上で決済が行われていない取引の荷物。',
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
          {
            text: '取引完了から30日以上が経過している荷物。',
          },
        ]}
        text="これらに対しては保証対象外となります。"
      />
      <QuestionList
        title="荷物の配送中に起こったトラブルは対象？"
        text="荷物の配送中に起こったトラブルはモノオクの補償サービスの対象外です。配送に運送業者を利用した場合は、各運送業者にお問い合わせください。"
      />
      <QuestionList
        title="緊急トラブルが発生したら？"
        text="緊急のトラブルが発生した場合は、警察・消防など所轄窓口に通報してください。その上でモノオクカスタマーサポートまでご連絡ください。"
      />
    </ContentContainer>
  </ContainerDefault>
);
