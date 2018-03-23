import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import Button from 'components/Shared/Button';
import { Colors, FontSizes, Dimens } from 'variables';
import logoUri from 'images/monooq_logo_mark.svg';
import { media } from 'helpers/style/media-query';
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

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const Message = styled.div`
  font-size: ${FontSizes.xsmall}px;
  line-height: 1.5;
  color: ${Colors.lightGray1};
  margin-top: ${Dimens.medium}px;
`;

export default props => (
  <Container>
    <Logo src={logoUri} />
    <Title>パスワードの再設定</Title>
    <InputContainer>
      <InputWrapper>
        <Input
          type="email"
          placeholder="example@monooq.com"
          icon="envelope"
          iconPosition="left"
          fluid
          value={props.email}
          onChange={(_, e) => props.handleChangeEmail(e.value)}
        />
      </InputWrapper>
    </InputContainer>
    {props.errors.email && <ErrorText errors={props.errors.email} />}
    <Message>登録済みのメールアドレスを入力してください。<br />再設定用メールをお送りします。</Message>
    <ButtonWrapper>
      <Button
        onClick={props.onClickPasswordReset}
        disabled={props.buttonDisabled}
      >
        再設定用メールを送信
      </Button>
    </ButtonWrapper>
  </Container>
);
