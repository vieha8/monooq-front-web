import React, { Fragment } from 'react';
import Path from 'config/path';

import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import DefaultContainer from 'components/atomic/containers/DefaultContainer';
import Footer from 'components/atomic/LV2/Footer';

import insuranceImage1 from 'images/insurance-img01.svg';
import insuranceImage2 from 'images/insurance-img02.svg';
import insuranceImage3 from 'images/insurance-img03.svg';

const MainTitle = styled.div`
  font-size: ${FontSizes.xlarge}px;
  line-height: ${FontSizes.xlarge * 1.5}px;
  margin-bottom: 40px;
  ${media.phone`
    font-size: 7.5vw;
    line-height: ${7.5 * 1.5}vw;
  `};
`;

const SubTitle = styled.div`
  font-size: ${FontSizes.large}px;
  line-height: ${FontSizes.large}px;
  margin-bottom: 45px;
  ${media.phone`
    font-size: 6.5vw;
    line-height: ${6.5 * 1.5}vw;
    margin-bottom: 20px;
  `};
`;

const Text = styled.div`
  font-size: ${FontSizes.medium}px;
  line-height: ${FontSizes.medium * 2}px;
  ${media.phone`
    font-size: 5vw;
    line-height: 7.5vw;
  `};
`;

const List = Text.withComponent('li');

const ListWrapper = styled.div`
  margin-bottom: 30px;
`;

const Hr = styled.hr`
  border: 0;
  height: 1px;
  width: 100%;
  background-color: ${Colors.lightGray2};
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

const WhySafeContainer = DefaultContainer.extend``;

const WhySafeContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const WhySafeContent = props => {
  const ContentContainer = styled.div`
    width: 32%;
    ${media.phone`
      width: 100%;
      margin-bottom: 40px;
    `};
  `;
  const Label = styled.div`
    height: 60px;
    font-size: ${FontSizes.medium2}px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  `;
  const IconWrapper = styled.span`
    && {
      margin-left: -10px;
      margin-right: 10px;
      font-size: 60px;
    }
    ${media.phone`
      && {
        margin-left: -6px;
        margin-right: 4px;
        font-size: 50px;
      }
    `};
  `;
  const CircleIcon = styled.i`
    && {
      color: ${Colors.brandPrimary};
    }
  `;
  const BookmarkIcon = styled.i`
    && {
      color: ${Colors.white};
    }
  `;
  const LabelText = styled.span`
    ${media.phone`
      font-size: 6vw;
      line-height: ${6 * 1.5}vw;
    `};
  `;
  return (
    <ContentContainer>
      <Label>
        <IconWrapper className="fa-layers fa-fw fa-2x">
          <CircleIcon className="fas fa-circle" />
          <BookmarkIcon className="far fa-bookmark" data-fa-transform="shrink-6" />
        </IconWrapper>
        <LabelText>{props.label}</LabelText>
      </Label>
      <Text>{props.text}</Text>
    </ContentContainer>
  );
};

const HowSafeContainer = DefaultContainer.extend``;

const HowSafeContentWrapper = styled.div``;

const Label = styled.div`
  font-size: ${FontSizes.medium2}px;
  line-height: ${FontSizes.medium2 * 1.5}px;
  margin-bottom: 20px;
`;

const HowSafeContent = props => {
  const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 50px;
    ${media.phone`
      justify-content: center;
    `};
  `;
  const Image = styled.img`
    width: 246px;
    border-radius: 50%;
    ${media.phone`
      margin-bottom: 23px;
    `};
  `;
  const Wrapper = styled.div`
    width: 688px;
  `;

  const StyledLabel = styled(Label)`
    ${media.phone`
      font-size: 6vw;
      line-height: ${6 * 1.5}vw;
      margin-bottom: 10px;
    `};
  `;

  return (
    <ContentContainer>
      <Image src={props.image} />
      <Wrapper>
        <StyledLabel>{props.label}</StyledLabel>
        <Text>{props.text}</Text>
      </Wrapper>
    </ContentContainer>
  );
};

const WhenAttentionContainer = DefaultContainer.extend``;

const WhenAttentionHilightText = styled(Label)`
  ${media.phone`
    font-size: 5vw;
    line-height: ${5 * 1.5}vw;
  `};
`;

const QuestionContainer = DefaultContainer.extend`
  margin-bottom: 110px;
`;

const QuestionWrapper = styled.div`
  margin-bottom: 50px;
`;

const QuestionTitle = styled(Label)`
  ${media.phone`
    font-size: 6vw;
    line-height: ${6 * 1.5}vw;
    margin-bottom: 10px;
  `};
`;

export default props => (
  <Fragment>
    <MainTitleContainer>
      <MainTitle>荷物に対する保険</MainTitle>
    </MainTitleContainer>

    <WhySafeContainer>
      <SubTitle>もしもの時も大丈夫。三井住友海上と協力し、安心サポート。</SubTitle>
      <WhySafeContentWrapper>
        {[
          {
            label: '最大10万円の保証',
            text:
              'モノオクでは、あなたの荷物やホストをお守りするために保証制度をご用意しています。もしも、破損・紛失・盗難などが起きてしまった場合には、最大10万円（免責金額3,000円）までの補償を提供しています。',
          },
          {
            label: 'すべての取引に対応',
            text:
              'モノオクのサービス内で成立したスペースを利用する、すべての取引に自動的に適用されます。保険料のお支払いは必要ありません。',
          },
          {
            label: 'ホストも安心',
            text:
              'スペースに置いてある荷物に予期せぬ事故や災害があった場合、ホストが荷物の保険を申請することができます。',
          },
        ].map((v, i) => (
          <WhySafeContent label={v.label} text={v.text} key={i} />
        ))}
      </WhySafeContentWrapper>

      <Hr />
    </WhySafeContainer>

    <HowSafeContainer>
      <SubTitle>安心して取引をするために。</SubTitle>
      <HowSafeContentWrapper>
        {[
          {
            image: insuranceImage1,
            label: 'ユーザーは何をすれば良い？',
            text:
              'しっかりと荷物の内容と写真をメッセージに残しましょう。何かが起こった場合にスムーズな対応を行うためです。もし事前に連絡をしていない荷物はホストに受け入れを断られてしまったり、保証の対象となりません。',
          },
          {
            image: insuranceImage2,
            label: 'ホストは何をすれば良い？',
            text:
              '荷物の受け取りが完了したら、すべての荷物とスペース状況を写真に残しましょう。そして相手にメッセージで送信してください。もしも何かが起こった際に、発生した時期や内容を特定する参考として必要です。',
          },
          {
            image: insuranceImage3,
            label: '気持ちの良い取引をするには？',
            text:
              'ユーザーもホストも荷物の内容やスペースに関して、事前にしっかりと確認しましょう。当日になって「思っていたのと内容が違う」なんてことはトラブルの原因です。お互いが気持ち良くサービスを使えるようなコミュニケーションを。',
          },
        ].map((v, i) => (
          <HowSafeContent image={v.image} label={v.label} text={v.text} key={i} />
        ))}
      </HowSafeContentWrapper>
    </HowSafeContainer>

    <WhenAttentionContainer>
      <SubTitle>こんな場合もご注意を。</SubTitle>
      <WhenAttentionHilightText>
        以下のサービス利用上の注意が守られていない場合は、一切の保証を行うことができません。
      </WhenAttentionHilightText>
      <List>メッセージ上で記録に残っていない、ホストが把握していない荷物の場合。</List>
      <List>モノオクに登録していないスペースに置いた荷物の場合。</List>
      <List>スペース登録をした本人が管理していない場合。</List>

      <Hr />
    </WhenAttentionContainer>

    <QuestionContainer>
      <SubTitle>よくある質問</SubTitle>

      <QuestionWrapper>
        <QuestionTitle>保証の適用範囲は？</QuestionTitle>
        <Text>
          受託者賠償責任保険が適応され、モノオクで取引・決済を行ったスペースへ置いた荷物に対して最大10万円（免責金額
          3,000円）までの補償を提供しています。
        </Text>
      </QuestionWrapper>

      <QuestionWrapper>
        <QuestionTitle>保証対象外の荷物は？</QuestionTitle>
        <ListWrapper>
          <List>サービス内で確認が不可能な荷物の場合。</List>
          <List>
            モノオクで定める
            <a href={`${Path.rule()}#not-allowed`}>「取引ができない荷物」</a>
            に記載された違反の荷物の場合。
          </List>
        </ListWrapper>
        <Text>これらに対しては保証対象外となります。</Text>
      </QuestionWrapper>

      <QuestionWrapper>
        <QuestionTitle>緊急なトラブルの時は？</QuestionTitle>
        <Text>
          もしも緊急のトラブルが発生した場合は、警察・消防など所轄窓口に通報してください。その上でモノオクカスタマーサポートまでご連絡ください。
        </Text>
      </QuestionWrapper>
    </QuestionContainer>

    <Footer />
  </Fragment>
);
