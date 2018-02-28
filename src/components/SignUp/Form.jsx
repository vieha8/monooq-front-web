import React from 'react';
import styled from 'styled-components';
import { Input, Icon } from 'semantic-ui-react';
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
  border-radius: 3px;
  text-align: center;
  ${media.phone`
    width: 90%;
    margin-top: ${Dimens.medium}px;
    padding: ${Dimens.large}px ${Dimens.medium}px;
  `}
`;

const Logo = styled.img`
`;

const Title = styled.div`
  color: ${Colors.black};
  font-size: ${FontSizes.medium2}px;
  margin-top: ${Dimens.medium}px;
`;

const InputContainer = styled.div`
  margin-top: ${Dimens.medium3}px;
`;

const InputWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const LinkText = styled.a`
  display: block;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.linkBlue};
  margin-top: ${Dimens.medium}px;
  line-height: 1.6;
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const IconWrapper = styled.div`
  display: inline-block;
`;

const OtherLoginLabel = styled.div`
  margin-bottom: ${Dimens.medium}px;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.black};
`;

const ToSignUpLinkCointainer = styled.div`
  margin-top: ${Dimens.medium}px;
  border-top: 1px solid ${Colors.borderGray};
`;

export default props => (
  <Container>
    <Logo src={logoUri} />
    <Title>登録する</Title>
    <InputContainer>
      <InputWrapper>
        <Input
          type="email"
          placeholder="example@monooq.com"
          icon="envelope"
          iconPosition="left"
          fluid
          value={props.email}
          onChange={props.handleChangeEmail}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="password"
          placeholder="パスワード"
          icon="unlock"
          iconPosition="left"
          fluid
          value={props.password}
          onChange={props.handleChangePassword}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="password"
          placeholder="パスワードを再入力"
          icon="unlock alternate"
          iconPosition="left"
          fluid
          value={props.password}
          onChange={props.handleChangePassword}
        />
      </InputWrapper>
    </InputContainer>
    <LinkText href="/">利用規約とプライバシーポリシーに同意の上、次へボタンを押してください。</LinkText>
    <ButtonWrapper>
      <Button
        bgColor={Colors.pink}
        fluid
        onClick={props.onClickLoginEmail}
      >
        次へ
      </Button>
    </ButtonWrapper>
    <ButtonWrapper>
      <OtherLoginLabel>お持ちのアカウントで登録</OtherLoginLabel>
      <Button
        bgColor={Colors.facebook}
        fluid
        onClick={props.onClickLoginFacebook}
      >
        <IconWrapper>
          <Icon name="facebook square" />
        </IconWrapper>
        Facebookで登録
      </Button>
    </ButtonWrapper>
    <ToSignUpLinkCointainer>
      <LinkText href="/login">ログインはこちら</LinkText>
    </ToSignUpLinkCointainer>
  </Container>
);
