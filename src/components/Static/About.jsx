import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Path from 'config/path';

import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import { Footer } from 'components/Shared';

const SubTitle = styled.div`
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 45px;
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 32px;
`;

const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: #DBDBDB;
  margin: 50px 0;
`;

const ForBegginnersContainer = styled.div`
  background-image: url(https://picsum.photos/1280?image=42);
  background-size: cover;
  color: #FFFFFF;
  text-align: center;
`;

const ForBegginnersTransparency = styled.div`
  min-height: 500px;
  padding: 100px 387px 116px 387px;
  height: 100%;
  background: rgba(0,0,0,0.4);
`;

const ForBegginnersTitle = styled.div`
  font-size: 34px;
  line-height: 48px;
  margin-bottom: 20px;
`;

const ForBegginnersText = styled.div`
  font-size: 28px;
  line-height: 48px;
  margin-bottom: 30px;
`;

const ForBegginnersLabelWrapper = styled.div`
  width: 434px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ForBegginnersLabel = styled.div`
  :before {
    content: "\f00c";
    font-family: "Font Awesome 5 Pro";;
    font-weight: 100;
    font-size: 16px;
    margin-right: 10px;
  }
  height: 40px;
  width: 212px;
  border-radius: 2px;
  background-color: #F1979B;
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
  text-shadow: 0 1px 6px 0 rgba(0,0,0,0.1);
  padding: 9px 0 8px 0;
  margin-bottom: 10px;
`;

const WhenIUseContainer = styled.div`
  padding: 50px 116px;
`;

const WhenIUseContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const WhenIUseContent = (props) => {
  const ContentImage = styled.img`
    width: 100%;
    height: 217px;
    margin-bottom: 7px;
  `;
  return (
    <div className={props.className}>
      <ContentImage src={props.image} />
      <Text>{props.text}</Text>
    </div>
  );
}

const StyledWhenIUseContent = styled(WhenIUseContent)`
  width: 327px;
  margin-bottom: 15px;
`;

const HowIFindContainer = styled.div`
  padding: 50px 116px;
`;

const IfIFindContainer = styled.div`
  padding: 50px 116px;
`;

const IfIFindContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const IfIFindContent = (props) => {
  const Oval = styled.div`
    height: 100px;
    width: 100px;
    border: 2px solid #E85258;
    border-radius: 50px;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,0.1);
    text-align: center;
    color: #E85258;
    padding: 30px 0;
  `;

  const LabelNumber = styled.div`
    font-size: 12px;
    font-weight: bold;
    line-height: 12px;
    text-shadow: 0 1px 6px 0 rgba(0,0,0,0.1);
    margin-bottom: 5px;
  `;

  const LabelText = styled.div`
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
    text-shadow: 0 1px 6px 0 rgba(0,0,0,0.1);
  `;

  const IfIFindContentText = Text.extend`
    width: 380px;
  `;

  return (
    <div className={props.className}>
      <Oval>
        <LabelNumber>Step.{props.number}</LabelNumber>
        <LabelText>{props.label}</LabelText>
      </Oval>
      <IfIFindContentText>{props.text}</IfIFindContentText>
    </div>
  );
}

const StyledIfIFindContent = styled(IfIFindContent)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 510px;
  margin-bottom: 30px;
`;

export default props => (
  <Fragment>
    <ForBegginnersContainer>
      <ForBegginnersTransparency>

        <ForBegginnersTitle>はじめての方へ</ForBegginnersTitle>
        <ForBegginnersText>モノオクは空きスペースを活用する、<br />物置きシェアサービスです。</ForBegginnersText>
        <ForBegginnersLabelWrapper>
          {[ '安心の料金', '面倒な手続きが不要', '拠点数が多い', '1ヶ月だけでもOK'].map((v)=>{
            return <ForBegginnersLabel>{v}</ForBegginnersLabel>;
          })}
        </ForBegginnersLabelWrapper>

      </ForBegginnersTransparency>
    </ForBegginnersContainer>

    <WhenIUseContainer>
      <SubTitle>こんな時にモノオクを使おう！</SubTitle>
      <WhenIUseContentWrapper>
        {[{
          image: 'https://picsum.photos/600?image=45',
          text: '引越しで一時的に荷物を置きたい。',
        },
        {
          image: 'https://picsum.photos/600?image=55',
          text: '自宅リフォーム中の家具を置く場所がない。',
        },
        {
          image: 'https://picsum.photos/600?image=60',
          text: '引越しで一時的に荷物を置きたい。',
        },
        {
          image: 'https://picsum.photos/600?image=70',
          text: '引越しで一時的に荷物を置きたい。',
        },
        {
          image: 'https://picsum.photos/600?image=80',
          text: 'トランクルームの代わりに。',
        },
        {
          image: 'https://picsum.photos/600?image=90',
          text: '引越しで一時的に荷物を置きたい。',
        },
      ].map((v)=>{
        return(
          <StyledWhenIUseContent
            image={v.image}
            text={v.text}
          />
        )
      })}
      </WhenIUseContentWrapper>

      <Hr />
    </WhenIUseContainer>

    <HowIFindContainer>
      <SubTitle>物置きスペースの探し方。</SubTitle>
      <Text>お住まいの地域・引っ越し予定エリア・・・</Text>

      <Hr />
    </HowIFindContainer>

    <IfIFindContainer>
      <SubTitle>物置きスペースが見つかったら。</SubTitle>
      <IfIFindContentWrapper>
        {[
          {
          label: '相談',
          text: 'スペースがみつかったら・・・。',
        },
        {
          label: '見積もり',
          text: 'スペースがみつかったら・・・。',
        },
        {
          label: 'お支払い',
          text: 'スペースがみつかったら・・・。',
        },
        {
          label: '取引成立',
          text: 'スペースがみつかったら・・・。',
        },
        {
          label: '利用開始',
          text: 'スペースがみつかったら・・・。',
        },
        {
          label: '利用終了',
          text: 'スペースがみつかったら・・・。',
        },
        {
          label: 'レビュー',
          text: 'スペースがみつかったら・・・。',
        },
      ].map((v,i)=>{
        return (
          <StyledIfIFindContent
            number={i+1}
            label={v.label}
            text={v.text}
          />
        );
      })}
      </IfIFindContentWrapper>
    </IfIFindContainer>

    <Footer />
  </Fragment>
);
