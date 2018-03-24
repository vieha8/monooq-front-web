import React from 'react';
import styled from 'styled-components';
import { Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Button from 'components/Shared/Button';
import { Colors, FontSizes, Dimens } from 'variables';
import logoUri from 'images/monooq_logo_mark.svg';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';
import ErrorText from 'components/Shared/ErrorText';

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
  font-size: ${FontSizes.small}px;
  color: ${Colors.black};
  margin-top: ${Dimens.medium}px;
  line-height: 1.5;
`;

const LinkText = styled(Link)`
  display: inline;
  font-size: ${FontSizes.small}px;
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
  font-size: ${FontSizes.small}px;
  color: ${Colors.darkGray1};
`;

const ToSignUpLinkCointainer = styled.div`
  margin-top: ${Dimens.medium}px;
  padding-top: ${Dimens.medium}px;
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
          onChange={(_, e) => props.handleChangeEmail(e.value)}
        />
      </InputWrapper>
      {props.errors.email && <ErrorText errors={props.errors.email} />}
      <InputWrapper>
        <Input
          type="password"
          name="password"
          placeholder="パスワード"
          icon="unlock"
          iconPosition="left"
          fluid
          onChange={(_, e) => props.handleChangePassword(e.value)}
        />
      </InputWrapper>
      {props.errors.password && <ErrorText errors={props.errors.password} />}
      <InputWrapper>
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="パスワードを再入力"
          icon="unlock alternate"
          iconPosition="left"
          fluid
          onChange={(_, e) => props.handleChangePasswordConfirm(e.value)}
        />
      </InputWrapper>
    </InputContainer>
    {props.errors.passwordConfirm && <ErrorText errors={props.errors.passwordConfirm} />}
    <LinkTextWrapper>
      <LinkText to={Path.terms()} target="_blank" rel="noopener noreferrer">利用規約</LinkText>と
      <LinkText to={Path.privacy()} target="_blank" rel="noopener noreferrer">プライバシーポリシー</LinkText>に同意の上、<br />次へボタンを押してください。
    </LinkTextWrapper>
    {props.errors.signupFailed && <ErrorText errors={props.errors.signupFailed} />}
    <ButtonWrapper>
      <Button
        onClick={props.onClickSignUpEmail}
        disabled={props.buttonDisabled}
      >
        次へ
      </Button>
    </ButtonWrapper>
    <ButtonWrapper>
      <OtherLoginLabel>お持ちのアカウントで登録</OtherLoginLabel>
      <Button
        onClick={props.onClickSignUpFacebook}
        facebook
      >
        <IconWrapper>
          <Icon name="facebook square" />
        </IconWrapper>
        Facebookで登録
      </Button>
    </ButtonWrapper>
    <ToSignUpLinkCointainer>
      <LinkText to={Path.login()}>ログインはこちら</LinkText>
    </ToSignUpLinkCointainer>
  </Container>
);
