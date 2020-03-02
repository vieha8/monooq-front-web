import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import HowToUseList from 'components/LV2/Lists/HowToUseList';
import TopView from 'components/LV2/TopView/HowToUse';

const howtouse01 =
  'https://monooq.imgix.net/img%2Fservice%2Fhowtouse_01%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const howtouse02 =
  'https://monooq.imgix.net/img%2Fservice%2Fhowtouse_02%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const howtouse03 =
  'https://monooq.imgix.net/img%2Fservice%2Fhowtouse_03%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const howtouse04 =
  'https://monooq.imgix.net/img%2Fservice%2Fhowtouse_04%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';

const Wrap = styled.div`
  width: 100%;
  overflow: hidden;
`;

const ContentWrap = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 100px;
  ${media.tablet`
    margin-top: ${Dimens.medium4_50}px;
  `}
`;

const Attention = styled.div`
  font-size: ${FontSizes.medium_18}px;
  color: ${Colors.brandPrimary};
  margin-bottom: ${Dimens.small2}px;
  ${media.tablet`
    margin-bottom: ${Dimens.small}px;
  `};
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
    margin-bottom: ${Dimens.medium3_40}px;
  `};
`;

export default () => (
  <Wrap>
    <TopView />
    <ContentWrap>
      <Attention>登録から搬入出までかんたん４ステップ！</Attention>
      <Headline>荷物を預ける利用手順</Headline>
      <HowToUseList
        HowToUseList={[
          [
            {
              image: howtouse01,
              contentNo: '01',
              title: '登録・相談',
              detail:
                'ユーザー登録をしてスペースを検索！気になるスペースを見つけたら、ホストに預けたい荷物の内容や利用期間を伝え、相談を開始しましょう。',
            },
            {
              image: howtouse02,
              contentNo: '02',
              title: '見積もり確認・お支払い',
              detail: (
                <Fragment>
                  ホストと相談し利用が確定したら、ホストから見積りが届きます。見積もり内容に問題がなければ、お支払いをして取り引き成立です！
                  <br />
                  WEB上で決済できるので、面倒な手続きはありません。
                </Fragment>
              ),
            },
          ],
          [
            {
              image: howtouse03,
              contentNo: '03',
              title: '荷物の搬入',
              detail:
                '利用開始日になったらホストのスペースへ荷物を運び入れます。ご自身での搬入、または配送業者の手配を行いましょう。',
            },
            {
              image: howtouse04,
              contentNo: '04',
              title: '荷物の搬出',
              detail:
                '利用終了日になったら荷物を引き取ります。もし延長を希望する場合は、ホストに相談し延長契約を結ぶことができます。',
            },
          ],
        ]}
      />
    </ContentWrap>
  </Wrap>
);
