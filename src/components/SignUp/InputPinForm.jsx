import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import Button from 'components/Shared/Button';
import { Colors, FontSizes, Dimens } from 'variables';
import logoUri from 'images/monooq_logo_mark.svg';
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

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

const Title = styled.div`
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium2}px;
  margin-top: ${Dimens.medium}px;
`;

const InputContainer = styled.div`
  margin-top: ${Dimens.medium3}px;
`;

const InputWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const CaptionText = styled.div`
  margin-top: ${Dimens.medium2}px;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.darkGray1};
  text-align: center;
  line-height: 1.5;
`;

const HelpText = styled.div`
  margin-top: ${Dimens.medium3}px;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.darkGray1};
`;

export default props => (
  <Container>
    <Logo src={logoUri} />
    <Title>PINコードを入力</Title>
    <CaptionText>SMSで届いた4ケタのPINコードを入力し、<br />本人確認ボタンを押してください。</CaptionText>
    <InputContainer>
      <InputWrapper>
        <Input
          placeholder="4桁の番号を入力"
          fluid
          value={props.phone}
          onChange={props.handleChangePin}
        />
      </InputWrapper>
    </InputContainer>
    <ButtonWrapper>
      <Button
        bgColor={Colors.brandPrimary}
        fluid
        onClick={props.onClickAuthTel}
      >
        本人確認
      </Button>
    </ButtonWrapper>
    <HelpText>SMSメッセージが届きませんか？</HelpText>
    <ButtonWrapper>
      <Button
        basic
        bgColor={Colors.white}
        fontColor={Colors.darkGray1}
        fluid
        onClick={props.onClickReSendSMS}
      >
        SMSを再送する
      </Button>
    </ButtonWrapper>
    <ButtonWrapper>
      <Button
        basic
        bgColor={Colors.white}
        fontColor={Colors.darkGray1}
        fluid
        onClick={props.onClickCallToPin}
      >
        音声通話でPINコードを確認する
      </Button>
    </ButtonWrapper>
  </Container>
);
