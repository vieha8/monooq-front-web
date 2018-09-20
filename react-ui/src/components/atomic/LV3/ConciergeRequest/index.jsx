import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import bgInTrouble from 'images/bg_in_trouble.png';
import inTroubleWoman from 'images/in_trouble_woman.png';
import popupUnder from 'images/popup_under.png';
import serviceConcierge from 'images/service_concierge.png';
import tStep1 from 'images/t_step1.png';
import tStep2 from 'images/t_step2.png';
import tStep3 from 'images/t_step3.png';
import detailStep1 from 'images/img_step1_detail.png';
import detailStep2 from 'images/img_step2_detail.png';
import detailStep3 from 'images/img_step3_detail.png';
import borderUp from 'images/border_up2.png';
import qaQ from 'images/qa_q.png';
import qaA from 'images/qa_a.png';
import { Height as HeaderHeight } from 'components/atomic/LV3/Header';

import Form from './Form';
import Title from './Title';

const MainContainer = styled.div`
  min-width: ${Dimens.fixedWidthPc + 32}px;
  padding-top: ${HeaderHeight}px;
  margin-bottom: 40px;
  ${media.phone`
    min-width: auto;
  `};
`;

const InTroubleContainer = styled.div`
  height: 822px;
  background-image: url(${bgInTrouble});
  background-size: cover;
  background-repeat: no-repeat;
  color: ${Colors.white};
  text-align: center;
  ${media.phone`
    height: auto;
    background-position: 60% 0;
  `};
`;

const InTroubleContent = styled.div`
  width: ${Dimens.fixedWidthPc}px;
  margin: 0 auto;
  padding: 0 ${Dimens.medium}px;
  text-align: center;
  ${media.phone`
    width: 100%;
  `};
`;

const SubTitle = styled.p`
  padding: 160px 0 110px;
  font-size: ${FontSizes.custom1large}px;
  font-weight: 900;
  color: ${Colors.black};
  ${media.phone`
    padding: 60px 0 40px;
    font-size: ${FontSizes.medium}px;
  `};
`;

const Image = styled.img`
  width: 100%;
`;

const ImageContainer = styled.div`
  display: block;
  width: 100%;
  text-align: center;
  ${media.phone`
    width: 100%;
  `};
`;

const ConciergeVisualContainer = styled.div`
  position: relative;
  color: ${Colors.black};
  text-align: center;
  ${media.phone`
    height: auto;
  `};
`;

const ConciergeVisualContent = styled.div`
  width: ${Dimens.fixedWidthPc}px;
  margin: 0 auto;
  padding: 0 ${Dimens.medium}px;
  text-align: center;
  ${media.phone`
    width: 100%;
  `};
`;

const ConciergeVisualSubTitle = styled.p`
  padding: 30px 0 30px;
  font-size: ${FontSizes.medium2}px;
  font-weight: 900;
  color: ${Colors.black};
  ${media.phone`
    padding: 20px 0 20px;
    font-size: 15px;
  `};
`;

const ConciergeVisualText = styled.p`
  padding: 30px 50px 70px;
  font-size: ${FontSizes.medium2}px;
  font-weight: 500;
  color: ${Colors.black};
  line-height: 40px;
  text-align: left;
  ${media.phone`
    padding: 20px 20px 40px;
    font-size: ${FontSizes.medium}px;
    line-height: 24px;
  `};
`;

const SquareBottom = styled.div`
  position: absolute;
  bottom: -25px;
  left: 50%;
  width: 75px;
  height: 75px;
  margin-left: -35px;
  background-color: ${Colors.white};
  transform: rotate(45deg);
  z-index: 1;
  ${media.phone`
    width: 35px;
    height: 35px;
    margin-left: -17.5px;
    bottom: -15px;
  `};
`;

const SquareBottomPink = styled.div`
  position: absolute;
  bottom: -25px;
  left: 50%;
  width: 75px;
  height: 75px;
  margin-left: -35px;
  background-color: ${Colors.lightPink};
  transform: rotate(45deg);
  z-index: 1;
  ${media.phone`
    width: 35px;
    height: 35px;
    margin-left: -17.5px;
    bottom: -15px;
  `};
`;

// height: 822px;
const StepContainer = styled.div`
  position: relative;
  display: flex;
  padding: 90px;
  color: ${Colors.black};
  background-color: ${Colors.lightPink};
  ${media.phone`
    padding: 30px 0px 25px;
  `};
`;

const StepContent = styled.div`
  width: ${Dimens.fixedWidthPc}px;
  margin: 0 auto;
  padding: 0 ${Dimens.medium}px;
  text-align: center;
  ${media.phone`
    width: 100%;
  `};
`;

const SubTitlePoint = styled.div`
  padding: 30px 0 30px;
  font-size: ${FontSizes.medium2}px;
  font-weight: 900;
  color: ${Colors.black};
  ${media.phone`
    padding: 20px 0 20px;
    font-size: ${FontSizes.medium}px;
  `};
`;

const StepDetail = styled.div`
  position: relative;
  width: 800px;
  margin: 0 auto 15px;
  padding: 0 ${Dimens.medium}px ${Dimens.medium2}px;
  text-align: left;
  background-color: ${Colors.white};
  ${media.phone`
    width: 100%;
    padding: 0 ${Dimens.medium}px 20px;
  `};
`;

const StepIcon1 = styled.span`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 100px;
  height: 100px;
  background-image: url(${tStep1});
  background-repeat: no-repeat;
  background-size: center;
  -webkit-background-size: cover;
  background-size: cover;
  ${media.phone`
    width: 50px;
    height: 50px;
  `};
`;

const StepIcon2 = styled.span`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 100px;
  height: 100px;
  background-image: url(${tStep2});
  background-repeat: no-repeat;
  background-size: center;
  -webkit-background-size: cover;
  background-size: cover;
  ${media.phone`
    width: 50px;
    height: 50px;
  `};
`;

const StepIcon3 = styled.span`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 100px;
  height: 100px;
  background-image: url(${tStep3});
  background-repeat: no-repeat;
  background-size: center;
  -webkit-background-size: cover;
  background-size: cover;
  ${media.phone`
    width: 50px;
    height: 50px;
  `};
`;

const StepDetailTop = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 20px 0px;
  text-align: center;
  background-color: ${Colors.white};
  overflow: hidden;
  ${media.phone`
    padding: 10px 0px 0px;
  `};
`;

const StepDetailTopLeft = styled.div`
  width: 30%;
  text-align: left;
  float: left;
  background-color: ${Colors.darkGray2};
`;

const StepDetailTopRight = styled.div`
  width: 70%;
  padding: 5px ${Dimens.medium1}px;
  text-align: left;
  float: left;
  ${media.phone`
    padding: 3px 22px 3px 12px;
  `};
`;

const StepDetailTitle = styled.div`
  font-size: ${FontSizes.medium2}px;
  font-weight: 900;
  margin-bottom: ${Dimens.medium}px;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
    margin-bottom: ${Dimens.small}px;
  `};
`;

const StepDetailDesctiption = styled.div`
  font-size: ${FontSizes.medium1}px;
  line-height: 30px;
  ${media.phone`
    font-size: ${FontSizes.small}px;
    line-height: 20px;
  `};
`;

const StepDetailMiddle = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto 30px;
  ${media.phone`
    margin: 10px auto 20px;
  `};
`;

const StepDtailBottom = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 650px;
  ${media.phone`
    width: 100%;
  `};
`;

const PriceContainer = styled.div`
  color: ${Colors.black};
  text-align: center;
  ${media.phone`
    height: auto;
    background-position: 60% 0;
  `};
`;

const PriceContent = styled.div`
  width: ${Dimens.fixedWidthPc}px;
  margin: 0 auto;
  padding: 50px 0;
  text-align: center;
  ${media.phone`
    width: 100%;
    padding: 30px 0 25px;
  `};
`;

const PriceContentList = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 20px 0px;
  text-align: center;
  background-color: ${Colors.white};
  overflow: hidden;
  ${media.phone`
    padding: 0px ${Dimens.medium}px;
  `};
`;

const PriceListItem = styled.div`
  width: 40%;
  padding: 25px 0;
  text-align: center;
  border: 1px solid;
  margin: auto;
  ${media.phone`
    width: 100%;
    padding: 25px 0;
    margin: 5px auto;
  `};
`;

const PriceListItemTitle = styled.span`
  font-size: ${FontSizes.medium2}px;
  font-weight: 900;
  margin-bottom: ${Dimens.medium}px;
  display: block;
  ${media.phone`
    font-size: ${FontSizes.medium1}px;
    font-weight: 500;
    margin-bottom: ${Dimens.small}px;
    display: inline;
  `};
`;

const PriceListItemDesctiption = styled.span`
  font-size: ${FontSizes.custom2large}px;
  font-weight: 900;
  ${media.phone`
    font-size: 42px;
    margin-left: ${Dimens.medium}px;
  `};
`;

const PriceListItemDesctiptionSmall = styled.span`
  font-size: ${FontSizes.medium2}px;
  font-weight: 900;
  margin-left: 5px;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
  `};
`;

const QaContainer = styled.div`
  color: ${Colors.black};
  text-align: center;
  ${media.phone`
    height: auto;
    background-position: 60% 0;
  `};
`;

const QaContent = styled.div`
  width: ${Dimens.fixedWidthPc}px;
  margin: 0 auto;
  padding: 0 0 50px;
  text-align: center;
  ${media.phone`
    width: 100%;
    padding: 0px 0 25px;
  `};
`;

const QaContentWrap = styled.div`
  width: 100%;
  max-width: 900px;
  margin: ${FontSizes.medium}px auto;
  padding: 0px;
  text-align: center;
  background-color: ${Colors.white};
  overflow: hidden;
  border: solid 1px ${Colors.black};
  border-radius: 5px;
  ${media.phone`
    width: 90%;
  `};
`;

const QaListItem = styled.div`
  width: 100%;
  text-align: center;
`;

const QContent = styled.div`
  width: 100%;
  padding: 0;
  text-align: left;
  float: left;
  color: ${Colors.white};
  font-size: ${FontSizes.medium2}px;
  background-color: ${Colors.lightGray3};
  ${media.phone`
    width: 100%;
  `};
`;

const AContent = styled.div`
  width: 100%;
  padding: 25px 0;
  text-align: left;
  float: left;
  color: ${Colors.black};
  font-size: ${FontSizes.medium2}px;
  background-color: ${Colors.white};
  ${media.phone`
    width: 100%;
    padding: 25px 0;
    margin: 5px auto;
  `};
`;

const QText = styled.div`
  width: 90%;
  padding: 20px 0;
  text-align: left;
  float: left;
  color: ${Colors.white};
  font-size: ${FontSizes.medium2}px;
  line-height: 35px;
  ${media.phone`
    width: 80%;
    font-size: ${FontSizes.medium}px;
    line-height: 20px;
  `};
`;

const AText = styled.div`
  width: 90%;
  padding: 5px 0;
  text-align: left;
  float: left;
  color: ${Colors.black};
  font-size: ${FontSizes.medium2}px;
  line-height: 35px;
  ${media.phone`
    width: 80%;
    font-size: ${FontSizes.medium}px;
    line-height: 20px;
    padding: 5px 5px 5px 0px;
  `};
`;

const QaImage = styled.img`
  width: 20%;
  max-width: 80px;
  padding: 10px ${Dimens.medium}px;
  vertical-align: middle;
  float: left;
  ${media.phone`
    padding: 10px;
  `};
`;

export default props => (
  <Fragment>
    <MainContainer>
      <Title />
      <InTroubleContainer>
        <InTroubleContent>
          <SubTitle>こんなことでお困りではありませんか？</SubTitle>
          <ImageContainer>
            <Image src={inTroubleWoman} alt="" />
          </ImageContainer>
        </InTroubleContent>
        <ImageContainer>
          <Image src={popupUnder} alt="" />
        </ImageContainer>
      </InTroubleContainer>
      <ConciergeVisualContainer>
        <ConciergeVisualContent>
          <ConciergeVisualSubTitle>
            そんなお悩みはモノオクコンシェルジュにお任せ
          </ConciergeVisualSubTitle>
          <ImageContainer>
            <Image src={serviceConcierge} alt="" />
          </ImageContainer>
          <ConciergeVisualText>
            モノオクコンシェルジュはあなたのお荷物の保管スペース探しをモノオクスタッフがお手伝いするサービスです。
          </ConciergeVisualText>
        </ConciergeVisualContent>
        <SquareBottom />
      </ConciergeVisualContainer>
      <StepContainer>
        <StepContent>
          <SubTitlePoint>モノオクコンシェルジュかんたん 3STEP</SubTitlePoint>
          <StepDetail>
            <StepIcon1 />
            <StepDetailTop>
              <StepDetailTopLeft>
                <Image src={detailStep1} alt="" />
              </StepDetailTopLeft>
              <StepDetailTopRight>
                <StepDetailTitle>コンシェルジュに相談</StepDetailTitle>
                <StepDetailDesctiption>
                  下記フォームより、お荷物の情報などをご入力ください。
                </StepDetailDesctiption>
              </StepDetailTopRight>
            </StepDetailTop>
            <StepDetailMiddle>
              <Image src={borderUp} alt="" />
            </StepDetailMiddle>
            <StepDtailBottom>
              <StepDetailTitle>スペースのご案内</StepDetailTitle>
              <StepDetailDesctiption>
                モノオクスタッフが情報をもとに、あなたに合ったスペースをご案内いたします。
              </StepDetailDesctiption>
            </StepDtailBottom>
          </StepDetail>
          <StepDetail>
            <StepIcon2 />
            <StepDetailTop>
              <StepDetailTopLeft>
                <Image src={detailStep2} alt="" />
              </StepDetailTopLeft>
              <StepDetailTopRight>
                <StepDetailTitle>ホストへ連絡</StepDetailTitle>
                <StepDetailDesctiption>
                  モノオクスタッフから案内のあったホストに預けたい荷物の情報などを連絡しましょう。
                </StepDetailDesctiption>
              </StepDetailTopRight>
            </StepDetailTop>
          </StepDetail>
          <StepDetail>
            <StepIcon3 />
            <StepDetailTop>
              <StepDetailTopLeft>
                <Image src={detailStep3} alt="" />
              </StepDetailTopLeft>
              <StepDetailTopRight>
                <StepDetailTitle>日時の調整</StepDetailTitle>
                <StepDetailDesctiption>
                  ホストにお荷物を預ける日時や配送方法などの希望を相談しましょう。
                </StepDetailDesctiption>
              </StepDetailTopRight>
            </StepDetailTop>
          </StepDetail>
        </StepContent>
        <SquareBottomPink />
      </StepContainer>
      <PriceContainer>
        <PriceContent>
          <SubTitlePoint>ご利用料金</SubTitlePoint>
          <PriceContentList>
            <PriceListItem>
              <PriceListItemTitle>相談料</PriceListItemTitle>
              <PriceListItemDesctiption>
                0<PriceListItemDesctiptionSmall>円</PriceListItemDesctiptionSmall>
              </PriceListItemDesctiption>
            </PriceListItem>
          </PriceContentList>
        </PriceContent>
        <ImageContainer>
          <Image src={popupUnder} alt="" />
        </ImageContainer>
      </PriceContainer>
      <QaContainer>
        <QaContent>
          <SubTitlePoint>よくある質問</SubTitlePoint>
          <QaContentWrap>
            <QaListItem>
              <QContent>
                <QaImage src={qaQ} alt="" />
                <QText>どんなスペースを紹介してもらえますか？</QText>
              </QContent>
              <AContent>
                <QaImage src={qaA} alt="" />
                <AText>
                  お荷物のサイズやお客様住所からの近さなどの条件から最適なスペースをご紹介します。
                </AText>
              </AContent>
            </QaListItem>
          </QaContentWrap>
          <QaContentWrap>
            <QaListItem>
              <QContent>
                <QaImage src={qaQ} alt="" />
                <QText>相談に料金はかかりますか？</QText>
              </QContent>
              <AContent>
                <QaImage src={qaA} alt="" />
                <AText>
                  ご相談いただく際に料金は発生いたしません。
                  <br />
                  通常のご利用と同様に、実際にスペースに荷物を預ける際の料金のみ発生いたします。
                </AText>
              </AContent>
            </QaListItem>
          </QaContentWrap>
        </QaContent>
      </QaContainer>
      <Form {...props} />
    </MainContainer>
  </Fragment>
);
