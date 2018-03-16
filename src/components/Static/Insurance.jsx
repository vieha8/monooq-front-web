import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Footer } from 'components/Shared';

const DefaultContainer = styled.div`
  padding: 0 116px;
  ${media.phone`
    padding: 0 8vw;
  `};
`;

const MainTitle = styled.div`
  font-size: 34px;
  line-height: 51px;
  margin-bottom: 44px;
  ${media.phone`
    font-size: 32px;
  `};
`;

const SubTitle = styled.div`
  font-size: 30px;
  line-height: 45px;
  margin-bottom: 45px;
  ${media.phone`
    font-size: 28px;
    line-height: 40px;
  `};
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 32px;
`;

const List = styled.li`
  font-size: 16px;
  line-height: 32px;
`;

const ListWrapper = styled.div`
  margin-bottom: 30px;
`;

const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: #DBDBDB;
  margin: 50px 0;
  ${media.phone`
    margin: 20px 0;
  `};
`;

const MainTitleContainer = DefaultContainer.extend`
  margin-top: 80px;
  ${media.phone`
    margin-top: 40px;
  `};
`;

const WhySafeContainer = DefaultContainer.extend`
`;

const WhySafeContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const WhySafeContent = (props) => {
  const Label = styled.div`
    height: 60px;
    font-size: 22px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  const Text = styled.div`
    height: 54%;
    font-size: 16px;
    line-height: 32px;
    margin-bottom: 30px;
    ${media.phone`
      height: auto;
    `};
  `;
  return (
    <div className={props.className}>
      <Label>
        <span className="fa-layers fa-fw fa-2x" style={{marginRight: '20px',fontSize: '60px'}}>
          <i className="fas fa-circle" style={{ color: '#E85258' }} />
          <i className="far fa-bookmark" style={{ color: '#fff' }} data-fa-transform="shrink-6" />
        </span>
        <span>{props.label}</span>
      </Label>
      <Text>{props.text}</Text>
    </div>
  );
}

const StyledWhySafeContent = styled(WhySafeContent)`
  width: 32%;
  font-weight: 100;
  ${media.phone`
    width: 100%;
    margin-bottom: 30px;
  `};
`;

const HowSafeContainer = DefaultContainer.extend`
`;

const HowSafeContentWrapper = styled.div`
`;

const HowSafeContent = (props) => {
  const Image = styled.img`
    width: 246px;
    border-radius: 123px;
    ${media.phone`
      margin-bottom: 23px;
    `};
  `;
  const Wrapper = styled.div`
    width: 688px;
  `;

  const Label = styled.div`
    font-size: 22px;
    line-height: 32px;
    margin-bottom: 23px;
  `;

  return (
    <div className={props.className}>
      <Image src={props.image} />
      <Wrapper>
        <Label>{props.label}</Label>
        <Text>{props.text}</Text>
      </Wrapper>
    </div>
  );
}

const StyledHowSafeContent = styled(HowSafeContent)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
  ${media.phone`
    justify-content: center;
  `};
`;

const WhenAttentionContainer = DefaultContainer.extend`
`;

const WhenAttentionHilightText = styled.div`
  font-size: 22px;
  line-height: 32px;
  margin-bottom: 23px;
`;

const QuestionContainer = DefaultContainer.extend`
  margin-bottom: 110px;
`;

const QuestionWrapper = styled.div`
  margin-bottom: 50px;
`;

const QuestionTitle = styled.div`
  font-size: 22px;
  line-height: 32px;
  margin-bottom: 23px;
`;

export default props => (
  <Fragment>
    <MainTitleContainer>
      <MainTitle>荷物に対する保険</MainTitle>
    </MainTitleContainer>

    <WhySafeContainer>
      <SubTitle>もしもの時も大丈夫。</SubTitle>
      <WhySafeContentWrapper>
        {
          [
            {
              label: '最大10万円の保証',
              text: 'モノオクでは、あなたの荷物やホストをお守りするために保証制度をご用意しています。もしも、破損や・・・',
            },
            {
              label: 'すべての取引に対応',
              text: 'モノオクでは、あなたの荷物やホストをお守りするために保証制度をご用意しています。もしも、破損や・・・',
            },
            {
              label: 'ホストも安心',
              text: 'モノオクでは、あなたの荷物やホストをお守りするために保証制度をご用意しています。もしも、破損や・・・',
            },
          ].map((v,i)=>{
            return (
              <StyledWhySafeContent
                label={v.label}
                text={v.text}
                key={i}
              />
            );
          })
        }
      </WhySafeContentWrapper>

      <Hr />
    </WhySafeContainer>

    <HowSafeContainer>
      <SubTitle>安心して取引をするために。</SubTitle>
      <HowSafeContentWrapper>
        {
          [
            {
              image: 'http://placehold.jp/246x246.png',
              label: 'ユーザーは何をすれば良い？',
              text: 'しっかりと荷物の内容と写真をメッセージに残しましょう。もしも事故が起こってしまった場合にスムーズな対応を行うためです。もし事前に連絡をしていない荷物をスペースに置こうとしたら、ホストに受け入れを断られてしまったり、保証の対象となりません。',
            },
            {
              image: 'http://placehold.jp/246x246.png',
              label: 'ホストは何をすれば良い？',
              text: 'しっかりと荷物の内容と写真をメッセージに残しましょう。もしも事故が起こってしまった場合にスムーズな対応を行うためです。もし事前に連絡をしていない荷物をスペースに置こうとしたら、ホストに受け入れを断られてしまったり、保証の対象となりません。',
            },
            {
              image: 'http://placehold.jp/246x246.png',
              label: '気持ちの良い取引をするには？',
              text: 'しっかりと荷物の内容と写真をメッセージに残しましょう。もしも事故が起こってしまった場合にスムーズな対応を行うためです。もし事前に連絡をしていない荷物をスペースに置こうとしたら、ホストに受け入れを断られてしまったり、保証の対象となりません。',
            },
          ].map((v,i)=>{
            return (
              <StyledHowSafeContent
                image={v.image}
                label={v.label}
                text={v.text}
                key={i}
              />
            );
          })
        }
      </HowSafeContentWrapper>
    </HowSafeContainer>

    <WhenAttentionContainer>
      <SubTitle>こんな場合もご注意を。</SubTitle>
      <WhenAttentionHilightText>以下のサービス利用上の注意が守られていない場合は、一切の保証を行うことができません。</WhenAttentionHilightText>
      <List>モノオクに掲載されていないスペースに置いた荷物の場合。</List>
      <List>ホスト登録した本人が管理していない荷物の場合。</List>
      <List>メッセージ上で記録に残っていない、ホストが把握していない荷物の場合。</List>

      <Hr />
    </WhenAttentionContainer>

    <QuestionContainer>
      <SubTitle>よくある質問</SubTitle>

      <QuestionWrapper>
        <QuestionTitle>保証の適用範囲は？</QuestionTitle>
        <Text>受託者賠償責任保険が適応され・・・</Text>
      </QuestionWrapper>

      <QuestionWrapper>
        <QuestionTitle>保証対象外の荷物は？</QuestionTitle>
        <ListWrapper>
          <List>サービス内で確認が不可能な荷物の場合。</List>
          <List>モノオクで定める取引ができない荷物ページに記載された違反の荷物の場合。</List>
        </ListWrapper>
        <Text>受託者賠償責任保険が適応され受託者賠償責任保険が適応され・・・</Text>
      </QuestionWrapper>

      <QuestionWrapper>
        <QuestionTitle>緊急なトラブルの時は？</QuestionTitle>
        <Text>受託者賠償責任保険が適応され・・・</Text>
      </QuestionWrapper>
    </QuestionContainer>

    <Footer />
  </Fragment>
);
