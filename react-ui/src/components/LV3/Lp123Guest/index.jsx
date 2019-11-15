import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';
import Collapsible from 'react-collapsible';
import Button from 'components/LV1/Forms/Button';
import ContainerDefault from 'components/LV1/ContainerDefault';
import WhenIUseList from 'components/LV2/Lists/WhenIUseList';
import WhenIUseCardList from 'components/LV2/Lists/WhenIUseCardList';
import ImageHero from 'images/lp123guest/hero.jpg';
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

const moneyMetapher =
  'https://monooq.imgix.net/img%2Fservice%2Fmoney_metapher%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const scheduleMetapher =
  'https://monooq.imgix.net/img%2Fservice%2Fschedule_metapher%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const timeMetapher =
  'https://monooq.imgix.net/img%2Fservice%2Ftime_metapher%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const beginner =
  'https://monooq.imgix.net/img%2Fservice%2Fbeginner%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const guarantee =
  'https://monooq.imgix.net/img%2Fservice%2Fguarantee%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const ruleManner =
  'https://monooq.imgix.net/img%2Fservice%2Frule_manner%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';

const Wrap = styled.div``;

const TopWrapper = styled.div`
  position: relative;
  height: 550px;
  color: ${Colors.black};
  width: 100%;
  overflow: hidden;
  background-color: ${Colors.darkGray1};
  ${media.tablet`
    top: 0px;
    width: 100%;
    height: 410px;
    margin-bottom: 0;
  `};
  ${media.phone`
    height: 374px;
    }
  `};
`;

const TopEyeCatch = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0.6;
`;

const TopMessageContent = styled.div`
  position: relative;
  width: 100%;
  top: 130px;
  text-align: center;
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

const TopTitle = styled.h1`
  font-size: ${FontSizes.xxlarge_40}px;
  line-height: ${Dimens.medium4}px;
  font-weight: bold;
  margin-bottom: ${Dimens.small2}px;
  margin-bottom: 20px;
  color: ${Colors.white};
  text-shadow: 1px 1px 1px #333;

  ${media.tablet`
    font-size: ${FontSizes.medium2}px;
    line-height: ${Dimens.medium2}px;
    margin-bottom: ${Dimens.xsmall}px;
  `}
  ${media.phoneSmall`
    font-size: ${FontSizes.medium1}px;
  `}
`;

const SectionTitle = styled.span`
  position: relative;
  display: block;
  font-size: x-large;
  text-align: center;
  margin-top: 0.7em;
  margin-bottom: 1.5em;
  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 60px;
    height: 2px;
    bottom: -10px;
    left: 50%;
    -moz-transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: black;
    border-radius: 10px;
  }
`;

const WantWrap = styled.div`
  position: relative;
  background: #fff;
  padding-top: 10px;
  padding-bottom: 25px;
  border-radius: 6px;
  box-shadow: 0.5px 0px 3px #333;
`;

const WantUl = styled.ul`
  width: 100%;
  text-align: center;
`;

const WantLi = styled.li`
  border: solid 1px #eee;
  border-radius: 6px;
  display: inline-block;
  width: 32%;
`;

const WantLiFigure = styled.figure`
  padding: 10px 5px;
`;

const WantLiImg = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 0;
`;

const WorryWrap = styled.div`
  position: relative;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  background-color: #eee;
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
    border-color: #fff transparent transparent transparent;
    border-width: 25px 50px 0 50px;
  }
  &::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: -25px;
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-color: #eee transparent transparent transparent;
    border-width: 25px 50px 0 50px;
    z-index: 1;
  }
`;

const WorryConnect = styled.span`
  top: 12%;
`;

const WorryWrapUl = styled.div`
  position: relative;
  min-height: 280px;
  background-image: url(${ImageBgWorryPerson});
  background-repeat: no-repeat;
  background-size: 280px;
  background-position: bottom right;
  padding-left: 30px;
  padding-right: 30px;
`;

const WorryUl = styled.ul`
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: x-large;
`;

const WorryLi = styled.li`
  top: 12%;
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
  background: #e85258;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  min-height: 150px;
  color: #fff;
`;

const CatchPhraseConnect = styled.span`
  top: 30%;
`;

const CatchPhraseText = styled.span`
  font-size: xx-large;
  display: block;
  text-align: center;
  margin-top: 55px;
`;

const MeritWrap = styled.div`
  position: relative;
  background: #ffeaeb;
  margin-top: 0 !important;
  padding-top: 30px !important;
  padding-left: 30px;
  padding-right: 30px;
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
    border-color: #e85258 transparent transparent transparent;
    border-width: 25px 50px 0 50px;
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
    border-color: #ffeaeb transparent transparent transparent;
    border-width: 25px 50px 0 50px;
    z-index: 1;
  }
`;

const MeritTable = styled.table`
  background: #fff;
  border: solid 3px #ddd;
`;

const MeritTableHead = styled.thead`
  background: #ddd;
  color: #fff;
`;

const MeritTableHeadTh = styled.th`
  border: solid 1px #ddd;
  font-weight: normal;
  background: #efefef;
  font-weight: normal;
  width: 20%;
  &:nth-child(2) {
    background: #e85258;
    border: solid 3px #e85258;
    color: #fff;
    font-size: large;
  }
`;

const MeritTableTbodyTd = styled.td`
  border: solid 1px #ddd;
  font-weight: normal;
  &:nth-child(2) {
    border: solid 3px #e85258 !important;
  }
`;

const MeritTableTrTd = styled.td`
  &:nth-child(1) {
    border: solid 5px #e85258 !important;
  }
`;

const BusinessmodelWrap = styled.div`
  position: relative;
  &:nth-child(1) {
    border: solid 5px #e85258 !important;
  }
`;

const BusinessmodelWrapFigure = styled.figure``;

const BusinessmodelWrapFigcaption = styled.figcaption`
  font-size: medium;
`;

const PickupSpaceWrap = styled.div`
  position: relative;
`;

const PickupSpaceItem = styled.div`
  border-radius: 6px;
  padding: 15px 15px 0;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0.5px 0px 3px #333;
`;

const PickupSpaceImageWrap = styled.div`
  position: relative;
  text-align: center;
`;

const PickupSpaceImagePrice = styled.span`
  color: #fff;
  background: rgba(33, 33, 33, 0.6);
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 1;
  padding: 0.2em 0.5em;
`;

const Yen = styled.span`
  color: #fff;
  margin: 0;
`;

const PickupSpaceDesc = styled.div`
  margin: 0;
  float: none;
  padding-left: 15px;
  padding-right: 15px;
`;

const PickupSpaceDescLocation = styled.div`
  float: none;
`;

const PickupSpaceDescDl = styled.dl`
  width: 100%;
  margin: 0 0 10px;
`;

const PickupSpaceDescDt = styled.dt`
  width: 23%;
`;

const PickupSpaceDescDd = styled.dd`
  width: 77%;
`;

const PickupSpaceDescHostWrap = styled.div`
  margin: 0 -15px;
  padding-left: 15px;
  padding-right: 15px;
  background: #eee;
  line-height: 1.6em;
`;

const PickupSpaceDescHostImage = styled.img`
  float: none;
  width: 30px;
  vertical-align: middle;
`;

const PickupSpaceDescHostName = styled.span`
  margin-left: 0.3em;
  line-height: 1em;
`;

const PickupSpacePlanUl = styled.ul`
  margin-top: 0;
  padding-top: 0;
`;

const PickupSpacePlanLi = styled.li`
  padding-right: 90px;
`;

const PickupSpacePlanLiLink = styled.a`
  line-height: 1.6em;
  font-size: small;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const PickupSpacePlanLiPrice = styled.span`
  margin-right: 0.6em;
  font-weight: bold;
  &::after {
    right: -25%;
  }
`;

const PickupSpacePlanLiSmallButton = styled.span`
  display: inline-block;
  font-size: small;
  background: #e85258;
  color: #fff;
  padding: 3px 8px;
  border-radius: 3px;
  vertical-align: top;
`;

const FlowWrap = styled.div``;

const FlowUl = styled.ul``;

const FlowLi = styled.li`
  display: inline-block;
  width: 32%;
  border: solid 1px #eee;
  border-radius: 6px;
`;

const FlowLiItem = styled.div`
  padding: 10px 5px;
  overflow: hidden;
`;

const FlowLiImg = styled.img`
  width: 50px;
  margin-bottom: 0;
  margin-right: 5px;
  float: left;
`;

const FlowLiB = styled.b``;

const FlowLiText = styled.span`
  display: block;
  margin-left: 55px;
  padding-bottom: 0;
`;

// AAAAAAAAAAAAAAA

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
    margin-bottom: ${Dimens.medium1}px;
  `};
`;

const WhenIUseContainer = styled(ContainerDefault)`
  position: relative;
  margin-top: -60px;
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

const ContentContainer = styled(ContainerDefault)`
  text-align: center;
`;

const ConceptVideo = styled.iframe`
  margin: ${Dimens.large2_70}px auto;
  max-width: 600px;
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

const TextBeginner = () => (
  <Fragment>
    「どうやって使えばいいの？」
    <br />
    はじめてご利用の方に、登録から契約までの流れを紹介します。
  </Fragment>
);

export default ({ onClickHowToUse, onClickInsurance, onClickRule }) => (
  <Wrap>
    <TopWrapper>
      <TopEyeCatch src={ImageHero} />
      <TopMessageContent>
        <TopTitle itemProp="headline">
          トランクルームより安く荷物を
          <br />
          預けるなら『モノオク』
        </TopTitle>
        <div>初期費用0円</div>
        <Button center primary fontbold fill={1}>
          <span>60秒で簡単登録</span>
          保管スペースを探す
        </Button>
      </TopMessageContent>
    </TopWrapper>

    <WhenIUseContainer>
      <WantWrap>
        <SectionTitle>こんな荷物ありませんか？</SectionTitle>
        <WantUl>
          <WantLi>
            <WantLiFigure>
              <WantLiImg alt="" src={ImageWantTruck} />
              <figcaption>引越し時の荷物</figcaption>
            </WantLiFigure>
          </WantLi>
          <WantLi>
            <WantLiFigure>
              <WantLiImg alt="" src={ImageWantHome} />
              <figcaption>リフォーム中の荷物</figcaption>
            </WantLiFigure>
          </WantLi>
          <WantLi>
            <WantLiFigure>
              <WantLiImg alt="" src={ImageWantSnowboard} />
              <figcaption>季節のレジャー用品</figcaption>
            </WantLiFigure>
          </WantLi>
          <WantLi>
            <WantLiFigure>
              <WantLiImg alt="" src={ImageWantFile} />
              <figcaption>仕事道具・書類</figcaption>
            </WantLiFigure>
          </WantLi>
          <WantLi>
            <WantLiFigure>
              <WantLiImg alt="" src={ImageWantWear} />
              <figcaption>衣替え時の衣類</figcaption>
            </WantLiFigure>
          </WantLi>
          <WantLi>
            <WantLiFigure>
              <WantLiImg alt="" src={ImageWantGolf} />
              <figcaption>趣味の道具</figcaption>
            </WantLiFigure>
          </WantLi>
        </WantUl>
      </WantWrap>
      <WorryWrap>
        <WorryConnect class="connect">でも</WorryConnect>
        <WorryWrapUl class="worry-inner">
          <WorryUl class="worry">
            <WorryLi>
              <Marker>トランクルームは高いし空きがない</Marker>
            </WorryLi>
            <WorryLi>
              <Marker>コンテナは環境が悪い</Marker>
            </WorryLi>
            <WorryLi>
              <Marker>宅配型の保管サービスでは預けきれない</Marker>
            </WorryLi>
          </WorryUl>
        </WorryWrapUl>
      </WorryWrap>
      <CatchPhraseWrap>
        <div>
          <CatchPhraseConnect>そんな時は</CatchPhraseConnect>
          <CatchPhraseText>個人宅に荷物を預けられる『モノオク』がおすすめ！</CatchPhraseText>
        </div>
      </CatchPhraseWrap>
      <MeritWrap>
        <SectionTitle>モノオクのメリット</SectionTitle>
        <MeritTable>
          <MeritTableHead>
            <tr>
              <MeritTableHeadTh />
              <MeritTableHeadTh>モノオク</MeritTableHeadTh>
              <MeritTableHeadTh>一般的なトランクルーム</MeritTableHeadTh>
            </tr>
          </MeritTableHead>
          <tbody>
            <tr>
              <MeritTableTbodyTd>一畳あたりの平均価格</MeritTableTbodyTd>
              <td>6,000円〜</td>
              <td>15,000円〜</td>
            </tr>
            <tr>
              <MeritTableTbodyTd>初期費用</MeritTableTbodyTd>
              <td>無料</td>
              <td>月額料の1.5〜3.5ヶ月分程度</td>
            </tr>
            <tr>
              <MeritTableTbodyTd>荷物サイズ</MeritTableTbodyTd>
              <td>大きな荷物、大量の荷物も保管可</td>
              <td>大きな荷物、大量の荷物も保管可</td>
            </tr>
            <tr>
              <MeritTableTbodyTd>距離</MeritTableTbodyTd>
              <td>最寄りのスペースを探せる</td>
              <td>指定場所のみ対応（郊外が中心）</td>
            </tr>
            <tr>
              <MeritTableTbodyTd>保険</MeritTableTbodyTd>
              <td>荷物保険込みの料金(三井住友海上)</td>
              <td>業者によって様々</td>
            </tr>
            <tr>
              <MeritTableTbodyTd>手続き</MeritTableTbodyTd>
              <td>一切不要</td>
              <td>必要</td>
            </tr>
          </tbody>
        </MeritTable>
      </MeritWrap>
      <BusinessmodelWrap>
        <SectionTitle>モノオクの仕組み</SectionTitle>
        <BusinessmodelWrapFigure class="businessmodel">
          <img alt="モノオクのビジネスモデル" src={ImageBusinessmodel} />
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
        <PickupSpaceItem>
          <div class="basic">
            <PickupSpaceImageWrap>
              <img src={ImagePickupSpace1} alt="スペース1" />
              <PickupSpaceImagePrice>
                5,000
                <Yen>円〜</Yen>
              </PickupSpaceImagePrice>
            </PickupSpaceImageWrap>
            <PickupSpaceDesc>
              <PickupSpaceDescLocation>
                <span>部屋情報</span>
                <PickupSpaceDescDl>
                  <PickupSpaceDescDt>最寄駅</PickupSpaceDescDt>
                  <PickupSpaceDescDd>西川口駅</PickupSpaceDescDd>
                  <PickupSpaceDescDt>徒歩</PickupSpaceDescDt>
                  <PickupSpaceDescDd>2分</PickupSpaceDescDd>
                  <PickupSpaceDescDt>タイプ</PickupSpaceDescDt>
                  <PickupSpaceDescDd>部屋</PickupSpaceDescDd>
                </PickupSpaceDescDl>
              </PickupSpaceDescLocation>
              <span className="sp-more">プランをみる</span>

              <div className="backage">
                <span>荷物情報</span>
                <PickupSpaceDescDl>
                  <PickupSpaceDescDt>対応荷物</PickupSpaceDescDt>
                  <PickupSpaceDescDd>家具・家電</PickupSpaceDescDd>
                  <PickupSpaceDescDt>受取方法</PickupSpaceDescDt>
                  <PickupSpaceDescDd>配送/対面</PickupSpaceDescDd>
                </PickupSpaceDescDl>
                <PickupSpaceDescHostWrap>
                  <PickupSpaceDescHostImage src={ImagePickupSpace1Host} alt="ホストアイコン1" />
                  <PickupSpaceDescHostName>ithurricaneさん</PickupSpaceDescHostName>
                </PickupSpaceDescHostWrap>
              </div>
            </PickupSpaceDesc>
          </div>
          <div className="plan-outer">
            <PickupSpacePlanUl>
              <PickupSpacePlanLi>
                <PickupSpacePlanLiLink
                  href="https://monooq.com/space/2278"
                  target="_blank"
                  rel="follow"
                >
                  1/4程度のスペースの月額料金
                  <PickupSpacePlanLiPrice>
                    5,000
                    <Yen>円</Yen>
                    <PickupSpacePlanLiSmallButton>詳細をみる</PickupSpacePlanLiSmallButton>
                  </PickupSpacePlanLiPrice>
                </PickupSpacePlanLiLink>
              </PickupSpacePlanLi>
              <PickupSpacePlanLi>
                <PickupSpacePlanLiLink
                  href="https://monooq.com/space/2278"
                  target="_blank"
                  rel="follow"
                >
                  半分のスペースの月額料金
                  <PickupSpacePlanLiPrice>
                    10,000
                    <Yen>円</Yen>
                    <PickupSpacePlanLiSmallButton className="small-btn">
                      詳細をみる
                    </PickupSpacePlanLiSmallButton>
                  </PickupSpacePlanLiPrice>
                </PickupSpacePlanLiLink>
              </PickupSpacePlanLi>
              <PickupSpacePlanLi>
                <PickupSpacePlanLiLink
                  href="https://monooq.com/space/2278"
                  target="_blank"
                  rel="follow"
                >
                  全てのスペースの月額料金
                  <PickupSpacePlanLiPrice>
                    18,000
                    <Yen>円</Yen>
                    <PickupSpacePlanLiSmallButton className="small-btn">
                      詳細をみる
                    </PickupSpacePlanLiSmallButton>
                  </PickupSpacePlanLiPrice>
                </PickupSpacePlanLiLink>
              </PickupSpacePlanLi>
            </PickupSpacePlanUl>
          </div>
        </PickupSpaceItem>

        {/* <div class="space-item 02">
          <div class="basic">
            <div class="space-image">
              <img class="lazyload" alt="スペース02" src="../wp-content/themes/jin-child03/img/dummy.jpg" data-src="https://tidy.monooq.com/wp-content/uploads/2019/01/space02.jpg" />
              <span class="about-price">5,000<span class="yen">円〜</span></span>
            </div>
            <div class="desc">
              <div class="location">
                <span>部屋情報</span>
                <dl>
                  <dt>最寄駅</dt>
                  <dd>成瀬駅</dd>
                  <dt>徒歩</dt>
                  <dd>5分</dd>
                  <dt>タイプ</dt>
                  <dd>部屋</dd>
                </dl>
              </div>
              <span class="sp-more">プランをみる</span>
              <div class="backage">
                <span>荷物情報</span>
                <dl>
                  <dt>対応荷物</dt>
                  <dd>家具・家電</dd>
                  <dt>受取方法</dt>
                  <dd>配送/対面</dd>
                </dl>
                <div class="host">
                  <img alt="ホストアイコン02" class="host-icon" src="../wp-content/uploads/2019/01/host02-1.jpg" />
                  <span>もかさん</span>
                </div>
              </div>
            </div>
          </div>
          <div class="plan-outer">
            <ul class="plan">
              <li>
                <a href="https://monooq.com/space/2203" target="_blank" rel="follow">
                  1/4程度のスペースの月額料金<span class="price">5,000<span class="yen">円</span><span class="small-btn">詳細をみる</span></span></a></li>
              <li>
                <a href="https://monooq.com/space/2203" target="_blank" rel="follow">
                  半分のスペースの月額料金<span class="price">10,000<span class="yen">円</span><span class="small-btn">詳細をみる</span></span>
                </a>
              </li>
              <li>
                <a href="https://monooq.com/space/2203" target="_blank" rel="follow">
                  全てのスペースの月額料金<span class="price">20,000<span class="yen">円</span><span class="small-btn">詳細をみる</span></span>
                </a>
              </li>
            </ul>
          </div>
        </div> */}

        {/* <div class="space-item 03">
          <div class="basic">
            <div class="space-image">
              <img class="lazyload" alt="スペース03" src="../wp-content/themes/jin-child03/img/dummy.jpg" data-src="https://tidy.monooq.com/wp-content/uploads/2019/01/img_space-syun.jpg" />
              <span class="about-price">3,000<span class="yen">円〜</span></span>
            </div>
            <div class="desc">
              <div class="location">
                <span>部屋情報</span>
                <dl>
                  <dt>最寄駅</dt>
                  <dd>東北沢駅</dd>
                  <dt>徒歩</dt>
                  <dd>2分</dd>
                  <dt>タイプ</dt>
                  <dd>部屋</dd>
                </dl>
              </div>
              <span class="sp-more">プランをみる</span>
              <div class="backage">
                <span>荷物情報</span>
                <dl>
                  <dt>対応荷物</dt>
                  <dd>家具・家電</dd>
                  <dt>受取方法</dt>
                  <dd>配送/対面</dd>
                </dl>
                <div class="host">
                  <img
                    alt="ホストアイコン03"
                    class="host-icon"
                    src="../wp-content/uploads/2019/08/sample_user.jpg"
                  />
                  <span>Syunさん</span>
                </div>
              </div>
            </div>
          </div>
          <div class="plan-outer">
            <ul class="plan">
              <li>
                <a href="https://monooq.com/space/2412" target="_blank" rel="follow">
                  1/4程度のスペースの月額料金<span class="price">3,000<span class="yen">円</span><span class="small-btn">詳細をみる</span></span>
                </a>
              </li>
              <li>
                <a href="https://monooq.com/space/2412" target="_blank" rel="follow">
                  半分のスペースの月額料金<span class="price">6,000<span class="yen">円</span><span class="small-btn">詳細をみる</span></span>
                </a>
              </li>
              <li>
                <a href="https://monooq.com/space/2412" target="_blank" rel="follow">
                  全てのスペースの月額料金<span class="price">10,000<span class="yen">円</span><span class="small-btn">詳細をみる</span></span>
                </a>
              </li>
            </ul>
          </div>
        </div> */}
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

      <ContentContainer>
        <QuestionsContainer>
          <Headline>よくある質問</Headline>
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
      </ContentContainer>
    </WhenIUseContainer>
  </Wrap>
);
