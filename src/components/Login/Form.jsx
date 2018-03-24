import React from 'react';
import styled from 'styled-components';
import { Input, Icon } from 'semantic-ui-react';
import Button from 'components/Shared/Button';
import { Colors, FontSizes, Dimens } from 'variables';
import logoUri from 'images/monooq_logo_mark.svg';
import { media } from 'helpers/style/media-query';
import { Link } from 'react-router-dom';
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

const LinkTet = styled(Link)`
  display: block;
  font-size: ${FontSizes.small}px;
  color: ${Colors.linkBlue};
  margin-top: ${Dimens.medium}px;
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
  border-top: 1px solid ${Colors.borderGray};
`;

export default props => (
  <Container>
    <Logo src={logoUri} />
    <Title>ログインする</Title>
    <InputContainer>
      <InputWrapper>
        <Input
          type="email"
          placeholder="example@monooq.com"
          icon="envelope"
          iconPosition="left"
          fluid
          onChange={props.handleChangeEmail}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="password"
          placeholder="パスワード"
          icon="lock"
          iconPosition="left"
          fluid
          onChange={props.handleChangePassword}
        />
      </InputWrapper>
    </InputContainer>
    {props.error && <ErrorText errors={['ユーザー名またはパスワードに誤りがあります。']} />}
    <LinkText to="/password/reset">パスワードを忘れた方はこちら</LinkText>
    <ButtonWrapper>
      <Button
        onClick={props.onClickLoginEmail}
        loading={props.isLoginProcessing}
        disabled={props.buttonDisabled}
      >
        ログインする
      </Button>
    </ButtonWrapper>
    <ButtonWrapper>
      <OtherLoginLabel>お持ちのアカウントでログイン</OtherLoginLabel>
      <Button
        onClick={props.onClickLoginFacebook}
        loading={props.isLoginProcessing}
        facebook
      >
        <IconWrapper>
          <Icon name="facebook square" />
        </IconWrapper>
        Facebookでログインする
      </Button>
    </ButtonWrapper>
    <ToSignUpLinkCointainer>
      <LinkText to="/signup">初めてのご利用ですか？新規登録はこちら</LinkText>
    </ToSignUpLinkCointainer>
  </Container>
);
