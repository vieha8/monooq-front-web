// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Button from 'components/atomic/LV1/Button';
import InlineText from 'components/atomic/LV1/InlineText';
import InputForm from 'components/atomic/LV2/InputForm';
import { H2 } from 'components/atomic/LV1/Headline';
import { Colors, Dimens } from 'variables';

const Container = styled.div`
  text-align: center;
`;

const Title = styled.div`
  ${media.phone`
    text-align: left;
  `};
  margin-top: ${Dimens.small2}px;
`;

const InputWrapper = styled.div`
  text-align: left;
  margin-top: ${Dimens.medium3}px;
  ${media.phone`
    margin-top: ${Dimens.medium1}px;
  `};
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const ErrorWrapper = styled.div`
  margin-top: ${Dimens.small}px;
`;

const MarginTopMediumWrapper = styled.div`
  margin-top: ${Dimens.medium3}px;
  text-align: left;
  ${media.phone`
    margin-top: ${Dimens.medium1}px;
  `};
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
    {props.sended ? (
      <Fragment>
        <Title>
          <H2 bold>再設定メールを送信しました</H2>
        </Title>
        <MarginTopMediumWrapper>
          <InlineText.Base>
            パスワード再設定用のメールをお送りしました。
            <br />
            メールの内容にしたがってお手続きください。
          </InlineText.Base>
        </MarginTopMediumWrapper>
      </Fragment>
    ) : (
      <Fragment>
        <Title>
          <H2 bold>パスワードの再設定</H2>
        </Title>
        <MarginTopMediumWrapper>
          <InlineText.Base>
            再設定のメールが受け取れる登録したメールアドレスを入力してください。届いたメールからパスワードの設定が行えます。
          </InlineText.Base>
        </MarginTopMediumWrapper>
        <InputWrapper>
          <InputForm
            label="メールアドレス"
            placeholder="info@monooq.com"
            value={props.email}
            onChange={e => props.onChangeEmail(e.target.value)}
          />
        </InputWrapper>
        {props.errors &&
          props.errors.map((error, i) => (
            <ErrorWrapper key={`email_error_${i}`}>
              <InlineText.Base color={Colors.error}>{error}</InlineText.Base>
            </ErrorWrapper>
          ))}
        <ButtonWrapper>
          <Button
            fill={1}
            onClick={props.onClickSend}
            disabled={props.buttonDisabled}
            loading={props.buttonLoading}
          >
            再設定メールを送信する
          </Button>
        </ButtonWrapper>
      </Fragment>
    )}
  </Container>
);
