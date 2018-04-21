// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import TextLink from 'components/atomic/atoms/TextLink';
import Button from 'components/atomic/atoms/Button';
import InlineText from 'components/atomic/atoms/InlineText';
import { H1 } from 'components/atomic/atoms/Headline';
import IconInputField from 'components/atomic/molecules/IconInputField';
import { Colors, Dimens } from 'variables';
import logoUri from 'images/monooq_logo_mark.svg';

const Container = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

const InputWrapper = styled.div`
  margin-top: ${Dimens.large}px;
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const ErrorWrapper = styled.div`
  margin-top: ${Dimens.small}px;
`;

const MarginTopMediumWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

type PropTypes = {
  email: string,
  onChangeEmail: Function,
  onClickSend: Function,
  buttonDisabled: boolean,
  buttonLoading: boolean,
  errors: Array<string>,
  sended: boolean,
};

export default (props: PropTypes) => (
  <Container>
    <Logo src={logoUri} />
    {props.sended ? (
      <Fragment>
        <H1>再設定用メールを送信しました</H1>
        <MarginTopMediumWrapper>
          <InlineText.Small color={Colors.lightGray1}>
            パスワード再設定用のメールをお送りしました。<br />
            メールの内容にしたがってお手続きください。
          </InlineText.Small>
        </MarginTopMediumWrapper>
        <MarginTopMediumWrapper>
          <TextLink to={Path.login()}>戻る</TextLink>
        </MarginTopMediumWrapper>
      </Fragment>
    ) : (
      <Fragment>
        <H1>パスワードの再設定</H1>
        <InputWrapper>
          <IconInputField
            placeholder="example@monooq.com"
            iconClassName="fal fa-envelope"
            value={props.email}
            onChange={e => props.onChangeEmail(e.target.value)}
          />
        </InputWrapper>
        {props.errors &&
          props.errors.map((error, i) => (
            <ErrorWrapper key={`email_error_${i}`}>
              <InlineText.Small color={Colors.error}>{error}</InlineText.Small>
            </ErrorWrapper>
          ))}
        <MarginTopMediumWrapper>
          <InlineText.Small color={Colors.lightGray1}>
            登録済みのメールアドレスを入力してください。<br />
            再設定用メールをお送りします。
          </InlineText.Small>
        </MarginTopMediumWrapper>
        <ButtonWrapper>
          <Button
            center
            onClick={props.onClickSend}
            disabled={props.buttonDisabled}
            loading={props.buttonLoading}
          >
            再設定用メールを送信
          </Button>
        </ButtonWrapper>
        <MarginTopMediumWrapper>
          <TextLink to={Path.login()}>戻る</TextLink>
        </MarginTopMediumWrapper>
      </Fragment>
    )}
  </Container>
);
