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
    <Title>ログインする</Title>
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
          icon="lock"
          iconPosition="left"
          fluid
          value={props.password}
          onChange={props.handleChangePassword}
        />
      </InputWrapper>
    </InputContainer>
    <LinkText href="/">パスワードを忘れた方はこちら</LinkText>
    <ButtonWrapper>
      <Button
        bgColor={Colors.pink}
        fluid
        onClick={props.onClickLoginEmail}
      >
        ログインする
      </Button>
    </ButtonWrapper>
    <ButtonWrapper>
      <OtherLoginLabel>お持ちのアカウントでログイン</OtherLoginLabel>
      <Button
        bgColor={Colors.facebook}
        fluid
        onClick={props.onClickLoginFacebook}
      >
        <IconWrapper>
          <Icon name="facebook square" />
        </IconWrapper>
        Facebookでログインする
      </Button>
    </ButtonWrapper>
    <ToSignUpLinkCointainer>
      <LinkText href="/signup">初めてのご利用ですか？新規登録はこちら</LinkText>
    </ToSignUpLinkCointainer>
  </Container>
);
