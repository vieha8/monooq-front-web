import React from 'react';
import styled from 'styled-components';
import Button from 'components/Shared/Button';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  background: ${Colors.white};
  margin: 0 auto;
  width: 420px;
  margin-top: ${Dimens.large}px;
  padding: ${Dimens.large}px;
  border-radius: 6px;
  text-align: center;
  ${media.phone`
    width: 90%;
    margin-top: ${Dimens.medium}px;
    padding: ${Dimens.large}px ${Dimens.medium}px;
  `}
`;

const Title = styled.div`
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium2}px;
`;

const ImageWrapper = styled.div`
  margin: 0 auto;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

const Content = styled.div`
  margin-top: ${Dimens.large}px;
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const WelcomeText = styled.span`
  display: block;
  font-size: ${FontSizes.xsmall}px;
  margin-top: ${Dimens.small}px;
`;

const CaptionText = styled.div`
  margin-bottom: ${Dimens.medium}px;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.darkGray1};
  text-align: left;
  line-height: 1.6;
`;

export default props => (
  <Container>
    <Title>プロフィールの登録が完了しました！</Title>
    <Content>
      <ImageWrapper>
        <Image src="http://placehold.jp/500x300.png" />
      </ImageWrapper>
      <WelcomeText>モノオクへようこそ！</WelcomeText>
      <WelcomeText>YUKI HASHIDさん</WelcomeText> {/* TODO 動的セット */}
      <ButtonWrapper>
        <CaptionText>荷物を預ける場所をお探しですか？</CaptionText>
        <Button
          bgColor={Colors.brandPrimary}
          fluid
          onClick={props.onClickGuest}
        >
          スペースを探す
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <CaptionText>誰かのお役に立てるスペースを掲載しますか？</CaptionText>
        <Button
          bgColor={Colors.white}
          fontColor={Colors.brandPrimary}
          borderColor={Colors.brandPrimary}
          fluid
          onClick={props.onClickHost}
        >
          ホストになる
        </Button>
      </ButtonWrapper>
    </Content>
  </Container>
);
