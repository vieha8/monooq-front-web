import React, { Fragment } from 'react';
import styled from 'styled-components';
import ImageSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontSizes, Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Collapsible from 'react-collapsible';
import Path from 'config/path';
import Meta from 'components/LV1/Meta';
import ContainerDefault from 'components/LV1/ContainerDefault';
import ButtonCaption from 'components/LV2/Forms/ButtonCaption';
import ExampleSpaceList from 'components/LV2/Lists/ExampleSpaceList';
import ImageHero from 'images/lp1host/fv-bg.jpeg';
import ImageWoman from 'images/lp1host/fv-woman.png';
import ImageWhatMonooq from 'images/lp1host/what-monooq.jpg';
import ImageWhatBg from 'images/lp1host/what-bg.png';
import ImageSpace1 from 'images/lp1host/space-1.jpg';
import ImageSpace2 from 'images/lp1host/space-2.jpg';
import ImageSpace3 from 'images/lp1host/space-3.jpg';
import ImageSpace4 from 'images/lp1host/space-4.jpg';
import ImageSpace5 from 'images/lp1host/space-5.jpg';
import ImageSpace6 from 'images/lp1host/space-6.jpg';
import ImageSpace7 from 'images/lp1host/space-7.jpg';
import ImageSpace8 from 'images/lp1host/space-8.jpg';
import ImageSpace9 from 'images/lp1host/space-9.jpg';
import ImageSpace10 from 'images/lp1host/space-10.jpg';
import ImageExample1 from 'images/lp1host/example-1.jpg';
import ImageExample2 from 'images/lp1host/example-2.jpg';
import ImageExample3 from 'images/lp1host/example-3.jpg';
import ImageFlow1 from 'images/lp1host/flow-1.png';
import ImageFlow2 from 'images/lp1host/flow-2.png';
import ImageFlow3 from 'images/lp1host/flow-3.png';
import ImageFlow4 from 'images/lp1host/flow-4.png';
import ImageFlow5 from 'images/lp1host/flow-5.png';
import ImageFlow6 from 'images/lp1host/flow-6.png';
import ImageFlow7 from 'images/lp1host/flow-7.png';
import ImageFlow8 from 'images/lp1host/flow-8.png';
import ImageFlow9 from 'images/lp1host/flow-9.png';
import ImageFlow10 from 'images/lp1host/flow-10.png';

const Wrap = styled.div`
  min-width: 320px;
  margin-top: -84px;
`;

const TopWrap = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  color: ${Colors.black};
  overflow: hidden;
  background-color: ${Colors.darkGray1};
  background-image: url(${ImageHero});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.2);
  background-blend-mode: lighten;
  &::before {
    content: '';
    position: absolute;
    right: 5%;
    bottom: 0;
    width: 500px;
    height: inherit;
    background-image: url(${ImageWoman});
    background-size: contain;
    background-position: bottom right;
    background-repeat: no-repeat;
  }
  ${media.tablet`
    height: 500px;
    overflow: hidden;
    &::before {
      right: -50px;
      width: 350px;
    }
  `};
  ${media.phone`
    &::before {
      right: -200px;
      width: 500px;
    }
  `};
`;

const TopMessageContent = styled.div`
  position: absolute;
  left: 9%;
  top: 30%;
  width: 100%;
  text-align: center;
  ${media.tablet`
    left: 0px;
    top: 170px;
    margin: auto;
    padding: 0 ${Dimens.medium}px;
  `};
`;

const TopTitle = styled.h1`
  margin-bottom: ${Dimens.medium_20}px;
  text-align: left;
  ${media.phone`
    text-align: center;
    margin-bottom: ${Dimens.medium4_50}px;
  `};
`;

const TopTitleRow = styled.span`
  display: block;
  font-size: ${FontSizes.xxlarge_42}px;
  font-weight: bold;
  line-height: 1.4em;
  ${props =>
    props.small &&
    `
      font-size: ${FontSizes.medium1_22}px;
      font-weight: normal;
      margin-bottom: ${Dimens.small_10}px;
  `};

  ${media.tablet`
    font-size: ${FontSizes.medium3}px;
    ${props =>
      props.small &&
      `
        font-size: ${FontSizes.medium1}px;
    `};
  `};
`;

const BrOnlySP = styled.br`
  display: none;
  ${media.phone`
    display: block;
  `};
`;

const ButtonCaptionWrap = styled.div`
  max-width: 320px;
  ${media.phone`
    margin: auto;
  `};
`;

const SectionTitle = styled.span`
  position: relative;
  display: block;
  font-size: ${FontSizes.large}px;
  font-weight: bold;
  text-align: center;
  margin-top: 0.7em;
  margin-bottom: 1em;
  ${media.phone`
    font-size: ${FontSizes.medium1}px;
  `};
`;

const CatchPhraseWrap = styled.div`
  position: relative;
  background-color: ${Colors.brandPrimary};
  margin: ${Dimens.small_10}px auto ${Dimens.medium_20}px;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  color: ${Colors.white};
`;

const CatchPhraseText = styled.span`
  display: block;
  font-size: ${FontSizes.large}px;
  line-height: normal;
  text-align: center;
  padding: 2em;
  ${media.tablet`
    font-size: ${FontSizes.medium2}px;
    padding: 1.5em;
  `};
  ${media.phone`
    font-size: ${FontSizes.medium_18}px;
  `};
`;

const BusinessmodelWrap = styled.div`
  position: relative;
  background-image: url(${ImageWhatBg});
  background-size: 200px 200px;
  background-position: top left;
  background-repeat: repeat;
  padding: ${Dimens.medium4_50}px ${Dimens.medium}px;
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
  font-size: ${FontSizes.medium1}px;
  font-weight: normal;
  line-height: 2em;
`;

const ExampleWrap = styled.div`
  position: relative;
  max-width: 900px;
  margin: auto;
  padding: ${Dimens.medium4_50}px 0;
  ${media.tablet`
    padding: ${Dimens.medium2}px ${Dimens.medium}px;
  `};
`;

const TypeWrap = styled.div`
  position: relative;
  margin: auto;
  padding: ${Dimens.medium4_50}px ${Dimens.medium}px;
  background-color: ${Colors.lightGray9};
  &::before {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
    border-color: ${Colors.brandPrimary} transparent transparent transparent;
  }
`;

const TypeUl = styled.ul`
  max-width: 900px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  ${media.tablet`
    flex-wrap: wrap;
  `};
`;

const TypeLi = styled.li`
  padding: 0 ${Dimens.xxsmall_5}px;
  line-height: 1.7em;
  overflow: hidden;
`;

const TypeLiInner = styled.div`
  background-color: ${Colors.white};
  border-radius: 6px;
`;

const TypeLiImg = styled.img`
  display: block;
  width: 100%;
  border-radius: 6px 6px 0 0;
`;

const TypeLiText = styled.span`
  display: block;
  text-align: center;
  font-size: ${FontSizes.medium}px;
  padding: ${Dimens.small2_14}px 0;
  ${media.phone`
    font-size: ${FontSizes.small}px;
  `};
`;

const ContentsWrap = styled(ContainerDefault)`
  position: relative;
  max-width: 100%;
  text-align: center;
  padding: 0px;
`;

const FlowWrap = styled.div`
  position: relative;
  margin: auto;
  padding: ${Dimens.medium4_50}px ${Dimens.medium}px;
  &::before {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
    border-color: ${Colors.brandPrimary} transparent transparent transparent;
  }
`;

const FlowUl = styled.ul`
  max-width: 900px;
  margin: auto;
  padding: 0 ${Dimens.medium}px;
  display: flex;
  flex-wrap: wrap;
`;

const FlowLi = styled.li`
  display: inline-block;
  width: calc(33% - ${Dimens.small_9}px);
  padding: 0 ${Dimens.xxsmall_5}px;
  line-height: 1.7em;
  text-align: left;
  overflow: hidden;
  box-sizing: border-box;
  ${media.tablet`
    width: calc(50% - ${Dimens.small_10}px);
  `};
`;

const FlowLiImg = styled.img`
  display: block;
  width: 100%;
  border: 5px solid ${Colors.borderGray};
`;

const FlowLiInner = styled.div`
  background-color: ${Colors.white};
`;

const FlowLiText = styled.span`
  display: block;
  text-align: center;
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
  padding: ${Dimens.small2_14}px 0 ${Dimens.medium1_28}px;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
    padding: ${Dimens.small2_14}px 0 ${Dimens.medium_20}px;
  `};
`;

const QaWrap = styled.div`
  position: relative;
  background-color: ${Colors.lightGray9};
  padding: ${Dimens.medium4_50}px 0;
  margin-bottom: -${Dimens.medium3_45}px;
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

function getTypeList(list) {
  return (
    <Fragment>
      <ImageSlider
        dots={false}
        arrows={false}
        autoplay
        autoplaySpeed={0}
        speed={5000}
        cssEase="linear"
        slidesToShow={4}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2,
            },
          },
        ]}
      >
        {list &&
          list.map((item, i) => (
            <TypeLi key={i.toString()}>
              <TypeLiInner>
                <TypeLiImg src={item.image} alt={item.alt} />
                <TypeLiText>{item.text}</TypeLiText>
              </TypeLiInner>
            </TypeLi>
          ))}
      </ImageSlider>
    </Fragment>
  );
}

function getFlowList(list) {
  return (
    <Fragment>
      <ImageSlider
        className="custom-arrow-1"
        infinite={false}
        dots={false}
        arrows
        cssEase="linear"
        slidesToShow={3}
        responsive={[
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2,
            },
          },
        ]}
      >
        {list &&
          list.map((item, i) => (
            <FlowLi key={i.toString()}>
              <FlowLiInner>
                <FlowLiImg src={item.image} alt={item.alt} />
                <FlowLiText>{item.text}</FlowLiText>
              </FlowLiInner>
            </FlowLi>
          ))}
      </ImageSlider>
    </Fragment>
  );
}

function getQaList(list) {
  return (
    <Fragment>
      {list &&
        list.map((item, i) => (
          <QuestionItem key={i.toString()}>
            <Collapsible trigger={item.question}>
              <Answer>{item.answer}</Answer>
            </Collapsible>
          </QuestionItem>
        ))}
    </Fragment>
  );
}

export default () => (
  <Wrap>
    <Meta
      title="毎月3万円の副収入が得られる!?空きスペースに荷物を置くだけの簡単副業「モノオク」"
      noindex
    />

    <TopWrap>
      <TopMessageContent>
        <TopTitle itemProp="headline">
          <TopTitleRow small>毎月3万円の副収入が得られる!?</TopTitleRow>
          <TopTitleRow>
            空きスペースに
            <BrOnlySP />
            荷物を置くだけの
          </TopTitleRow>
          <TopTitleRow>簡単副業「モノオク」</TopTitleRow>
        </TopTitle>
        <ButtonCaptionWrap>
          <ButtonCaption caption="無料" text="今すぐ登録する" link href={Path.signUp()} isNoArrow />
        </ButtonCaptionWrap>
      </TopMessageContent>
    </TopWrap>

    <ContentsWrap>
      <BusinessmodelWrap>
        <SectionTitle>モノオクとは？</SectionTitle>
        <BusinessmodelWrapFigure>
          <BusinessmodelWrapFigureImage src={ImageWhatMonooq} alt="img-businessmodel" />
          <BusinessmodelWrapFigcaption>
            モノオクは「荷物を預けたい人」と「荷物を保管したい人」を繋ぐサービスです。
            <br />
            自宅の空きスペースを貸し出すだけで収入を得ることができます。
            <br />
            いま、専門知識やスキルが必要ない、簡単にできる副業としてTVでも注目されているサービスです。
          </BusinessmodelWrapFigcaption>
        </BusinessmodelWrapFigure>
      </BusinessmodelWrap>
      <CatchPhraseWrap>
        <CatchPhraseText>例えばこんなスペースが収入に!?</CatchPhraseText>
      </CatchPhraseWrap>
      <TypeWrap>
        <TypeUl>
          {getTypeList([
            {
              image: ImageSpace1,
              alt: 'img-space-1',
              text: '空き部屋',
            },
            {
              image: ImageSpace2,
              alt: 'img-space-2',
              text: '部屋の一角',
            },
            {
              image: ImageSpace3,
              alt: 'img-space-3',
              text: '押入れ',
            },
            {
              image: ImageSpace4,
              alt: 'img-space-4',
              text: '物置・屋外倉庫',
            },
            {
              image: ImageSpace5,
              alt: 'img-space-5',
              text: '物置・屋外倉庫',
            },
            {
              image: ImageSpace6,
              alt: 'img-space-6',
              text: '物置・屋外倉庫',
            },
            {
              image: ImageSpace7,
              alt: 'img-space-7',
              text: '空き部屋',
            },
            {
              image: ImageSpace8,
              alt: 'img-space-8',
              text: '空き部屋',
            },
            {
              image: ImageSpace9,
              alt: 'img-space-9',
              text: '空き部屋',
            },
            {
              image: ImageSpace10,
              alt: 'img-space-10',
              text: '部屋の一角',
            },
          ])}
        </TypeUl>
      </TypeWrap>
      <ExampleWrap>
        <SectionTitle>
          こうやって副収入を
          <BrOnlySP />
          得てる人がいます
        </SectionTitle>
        <ExampleSpaceList
          list={[
            {
              spaceImage: ImageExample1,
              spaceImageAlt: 'img-example-1',
              spaceAddress: '千葉県市川市',
              spacePrice: '96,000',
              spacePriceDtail: '40,000円×3ヶ月−手数料',
              examplePriceMonth: '40,000',
              exampleSpace: '6畳(部屋3畳 + 押入れ3畳)',
              exampleTerm: '3ヶ月',
              exampleItem: '引っ越しに伴う荷物',
              exampleItemDetail:
                '一人暮らし用の小さめの洗濯機、冷蔵庫、電子レンジ、トースター、炊飯器、テレビ、組み立て式のベッド、ソファ、棚、本棚、ダンボールがいくつか',
            },
            {
              spaceImage: ImageExample2,
              spaceImageAlt: 'img-example-2',
              spaceAddress: '東京都世田谷区',
              spacePrice: '32,000',
              spacePriceDtail: '10,000円×4ヶ月−手数料',
              examplePriceMonth: '10,000',
              exampleSpace: '2畳',
              exampleTerm: '4ヶ月',
              exampleItem: '海外就学に伴う単身荷物',
              exampleItemDetail: '布団、衣装タンス、スーツケース(衣装入り)、本、他ダンボール',
            },
            {
              spaceImage: ImageExample3,
              spaceImageAlt: 'img-example-3',
              spaceAddress: '大阪府大阪市',
              spacePrice: '24,000',
              spacePriceDtail: '3,000円×10ヶ月−手数料',
              examplePriceMonth: '3,000',
              exampleSpace: '1畳',
              exampleTerm: '10ヶ月',
              exampleItem: '趣味用品',
              exampleItemDetail: 'グッズ',
            },
          ]}
        />
      </ExampleWrap>
      <FlowWrap>
        <SectionTitle>ご利用方法</SectionTitle>
        <FlowUl>
          {getFlowList([
            {
              image: ImageFlow1,
              alt: 'img-flow-1',
              text: '新規登録ページへ',
            },
            {
              image: ImageFlow2,
              alt: 'img-flow-2',
              text: 'プロフィール情報の入力',
            },
            {
              image: ImageFlow3,
              alt: 'img-flow-3',
              text: '「貸す・借りる」を選択',
            },
            {
              image: ImageFlow4,
              alt: 'img-flow-4',
              text: 'スペースの新規登録',
            },
            {
              image: ImageFlow5,
              alt: 'img-flow-5',
              text: 'スペースの基本情報を入力',
            },
            {
              image: ImageFlow6,
              alt: 'img-flow-6',
              text: '預かれる荷物を入力',
            },
            {
              image: ImageFlow7,
              alt: 'img-flow-7',
              text: '荷物の受取り方を選択',
            },
            {
              image: ImageFlow8,
              alt: 'img-flow-8',
              text: '料金を設定',
            },
            {
              image: ImageFlow9,
              alt: 'img-flow-9',
              text: 'プレビュー画面の確認',
            },
            {
              image: ImageFlow10,
              alt: 'img-flow-10',
              text: 'スペース公開完了',
            },
          ])}
        </FlowUl>
      </FlowWrap>
      <QaWrap>
        <SectionTitle>よくある質問</SectionTitle>
        <QuestionsContainer>
          {getQaList([
            {
              question: 'Q. どのような荷物を預かることが多いのでしょうか？',
              answer:
                '引越し時の荷物、リフォーム時の荷物、季節のレジャー品、仕事道具、衣替え時の衣類、趣味の道具などがご利用ケースとしては多いです。',
            },
            {
              question: 'Q. どのようなスペースを登録しても良いのでしょうか？',
              answer:
                '空き部屋、部屋の一角、物置・屋外倉庫、押入れ・クローゼットが主な対象スペースです。無人スペース、法人スペース、古い、汚れのある部屋、電気がないスペースなども実績がございます。',
            },
            {
              question: 'Q. どのくらいの料金設定がおすすめですか？',
              answer:
                '5,000円～7,000円を推奨しております。地域によって変わりますが、一般的なトランクルームの半額～7割にあたる料金設定です。',
            },
            {
              question: 'Q. 荷物が破損、紛失等のトラブルが起きた際にはどうすれば良いでしょうか？',
              answer:
                'モノオクでは、あなたの荷物をお守りするために補償制度をご用意しています。万が一、破損・紛失・盗難などが起きてしまった場合には、最大10万円までの補償を提供しています。まずはモノオクのカスタマーセンターまでご連絡ください。なお、モノオクの決済を通さずに直接連絡を取り合ってお取引された場合は補償外となります。',
            },
            {
              question: 'Q. 荷物の受け渡しはどのようにすればよいでしょうか？',
              answer: (
                <Fragment>
                  荷物の配送は、原則依頼主が手配します。下記のような配送手段があり、取引中に受け渡し方法を相談することができます。
                  <br />
                  1.ヤマト運輸などの一般的な配送サービス
                  <br />
                  2.直接運ぶ
                  <br />
                  3.提携の配送サービス（PickGo）の利用
                </Fragment>
              ),
            },
            {
              question: 'Q. どうして20%の手数料を取られるのでしょうか？',
              answer:
                'モノオクは、皆さまのご協力を得てサービスを運営しております。補償などの付帯サービスも20%の中からご提供しております。より良いサービスをご提供させていただくため、何卒ご理解いただけますと幸いです。',
            },
          ])}
        </QuestionsContainer>
      </QaWrap>
    </ContentsWrap>
  </Wrap>
);
