import React from 'react';
import styled from 'styled-components';
import { Input, Icon } from 'semantic-ui-react';
import Button from 'components/Shared/Button';
import { Colors, FontSizes, Dimens } from 'variables';
import logoUri from 'images/monooq_logo_mark.svg';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';

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

const LinkTextWrapper = styled.div`
  display: inline-block;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.black};
  margin-top: ${Dimens.medium}px;
  line-height: 1.6;
`;

const LinkText = styled.a`
  display: inline;
  color: ${Colors.linkBlue};
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
  color: ${Colors.darkGray1};
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
          name="email"
          placeholder="example@monooq.com"
          icon="envelope"
          iconPosition="left"
          fluid
          value={props.email}
          onChange={props.handleChangeText}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="password"
          name="password"
          placeholder="パスワード"
          icon="unlock"
          iconPosition="left"
          fluid
          value={props.password}
          onChange={props.handleChangeText}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="パスワードを再入力"
          icon="unlock alternate"
          iconPosition="left"
          fluid
          value={props.passwordConfirm}
          onChange={props.handleChangeText}
        />
      </InputWrapper>
    </InputContainer>
    <LinkTextWrapper>
      <LinkText href={Path.terms()}>利用規約</LinkText>と
      <LinkText href={Path.privacy()}>プライバシーポリシー</LinkText>に同意の上、<br />次へボタンを押してください。
    </LinkTextWrapper>
    <ButtonWrapper>
      <Button
        bgColor={Colors.brandPrimary}
        fluid
        onClick={props.onClickSignUpEmail}
      >
        次へ
      </Button>
    </ButtonWrapper>
    <ButtonWrapper>
      <OtherLoginLabel>お持ちのアカウントで登録</OtherLoginLabel>
      <Button
        bgColor={Colors.facebook}
        fluid
        onClick={props.onClickSignUpFacebook}
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
