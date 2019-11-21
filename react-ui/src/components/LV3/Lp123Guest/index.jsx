import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';
import Collapsible from 'react-collapsible';
import Meta from 'components/LV1/Meta';
import ContainerDefault from 'components/LV1/ContainerDefault';
import ButtonCaption from 'components/LV2/Forms/ButtonCaption';
import PickupSpaceList from 'components/LV2/Lists/PickupSpaceList';

import ImageHero from 'images/lp123guest/hero.jpg';
import ImageBarLeft from 'images/lp123guest/icon-bar-left.png';
import ImageBarRight from 'images/lp123guest/icon-bar-right.png';
import ImageWantFile from 'images/lp123guest/icon-want-file.png';
import ImageWantGolf from 'images/lp123guest/icon-want-golf.png';
import ImageWantHome from 'images/lp123guest/icon-want-home.png';
import ImageWantSnowboard from 'images/lp123guest/icon-want-snowboard.png';
import ImageWantTruck from 'images/lp123guest/icon-want-truck.png';
import ImageWantWear from 'images/lp123guest/icon-want-wear.png';
import ImageBgWorry from 'images/lp123guest/bg-worry.png';
import ImageBgWorryPerson from 'images/lp123guest/bg-worry-person.png';
import ImageBusinessmodel from 'images/lp123guest/businessmodel.png';
import ImagePickupSpace1 from 'images/lp123guest/pickup-space-1.jpg';
import ImagePickupSpace1Host from 'images/lp123guest/pickup-space-1-host.jpg';
import ImagePickupSpace2 from 'images/lp123guest/pickup-space-2.jpg';
import ImagePickupSpace2Host from 'images/lp123guest/pickup-space-2-host.jpg';
import ImagePickupSpace3 from 'images/lp123guest/pickup-space-3.jpg';
import ImagePickupSpace3Host from 'images/lp123guest/pickup-space-3-host.jpg';
import ImageFlow1 from 'images/lp123guest/flow-1.png';
import ImageFlow2 from 'images/lp123guest/flow-2.png';
import ImageFlow3 from 'images/lp123guest/flow-3.png';

const Wrap = styled.div`
  min-width: 320px;
  margin-top: -84px;
  font-weight: 500;
`;

const TopWrap = styled.div`
  position: relative;
  height: 600px;
  color: ${Colors.black};
  width: 100%;
  overflow: hidden;
  background-color: ${Colors.darkGray1};
  background-image: url(${ImageHero});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.2);
  background-blend-mode: lighten;
  ${media.tablet`
    height: 440px;
  `};
`;

const TopMessageContent = styled.div`
  position: relative;
  width: 100%;
  top: 190px;
  text-align: center;
  ${media.tablet`
    top: 210px;
    margin: auto;
    padding: 0 ${Dimens.medium}px;
  `};
`;

const TopTitle = styled.h1`
  font-size: ${FontSizes.medium3}px;
  line-height: ${Dimens.medium2_38}px;
  font-weight: bold;
  margin-bottom: ${Dimens.medium_20}px;
  color: ${Colors.white};
  text-shadow: 1px 1px 1px #333;
  ${media.tablet`
    font-size: ${FontSizes.medium2}px;
    line-height: ${Dimens.medium2}px;
    margin-bottom: ${Dimens.small_10}px;
  `}
  ${media.phone`
    font-size: ${FontSizes.medium1}px;
  `}
  ${media.phoneSmall`
    font-size: ${FontSizes.medium_18}px;
  `}
`;

const InitialCost = styled.span`
  display: block;
  margin-bottom: 14px;
  color: ${Colors.white};
  text-shadow: 1px 1px 1px #333;
  animation: flashCost 1s infinite;
  @keyframes flashCost {
    50% {
      opacity: 0;
    }
  }
  &::before,
  &::after {
    content: '';
    display: inline-block;
    width: 25px;
    height: 25px;
    vertical-align: bottom;
    background-repeat: no-repeat;
  }
  &::before {
    margin-right: 5px;
    background: url(${ImageBarLeft}) 0% 0% / 25px 25px no-repeat;
  }
  &:after {
    margin-left: 5px;
    background: url(${ImageBarRight}) 0% 0% / 25px 25px no-repeat;
  }
`;

const SectionTitle = styled.span`
  position: relative;
  display: block;
  font-size: ${FontSizes.medium2_26}px;
  text-align: center;
  margin-top: 0.7em;
  margin-bottom: 2em;
  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 60px;
    height: 3px;
    bottom: -16px;
    left: 50%;
    -moz-transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: black;
    border-radius: 10px;
  }
  ${media.phone`
    font-size: ${FontSizes.medium1}px;
  `};
`;

const WantWrap = styled.div`
  max-width: 960px;
  position: relative;
  background: ${Colors.white};
  padding: ${Dimens.medium1_25}px;
  border-radius: 6px;
  box-shadow: 0.5px 0px 3px #333;
  margin: ${Dimens.small_10}px auto ${Dimens.medium4_50}px;
  ${media.tablet`
    box-shadow: unset;
    padding: ${Dimens.medium1_25}px ${Dimens.medium}px;
  `};
  ${media.phone`
    padding: ${Dimens.medium}px ${Dimens.medium}px;
  `};
`;

const WantUl = styled.ul`
  width: 100%;
  box-sizing: border-box;
  text-align: center;
`;

const WantLi = styled.li`
  border: solid 1px ${Colors.lightGray2};
  border-radius: 6px;
  display: inline-block;
  width: calc(33.333333% - 6px);
  margin: 0 auto ${Dimens.small_10}px;
  &:nth-child(2),
  &:nth-child(5) {
    margin: 0 ${Dimens.small_9}px ${Dimens.small_10}px;
  }
  ${media.phone`
    width: calc(50% - 5px);
    &:nth-child(2),
    &:nth-child(5) {
      margin: 0 auto ${Dimens.small_10}px;
    }
    &:nth-child(2n) {
      margin: 0 auto ${Dimens.small_10}px ${Dimens.small_10}px;
    }
  `};
`;

const WantLiFigure = styled.figure`
  padding: 10px 5px;
  ${media.tablet`
    font-size: ${FontSizes.small}px;
  `};
  ${media.phone`
    font-size: ${FontSizes.small_12}px;
  `};
`;

const WantLiImg = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 0;
`;

const WorryWrap = styled.div`
  position: relative;
  margin: ${Dimens.small_10}px auto ${Dimens.medium_20}px;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  background-color: ${Colors.lightGray9};
  background-image: url(${ImageBgWorry});
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0px;
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-color: ${Colors.white} transparent transparent transparent;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
  }
  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -25px;
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-color: ${Colors.lightGray9} transparent transparent transparent;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
    z-index: ${ZIndexes.child_1};
  }
`;

const WorryConnect = styled.span`
  top: 15%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  ${media.phone`
    top: 20%;
  `};
`;

const WorryWrapUl = styled.div`
  position: relative;
  min-height: 280px;
  max-width: 960px;
  margin: auto;
  padding: 0px ${Dimens.medium2}px;
  background-image: url(${ImageBgWorryPerson});
  background-repeat: no-repeat;
  background-size: 280px;
  background-position: bottom right;
  ${media.tablet`
    padding: 0px ${Dimens.medium}px;
  `};
  ${media.phone`
    min-height: 220px;
    padding: 0px ${Dimens.small_10}px;
    background-size: 100px;
  `};
`;

const WorryUl = styled.ul`
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  font-size: ${FontSizes.medium2_26}px;
  text-align: left;
  ${media.phone`
    background-size: 100px;
    font-size: ${FontSizes.medium}px;
  `};
  ${media.phoneSmall`
    font-size: ${FontSizes.small}px;
  `};
`;

const WorryLi = styled.li`
  margin-bottom: 0.7em;
`;

// TODO: activeクラス付与時のみ、background-position
const Marker = styled.span`
  background-image: -webkit-linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-image: -moz-linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-image: -ms-linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-image: -o-linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-image: linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-repeat: repeat-x;
  background-size: 200% 0.8em;
  background-position: 0 0.5em;
  transition: all 2s ease;
  background-position: -100% 0.5em;
`;

const CatchPhraseWrap = styled.div`
  position: relative;
  background-color: ${Colors.brandPrimary};
  margin: ${Dimens.small_10}px auto ${Dimens.medium_20}px;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  min-height: 150px;
  color: #fff;
`;

const CatchPhraseConnect = styled.span`
  top: 30%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const CatchPhraseText = styled.span`
  display: block;
  font-size: ${FontSizes.large}px;
  line-height: normal;
  text-align: center;
  padding-top: ${Dimens.large4_80}px;
  ${media.tablet`
    font-size: 24px;
    padding: ${Dimens.large4_80}px ${Dimens.medium}px ${Dimens.medium2}px;
  `};
`;

const BrOnlyTabletSP = styled.br`
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

const MeritWrap = styled.div`
  position: relative;
  padding: ${Dimens.medium2}px;
  background-color: ${Colors.brandQuaternary};
  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0px;
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-color: ${Colors.brandPrimary} transparent transparent transparent;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
  }
  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -25px;
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-color: ${Colors.brandQuaternary} transparent transparent transparent;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
    z-index: ${ZIndexes.child_1};
  }
  ${media.tablet`
    padding: ${Dimens.medium2}px ${Dimens.medium}px;
  `};
`;

const MeritTable = styled.table`
  max-width: 900px;
  margin: auto;
  background: ${Colors.white};
  border: solid 3px ${Colors.lightGray2};
  text-align: left;
  ${media.tablet`
    font-size: ${FontSizes.small}px;
  `};
  ${media.phone`
    font-size: ${FontSizes.small_12}px;
  `};
`;

const MeritTableHead = styled.thead`
  background-color: ${Colors.lightGray2};
  color: ${Colors.white};
  text-align: center;
`;

const MeritTableHeadTh = styled.th`
  &:first-child {
    width: 20%;
  }
  padding: ${Dimens.small2}px ${Dimens.small}px;
  border: solid 1px ${Colors.lightGray2};
  font-weight: normal;
  vertical-align: middle;
  color: ${Colors.black};
  background-color: ${Colors.lightGray2};
  ${props =>
    props.monooq &&
    `
      font-size: ${FontSizes.medium1}px;
      color: ${Colors.white};
      background-color: ${Colors.brandPrimary};;
      border: solid 3px ${Colors.brandPrimary};
    `};
  ${media.phone`
    ${props =>
      props.monooq &&
      `
        font-size: ${FontSizes.medium}px;
      `};
  `};
`;

const MeritTableTbodyTh = styled.th`
  padding: ${Dimens.small2}px ${Dimens.small}px;
  border: solid 1px ${Colors.lightGray2};
  font-weight: normal;
  text-align: center;
  background-color: ${Colors.lightGray8};
  &:nth-child(2) {
    border: solid 3px ${Colors.brandPrimary} !important;
  }
`;

const MeritTableTbodyTd = styled.td`
  padding: ${Dimens.small2}px ${Dimens.small}px;
  border: solid 1px ${Colors.lightGray2};
  ${props =>
    props.monooq &&
    `
      border: solid 3px ${Colors.brandPrimary};
    `};
`;

const BusinessmodelWrap = styled.div`
  position: relative;
  padding: ${Dimens.medium2}px 0;
  &:nth-child(1) {
    border: solid 5px ${Colors.brandPrimary} !important;
  }
  ${media.tablet`
    padding: ${Dimens.medium2}px ${Dimens.medium}px;
  `};
`;

const BusinessmodelWrapFigure = styled.figure`
  max-width: 900px;
  margin: auto;
  font-size: ${FontSizes.medium2_26}px;
`;

const BusinessmodelWrapFigureImage = styled.img`
  width: 100%;
`;

const BusinessmodelWrapFigcaption = styled.figcaption`
  margin-top: ${Dimens.medium_20}px;
  font-size: ${FontSizes.medium_18}px;
  line-height: 2em;
  text-align: left;
`;

const PickupSpaceWrap = styled.div`
  position: relative;
  background-color: ${Colors.brandQuaternary};
  padding: ${Dimens.medium2}px;
  &::before,
  &::after {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
  }
  &::before {
    top: 0px;
    border-color: ${Colors.white} transparent transparent transparent;
  }
  &::after {
    bottom: -25px;
    border-color: ${Colors.brandQuaternary} transparent transparent transparent;
    z-index: ${ZIndexes.child_1};
  }
  ${media.tablet`
    padding: ${Dimens.medium2}px ${Dimens.medium}px;
  `};
`;

const FlowWrap = styled.div`
  max-width: 900px;
  margin: auto;
  padding: ${Dimens.medium2}px;
  ${media.tablet`
    padding: ${Dimens.medium2}px ${Dimens.medium}px;
  `};
`;

const FlowUl = styled.ul`
  display: flex;
  ${media.tablet`
    flex-wrap: wrap;
  `};
`;

const FlowLi = styled.li`
  display: inline-block;
  width: 33.333333333%;
  border: solid 1px #eee;
  border-radius: 6px;
  line-height: 1.7em;
  text-align: left;
  &:nth-child(2) {
    margin: auto ${Dimens.small_10}px;
  }
  ${media.tablet`
    width: 100%;
    &:nth-child(2) {
      margin: ${Dimens.small_10}px auto;
    }
  `};
`;

const FlowLiItem = styled.div`
  padding: ${Dimens.small_10}px;
  overflow: hidden;
`;

const FlowLiImg = styled.img`
  width: 50px;
  margin-bottom: 0;
  margin-right: 5px;
  float: left;
`;

const FlowLiB = styled.b`
  font-weight: bold;
`;

const FlowLiText = styled.span`
  display: block;
  margin-left: 55px;
  padding-bottom: 0;
`;

const ContentsWrap = styled(ContainerDefault)`
  position: relative;
  margin-top: -60px;
  text-align: center;
  ${media.tablet`
    margin-top: ${Dimens.medium2_32}px;
    padding: 0px;
  `};
`;

const QaWrap = styled.div`
  position: relative;
  background-color: ${Colors.brandQuaternary};
  padding: ${Dimens.medium2}px;
  text-align: center;
  &::before {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
  }
  &::before {
    top: 0px;
    border-color: ${Colors.white} transparent transparent transparent;
  }
  ${media.tablet`
    padding: ${Dimens.medium2}px ${Dimens.medium}px;
  `};
`;

const QuestionsContainer = styled.div`
  text-align: center;
`;

const QuestionRow = styled.div`
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const QuestionItem = styled.div`
  width: 100%;
  max-width: 600px;
  margin: ${Dimens.small2}px auto 0px;
`;

const Answer = styled.div`
  padding: ${Dimens.small_10}px ${Dimens.medium1}px;
  text-align: left;
  ${media.phone`
    padding: ${Dimens.small_10}px ${Dimens.medium}px;
  `}
`;

export default ({ titleMeta, headline, titleWant, onClickSignup }) => (
  <Wrap>
    <Meta title={titleMeta} />

    <TopWrap>
      <TopMessageContent>
        <TopTitle itemProp="headline">{headline}</TopTitle>
        <InitialCost>初期費用0円</InitialCost>
        <ButtonCaption caption="60秒で簡単登録" text="保管スペースを探す" onClick={onClickSignup} />
      </TopMessageContent>
    </TopWrap>

    <ContentsWrap>
      <WantWrap>
        <SectionTitle>{titleWant}</SectionTitle>
        <WantUl>
          <WantLi>
            <WantLiFigure>
              <WantLiImg src={ImageWantTruck} alt="img-truck" />
              <figcaption>引越し時の荷物</figcaption>
            </WantLiFigure>
          </WantLi>
          <WantLi>
            <WantLiFigure>
              <WantLiImg src={ImageWantHome} alt="img-home" />
              <figcaption>リフォーム中の荷物</figcaption>
            </WantLiFigure>
          </WantLi>
          <WantLi>
            <WantLiFigure>
              <WantLiImg src={ImageWantSnowboard} alt="img-snowboard" />
              <figcaption>季節のレジャー用品</figcaption>
            </WantLiFigure>
          </WantLi>
          <WantLi>
            <WantLiFigure>
              <WantLiImg src={ImageWantFile} alt="img-file" />
              <figcaption>仕事道具・書類</figcaption>
            </WantLiFigure>
          </WantLi>
          <WantLi>
            <WantLiFigure>
              <WantLiImg src={ImageWantWear} alt="img-wear" />
              <figcaption>衣替え時の衣類</figcaption>
            </WantLiFigure>
          </WantLi>
          <WantLi>
            <WantLiFigure>
              <WantLiImg src={ImageWantGolf} alt="img-golf" />
              <figcaption>趣味の道具</figcaption>
            </WantLiFigure>
          </WantLi>
        </WantUl>
      </WantWrap>
      <WorryWrap>
        <WorryWrapUl>
          <WorryConnect>でも</WorryConnect>
          <WorryUl>
            <WorryLi>
              <Marker>トランクルームやレンタル倉庫は高いし空きがない</Marker>
            </WorryLi>
            <WorryLi>
              <Marker>コンテナは環境が悪い</Marker>
            </WorryLi>
            <WorryLi>
              <Marker>宅配型の保管サービスでは置ききれない</Marker>
            </WorryLi>
          </WorryUl>
        </WorryWrapUl>
      </WorryWrap>
      <CatchPhraseWrap>
        <CatchPhraseConnect>そんな時は</CatchPhraseConnect>
        <CatchPhraseText>
          個人宅に荷物を預けられる
          <BrOnlyTabletSP />
          『モノオク』がおすすめ！
        </CatchPhraseText>
      </CatchPhraseWrap>
      <MeritWrap>
        <SectionTitle>モノオクのメリット</SectionTitle>
        <MeritTable>
          <MeritTableHead>
            <tr>
              <MeritTableHeadTh />
              <MeritTableHeadTh monooq>モノオク</MeritTableHeadTh>
              <MeritTableHeadTh>一般的なトランクルーム</MeritTableHeadTh>
            </tr>
          </MeritTableHead>
          <tbody>
            <tr>
              <MeritTableTbodyTh>一畳あたりの平均価格</MeritTableTbodyTh>
              <MeritTableTbodyTd monooq>6,000円〜</MeritTableTbodyTd>
              <MeritTableTbodyTd>15,000円〜</MeritTableTbodyTd>
            </tr>
            <tr>
              <MeritTableTbodyTh>初期費用</MeritTableTbodyTh>
              <MeritTableTbodyTd monooq>無料</MeritTableTbodyTd>
              <MeritTableTbodyTd>月額料の1.5〜3.5ヶ月分程度</MeritTableTbodyTd>
            </tr>
            <tr>
              <MeritTableTbodyTh>荷物サイズ</MeritTableTbodyTh>
              <MeritTableTbodyTd monooq>大きな荷物、大量の荷物も保管可</MeritTableTbodyTd>
              <MeritTableTbodyTd>大きな荷物、大量の荷物も保管可</MeritTableTbodyTd>
            </tr>
            <tr>
              <MeritTableTbodyTh>距離</MeritTableTbodyTh>
              <MeritTableTbodyTd monooq>最寄りのスペースを探せる</MeritTableTbodyTd>
              <MeritTableTbodyTd>指定場所のみ対応（郊外が中心）</MeritTableTbodyTd>
            </tr>
            <tr>
              <MeritTableTbodyTh>保険</MeritTableTbodyTh>
              <MeritTableTbodyTd monooq>荷物保険込みの料金(三井住友海上)</MeritTableTbodyTd>
              <MeritTableTbodyTd>業者によって様々</MeritTableTbodyTd>
            </tr>
            <tr>
              <MeritTableTbodyTh>手続き</MeritTableTbodyTh>
              <MeritTableTbodyTd monooq>一切不要</MeritTableTbodyTd>
              <MeritTableTbodyTd>必要</MeritTableTbodyTd>
            </tr>
          </tbody>
        </MeritTable>
      </MeritWrap>
      <BusinessmodelWrap>
        <SectionTitle>モノオクの仕組み</SectionTitle>
        <BusinessmodelWrapFigure>
          <BusinessmodelWrapFigureImage src={ImageBusinessmodel} alt="img-businessmodel" />
          <BusinessmodelWrapFigcaption>
            <Marker>モノオクは「荷物を預けたい人」と「荷物を保管したい人」を繋ぐサービス</Marker>
            です。
            <br />
            モノオクのWEBサイトにアクセスすると、たくさんの空きスペース見つけることができます。その中からあなたの条件に合ったスペースを選びましょう。
            <br />
            選んだスペースのホストにメッセージを送り交渉が成立すれば、すぐに荷物を預けることができます。
          </BusinessmodelWrapFigcaption>
        </BusinessmodelWrapFigure>
      </BusinessmodelWrap>
      <PickupSpaceWrap>
        <SectionTitle>PickUP!スペース</SectionTitle>
        <PickupSpaceList
          list={[
            {
              spaceImage: ImagePickupSpace1,
              spaceImageAlt: 'img-space1',
              spaceImageprice: '5,000円〜',
              station: '西川口駅',
              walk: '2分',
              type: '部屋',
              backage: '家具・家電',
              delivery: '配送/対面',
              hostImage: ImagePickupSpace1Host,
              hostImageAlt: 'img-host1',
              hostName: 'ithurricaneさん',
              priceList: [
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '5,000円',
                },
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '10,000円',
                },
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '18,000円',
                },
              ],
              spaceId: 2278,
            },
            {
              spaceImage: ImagePickupSpace2,
              spaceImageAlt: 'img-space2',
              spaceImageprice: '5,000円〜',
              station: '成瀬駅',
              walk: '5分',
              type: '部屋',
              backage: '家具・家電',
              delivery: '配送/対面',
              hostImage: ImagePickupSpace2Host,
              hostImageAlt: 'img-host2',
              hostName: 'もかさん',
              priceList: [
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '5,000円',
                },
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '10,000円',
                },
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '20,000円',
                },
              ],
              spaceId: 2203,
            },
            {
              spaceImage: ImagePickupSpace3,
              spaceImageAlt: 'img-space3',
              spaceImageprice: '3,000円〜',
              station: '東北沢駅',
              walk: '2分',
              type: '部屋',
              backage: '家具・家電',
              delivery: '配送/対面',
              hostImage: ImagePickupSpace3Host,
              hostImageAlt: 'img-host3',
              hostName: 'Syunさん',
              priceList: [
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '3,000円',
                },
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '6,000円',
                },
                {
                  title: '1/4程度のスペースの月額料金',
                  price: '10,000円',
                },
              ],
              spaceId: 2412,
            },
          ]}
        />
      </PickupSpaceWrap>
      <FlowWrap>
        <SectionTitle>ご利用の流れ</SectionTitle>
        <FlowUl>
          <FlowLi>
            <FlowLiItem>
              <FlowLiImg src={ImageFlow1} alt="" />
              <FlowLiB>スペースを探す</FlowLiB>
              <br />
              <FlowLiText>
                たくさんのスペースが登録されています。希望の立地や金額からスペースを探しましょう。
              </FlowLiText>
            </FlowLiItem>
          </FlowLi>
          <FlowLi>
            <FlowLiItem>
              <FlowLiImg src={ImageFlow2} alt="" />
              <FlowLiB>ホストに相談</FlowLiB>
              <br />
              <FlowLiText>
                スペースが見つかったら、ホストに荷物の内容と預ける期間をメッセージで相談しましょう。
              </FlowLiText>
            </FlowLiItem>
          </FlowLi>
          <FlowLi>
            <FlowLiItem>
              <FlowLiImg src={ImageFlow3} alt="" />
              <FlowLiB>荷物を預ける</FlowLiB>
              <br />
              <FlowLiText>
                金額と期間に合意できれば、お支払いを済ませて、スペースに荷物を預けることができます。
              </FlowLiText>
            </FlowLiItem>
          </FlowLi>
        </FlowUl>
      </FlowWrap>

      <QaWrap>
        <SectionTitle>よくある質問</SectionTitle>
        <QuestionsContainer>
          <QuestionRow>
            <QuestionItem>
              <Collapsible trigger="Q. 対応地域はどこでしょうか？">
                <Answer>47都道府県で対応しています。</Answer>
              </Collapsible>
            </QuestionItem>
            <QuestionItem>
              <Collapsible trigger="Q. 支払い方法は何に対応していますか？">
                <Answer>クレジットカード・銀行振込に対応しています。</Answer>
              </Collapsible>
            </QuestionItem>
          </QuestionRow>
          <QuestionRow>
            <QuestionItem>
              <Collapsible trigger="Q. 最短の契約期間は何日からでしょうか？">
                <Answer>
                  基本的には最短1ヶ月となります。ただし、ホスト側と相談して期間を短く1ヶ月より短くすることも可能です。
                </Answer>
              </Collapsible>
            </QuestionItem>
            <QuestionItem>
              <Collapsible trigger="Q. 預ける荷物の配送はどうしたら良いでしょうか？">
                <Answer>
                  配送方法は以下の3つが可能です。用途に合う方法で配送を行ってください。
                  <br />
                  1.ヤマト運輸などの一般的な配送サービス
                  <br />
                  2.直接運ぶ
                  <br />
                  3.提携の配送サービス（PickGo）の利用
                </Answer>
              </Collapsible>
            </QuestionItem>
          </QuestionRow>
          <QuestionRow>
            <QuestionItem>
              <Collapsible trigger="Q. 荷物を預ける場所を内覧することはできますか？">
                <Answer>
                  スペースを提供するホストとご相談いただくことで可能です。
                  <br />
                  預けたい荷物や期間などをお伝えした上でご相談ください。
                </Answer>
              </Collapsible>
            </QuestionItem>
            <QuestionItem>
              <Collapsible trigger="Q. 荷物の一部引き出しや整理をすることはできますか？">
                <Answer>
                  こちらもスペースを提供するホストとご相談いただくことで可能です。
                  <br />
                  頻度や日時などをホストにご相談ください。
                </Answer>
              </Collapsible>
            </QuestionItem>
            <QuestionItem>
              <Collapsible trigger="Q. モノオクの荷物保険とは何ですか？">
                <Answer>
                  モノオクでは、あなたの荷物をお守りするために保証制度をご用意しています。
                  <br />
                  万が一、破損・紛失・盗難などが起きてしまった場合には、最大10万円までの補償を提供しています。
                </Answer>
              </Collapsible>
            </QuestionItem>
          </QuestionRow>
        </QuestionsContainer>
      </QaWrap>
    </ContentsWrap>
  </Wrap>
);
