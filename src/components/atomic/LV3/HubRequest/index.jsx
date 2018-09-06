import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Height as HeaderHeight } from 'components/atomic/LV3/Header';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens, FontSizes } from 'variables';

import bgInTrouble from 'images/bg_in_trouble.png';
import inTroubleWoman from 'images/in_trouble_woman.png';
import popupUnder from 'images/popup_under.png';
import serviceHub from 'images/service_hub.jpg';
import tStep1 from 'images/t_step1.png';
import tStep2 from 'images/t_step2.png';
import tStep3 from 'images/t_step3.png';
import detailStep1 from 'images/img_step1_detail.png';
import detailStep2 from 'images/img_step2_detail.png';
import detailStep3 from 'images/img_step3_detail.png';
import borderUp from 'images/border_up2.png';
import qaQ from 'images/qa_q.png';
import qaA from 'images/qa_a.png';

import Title from './Title';
import Form from './Form';

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

const HubVisualContainer = styled.div`
  position: relative;
  height: 822px;
  color: ${Colors.black};
  text-align: center;
  ${media.phone`
    height: auto;
  `};
`;

const HubVisualContent = styled.div`
  width: ${Dimens.fixedWidthPc}px;
  margin: 0 auto;
  padding: 0 ${Dimens.medium}px;
  text-align: center;
  ${media.phone`
    width: 100%;
  `};
`;

const HubVisualSubTitle = styled.p`
  padding: 30px 0 30px;
  font-size: ${FontSizes.custom1large}px;
  font-weight: 900;
  color: ${Colors.black};
  ${media.phone`
    padding: 20px 0 20px;
    font-size: ${FontSizes.medium}px;
  `};
`;

const HubVisualText = styled.p`
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

const SquareBottomBlue = styled.div`
  position: absolute;
  bottom: -25px;
  left: 50%;
  width: 75px;
  height: 75px;
  margin-left: -35px;
  background-color: ${Colors.lightBlue};
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
  background-color: ${Colors.lightBlue};
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
  margin: 0 auto 30px;
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
  ${media.phone`
    font-size: ${FontSizes.small}px;
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
  width: 31%;
  padding: 25px 0;
  text-align: center;
  float: left;
  border: 1px solid;
  margin: auto 10px;
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
    font-size: ${FontSizes.medium}px;
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
    padding: 12px 0;
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
      <HubVisualContainer>
        <HubVisualContent>
          <HubVisualSubTitle>そんなお悩みはモノオクハブにお任せ</HubVisualSubTitle>
          <ImageContainer>
            <Image src={serviceHub} alt="" />
          </ImageContainer>
          <HubVisualText>
            モノオクハブはあなたのお荷物をモノオクが一時的にお預かりし、最適なホストにお繋ぎすることでスピーディーにお荷物の保管を実現いたします。
          </HubVisualText>
        </HubVisualContent>
        <SquareBottom />
      </HubVisualContainer>
      <StepContainer>
        <StepContent>
          <SubTitlePoint>モノオクハブかんたん 3STEP</SubTitlePoint>
          <StepDetail>
            <StepIcon1 />
            <StepDetailTop>
              <StepDetailTopLeft>
                <Image src={detailStep1} alt="" />
              </StepDetailTopLeft>
              <StepDetailTopRight>
                <StepDetailTitle>スタッフに相談</StepDetailTitle>
                <StepDetailDesctiption>
                  下記フォームより、お荷物の情報などをご入力ください。
                </StepDetailDesctiption>
              </StepDetailTopRight>
            </StepDetailTop>
            <StepDetailMiddle>
              <Image src={borderUp} alt="" />
            </StepDetailMiddle>
            <StepDtailBottom>
              <StepDetailTitle>モノオクスタッフからご連絡</StepDetailTitle>
              <StepDetailDesctiption>
                ご入力いただいた情報から料金をお見積もりし、ご連絡いたします。
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
                <StepDetailTitle>お荷物の配送</StepDetailTitle>
                <StepDetailDesctiption>
                  配送先の住所をご連絡いたします。
                  <br />
                  配送方法などはお気軽にご相談ください。
                </StepDetailDesctiption>
              </StepDetailTopRight>
            </StepDetailTop>
            <StepDetailMiddle>
              <Image src={borderUp} alt="" />
            </StepDetailMiddle>
            <StepDtailBottom>
              <StepDetailTitle>モノオクがお荷物を一時的にお預かり</StepDetailTitle>
              <StepDetailDesctiption>
                モノオクが一時的にお荷物をお預かりします。
                <br />
                同時にお荷物をお預かりできるスペースをモノオクがピックアップ！
              </StepDetailDesctiption>
            </StepDtailBottom>
          </StepDetail>
          <StepDetail>
            <StepIcon3 />
            <StepDetailTop>
              <StepDetailTopLeft>
                <Image src={detailStep3} alt="" />
              </StepDetailTopLeft>
              <StepDetailTopRight>
                <StepDetailTitle>お荷物を保管するスペースをご紹介</StepDetailTitle>
                <StepDetailDesctiption>
                  実際にお荷物を保管するスペースが決定したら、
                  <br />
                  どんなスペース（ホスト）かご紹介します。
                </StepDetailDesctiption>
              </StepDetailTopRight>
            </StepDetailTop>
            <StepDetailMiddle>
              <Image src={borderUp} alt="" />
            </StepDetailMiddle>
            <StepDtailBottom>
              <StepDetailTitle>スペースでお荷物を保管</StepDetailTitle>
              <StepDetailDesctiption>
                決定したスペースでお荷物を保管いたします。スペースへの配送はモノオクが行いますのでご安心ください。
              </StepDetailDesctiption>
            </StepDtailBottom>
          </StepDetail>
        </StepContent>
        <SquareBottomBlue />
      </StepContainer>
      <PriceContainer>
        <PriceContent>
          <SubTitlePoint>ご利用料金</SubTitlePoint>
          <PriceContentList>
            <PriceListItem>
              <PriceListItemTitle>初期費用</PriceListItemTitle>
              <PriceListItemDesctiption>
                0<PriceListItemDesctiptionSmall>円</PriceListItemDesctiptionSmall>
              </PriceListItemDesctiption>
            </PriceListItem>
            <PriceListItem>
              <PriceListItemTitle>月額費用</PriceListItemTitle>
              <PriceListItemDesctiption>
                7,000
                <PriceListItemDesctiptionSmall>円/畳</PriceListItemDesctiptionSmall>
              </PriceListItemDesctiption>
            </PriceListItem>
            <PriceListItem>
              <PriceListItemTitle>ホストへの送料</PriceListItemTitle>
              <PriceListItemDesctiption>無料</PriceListItemDesctiption>
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
                <QText>対応エリアはどちらでしょうか？</QText>
              </QContent>
              <AContent>
                <QaImage src={qaA} alt="" />
                <AText>
                  現在の受け入れ可能なスペースは東京都世田谷区のみとなります。
                  <br />
                  順次エリアを拡大予定です。
                </AText>
              </AContent>
            </QaListItem>
          </QaContentWrap>
          <QaContentWrap>
            <QaListItem>
              <QContent>
                <QaImage src={qaQ} alt="" />
                <QText>スペースはどのくらいの広さでしょうか？</QText>
              </QContent>
              <AContent>
                <QaImage src={qaA} alt="" />
                <AText>
                  1畳以上のサイズからご利用可能です。
                  <br />
                  1畳未満のお荷物を預ける場合でも最低1畳分の料金が発生いたします。
                </AText>
              </AContent>
            </QaListItem>
          </QaContentWrap>
          <QaContentWrap>
            <QaListItem>
              <QContent>
                <QaImage src={qaQ} alt="" />
                <QText>利用期間の上限や下限はありますか？</QText>
              </QContent>
              <AContent>
                <QaImage src={qaA} alt="" />
                <AText>
                  上限はございません。預け入れ後にホストの方とご相談くださいませ。
                  <br />
                  下限については、3か月（90日）以上とさせていただきます。
                </AText>
              </AContent>
            </QaListItem>
          </QaContentWrap>
          <QaContentWrap>
            <QaListItem>
              <QContent>
                <QaImage src={qaQ} alt="" />
                <QText>荷物は小さなものや大きなものでも預けられますか？</QText>
              </QContent>
              <AContent>
                <QaImage src={qaA} alt="" />
                <AText>
                  幅1.2m、奥行1.8m、高さ1.2mの荷台に積載でき、合計で350kg未満の物量であれば対応が可能です。
                  <br />
                  縦30cm、横45cm、高さ35cmの段ボールだと30箱程度積載できます。
                  これを超える場合には、配送が複数回となり、回数分の配送料が必要となります。
                </AText>
              </AContent>
            </QaListItem>
          </QaContentWrap>
          <QaContentWrap>
            <QaListItem>
              <QContent>
                <QaImage src={qaQ} alt="" />
                <QText>配送料は誰が負担するのでしょうか？</QText>
              </QContent>
              <AContent>
                <QaImage src={qaA} alt="" />
                <AText>
                  モノオクハブに配送する際とホストから返送してもらう場合の送料はお客様負担となります。
                  <br />
                  モノオクハブからホストへの配送はモノオクが負担いたします。
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
