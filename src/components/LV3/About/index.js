import React, { Fragment } from 'react';
import { push } from 'connected-next-router';
import styled from 'styled-components';
import Path from 'config/path';
import { FontSizes, Colors, Dimens, ZIndexes } from 'variables';
import LazyLoad from 'react-lazyload';
import { media } from 'helpers/style/media-query';
import PageDefault from 'components/LV1/PageDefault';
import CollapsibleList from 'components/LV2/Lists/CollapsibleList';
import WhenIUseList from 'components/LV2/Lists/WhenIUseList';
import WhenIUseCardList from 'components/LV2/Lists/WhenIUseCardList';

const moneyMetapher =
  'https://monooq.imgix.net/img%2Fservice%2Fmoney_metapher%402x.png?alt=media&auto=format&auto=compress';
const scheduleMetapher =
  'https://monooq.imgix.net/img%2Fservice%2Fschedule_metapher%402x.png?alt=media&auto=format&auto=compress';
const timeMetapher =
  'https://monooq.imgix.net/img%2Fservice%2Ftime_metapher%402x.png?alt=media&auto=format&auto=compress';
const beginner =
  'https://monooq.imgix.net/img%2Fservice%2Fbeginner%402x.png?alt=media&auto=format&auto=compress';
const guarantee =
  'https://monooq.imgix.net/img%2Fservice%2Fguarantee%402x.png?alt=media&auto=format&auto=compress';
const ruleManner =
  'https://monooq.imgix.net/img%2Fservice%2Frule_manner%402x.png?alt=media&auto=format&auto=compress';
const howtouseEyeCatch =
  'https://monooq.imgix.net/img%2Fservice%2Fabout_eye_catch%402x.png?alt=media&auto=format&auto=compress';

const TopWrap = styled.div`
  position: relative;
  height: 620px;
  color: ${Colors.black};
  margin-bottom: ${Dimens.medium}px;
  width: 100%;
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 70%;
    height: 324px;
    background: ${Colors.lightGray1Bg};
  }
  ${media.tablet`
    top: 0px;
    width: 100%;
    height: 410px;
    margin-bottom: 0;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
    }
  `};
  ${media.phone`
    height: 374px;
    }
  `};
`;

const TopEyeCatch = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  z-index: ${ZIndexes.child_1};
  ${media.giant`
    width: 90%;
  `};
  ${media.tablet`
    width: 100%;
  `};
`;

const TopMessageWrap = styled.div`
  position: absolute;
  top: 190px;
  left: 5%;
  height: 310px;
  width: 550px;
  padding: ${Dimens.medium4_50}px ${Dimens.medium2}px;
  background-color: ${Colors.white};
  z-index: ${ZIndexes.child_2};
  ${media.tablet`
    top: 230px;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 500px;
    height: initial;
    margin: auto;
    text-align: center;
    padding: ${Dimens.medium1}px;
  `};
  ${media.tablet`
    width: calc(100% - 32px);
  `};
  ${media.phone`
    top: 180px;
  `};
`;

const TopSubTitle = styled.div`
  color: ${Colors.brandPrimary};
  font-size: ${FontSizes.medium_18}px;
  line-height: ${Dimens.medium1_28}px;
  margin-bottom: ${Dimens.small}px;
  ${media.tablet`
    display: none;
  `}
`;

const TopTitle = styled.div`
  font-size: ${FontSizes.xxlarge_40}px;
  line-height: ${Dimens.medium4}px;
  font-weight: bold;
  margin-bottom: ${Dimens.small2}px;
  ${media.tablet`
    font-size: ${FontSizes.medium2}px;
    line-height: ${Dimens.medium2}px;
    margin-bottom: ${Dimens.xsmall}px;
  `}
  ${media.phoneSmall`
    font-size: ${FontSizes.medium1}px;
  `}
`;

const TopDescription = styled.div`
  font-size: ${FontSizes.medium}px;
  line-height: ${Dimens.medium1}px;
  ${media.tablet`
    font-size: ${FontSizes.small_12}px;
    line-height: ${Dimens.medium_20}px;
  `}
`;

const Attention = styled.div`
  font-size: ${FontSizes.medium_18}px;
  color: ${Colors.brandPrimary};
  margin: ${Dimens.medium2_36}px auto ${Dimens.small2}px;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
  `};
`;

const Headline = styled.div`
  font-size: ${FontSizes.xxlarge}px;
  line-height: ${Dimens.medium2_38}px;
  font-weight: bold;
  margin-bottom: ${Dimens.medium2}px;
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    line-height: ${Dimens.medium1}px;
    margin-bottom: ${Dimens.medium1}px;
  `};
`;

const WhenIUseWrap = styled(PageDefault)`
  text-align: center;
  ${media.tablet`
    margin-top: ${Dimens.medium2_32}px;
  `};
`;

const WhenIUseContent = styled.div`
  &:not(:first-child) {
    padding-top: 100px;
  }
`;

const ContentWrap = styled(PageDefault)`
  text-align: center;
`;

const ConceptVideo = styled.iframe`
  margin: ${Dimens.large2_70}px auto ${Dimens.medium2_34}px;
  max-width: 600px;
  ${media.tablet`
    width: 100%;
    height: 320px;
  `};
  ${media.phone`
    height: 186px;
  `};
`;

const About = () => (
  <div>
    <LazyLoad>
      <TopWrap>
        <TopEyeCatch src={howtouseEyeCatch} />
        <TopMessageWrap>
          <TopSubTitle>モノオクとは？</TopSubTitle>
          <TopTitle>
            空きスペースを活用できる
            <br />
            物置きのシェアサービス。
          </TopTitle>
          <TopDescription>
            モノオクは、荷物の保管場所を探している人と、余ったスペースを有効活用したい人をつなぐ、物置きのシェアサービスです。
          </TopDescription>
        </TopMessageWrap>
      </TopWrap>
    </LazyLoad>
    <WhenIUseWrap>
      <LazyLoad>
        <WhenIUseContent>
          <Attention>「荷物の置き場所に困った…」を解決！</Attention>
          <Headline>こんなときにはモノオク！</Headline>
          <WhenIUseList
            list={[
              {
                image: moneyMetapher,
                title: '手頃な価格で荷物を預けたい',
                text:
                  '初期費用無料！無駄な費用が一切かからないため、トランクルームに比べて安く荷物を保管できます。',
              },
              {
                image: scheduleMetapher,
                title: '利用期間が未定',
                text:
                  '1ヶ月、半年、1年でも。お試しでの短期から長期まで、ホストとの相談次第で預ける期間を柔軟に決められます。',
              },
              {
                image: timeMetapher,
                title: '今すぐに物置きが必要',
                text:
                  '急な引越しやリフォーム、留学など、緊急で預ける場所が必要なときにも。かんたん手続きですぐに利用できます。',
              },
            ]}
          />
        </WhenIUseContent>
      </LazyLoad>
      <LazyLoad>
        <WhenIUseContent>
          <Attention>モノオクのことをもっと詳しく</Attention>
          <Headline>ご利用にあたって</Headline>
          <WhenIUseCardList
            list={[
              {
                image: beginner,
                subTitle: 'モノオクを利用する前に',
                title: 'はじめてのご利用ガイド',
                text: (
                  <Fragment>
                    「どうやって使えばいいの？」
                    <br />
                    はじめてご利用の方に、登録から契約までの流れを紹介します。
                  </Fragment>
                ),
                buttonText: 'はじめてのご利用ガイド',
                onClick: () => push(Path.howtouse()),
              },
              {
                image: guarantee,
                subTitle: '荷物の紛失・破損時に',
                title: 'あんしん荷物補償',
                text:
                  '大切な荷物を最大10万円まで補償します。万が一トラブルがおきても、ゲストとホストをあんしんサポート。',
                buttonText: 'あんしん荷物補償について',
                onClick: () => push(Path.insurance()),
              },
              {
                image: ruleManner,
                subTitle: 'より快適にご利用いただくために',
                title: 'ルールとマナー',
                text:
                  'モノオクは個人間の取引で成立しています。誰もが気持ちよくサービスを使えるよう、ルールとマナーを守ってご利用ください。',
                buttonText: 'ルールとマナーについて',
                onClick: () => push(Path.rule()),
              },
            ]}
          />
        </WhenIUseContent>
      </LazyLoad>
    </WhenIUseWrap>

    <LazyLoad>
      <ContentWrap>
        <ConceptVideo
          title="about"
          width="600"
          height="337"
          src="https://www.youtube.com/embed/t0t50WBDwzc"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </ContentWrap>
    </LazyLoad>

    <LazyLoad>
      <ContentWrap>
        <Attention>困ったときのFAQ</Attention>
        <Headline>よくある質問</Headline>
        <CollapsibleList
          list={[
            {
              trigger: 'Q. 初期費用はかかりますか？',
              answer: (
                <Fragment>
                  モノオクでお支払いいただく費用は、ホストスペースの月額利用料のみです。サービス登録料や初期費用は必要ございません。
                  <br />
                  ※荷物の配送費用はゲスト（利用者）の負担となります。
                </Fragment>
              ),
            },
            {
              trigger: 'Q. 対応地域はどこですか？',
              answer: '全国47都道府県で対応しています。',
            },
            {
              trigger: 'Q. 最短の契約期間は何日からですか？',
              answer:
                '基本的には最短1ヶ月となります。ただし、ホスト側と相談して期間を1ヶ月より短くすることも可能です。',
            },
            {
              trigger: 'Q. 支払い方法を教えてください。',
              answer: 'クレジットカード払い（VISA・MasterCard）に対応しています。',
            },
            {
              trigger: 'Q. 補償適用の条件を教えてください。',
              answer: (
                <Fragment>
                  ・モノオクサービス内で決済が行われていること。
                  <br />
                  ・メッセージ上でやりとりの記録が残っていること。
                  <br />
                  上記に加えて、利用規約を遵守した利用方法であれば、もしも破損・紛失・盗難などが起きた場合に、最大10万円（免責金額3,000円）までの補償を受けることができます。
                </Fragment>
              ),
            },
            {
              trigger: 'Q. 配送の手配はどうしたらいいですか？',
              answer: (
                <Fragment>
                  配送方法は以下の3つが可能です。用途に合う方法で配送を行ってください。
                  <br />
                  1.ヤマト運輸などの一般的な配送サービス
                  <br />
                  2.直接運ぶ
                  <br />
                  3.モノオクからお得な料金で
                  <a
                    href="https://www.hacobell.com/register?tenant_code=monooq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gaHacobelAbout"
                  >
                    配送手配
                  </a>
                </Fragment>
              ),
            },
          ]}
        />
      </ContentWrap>
    </LazyLoad>
  </div>
);

export default About;
