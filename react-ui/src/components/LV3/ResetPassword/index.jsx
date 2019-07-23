// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Button';
import InlineText from 'components/LV1/InlineText';
import DisplayErrors from 'components/LV2/DisplayErrors';
import InputForm from 'components/LV2/InputForm';
import { H1 } from 'components/LV1/Headline';
import { Colors, Dimens, FontSizes } from 'variables';

const Container = styled.div`
  text-align: center;
  ${props =>
    props.resetError &&
    `
    margin-top: ${Dimens.medium3_40}px;
  `};
`;

const ErrMessage = styled.div`
  width: 100%;
  height: 54px;
  display: block;
  position: fixed;
  left: 0px;
  top: 64px;
  z-index: 100;
  text-align: center;
  padding: ${Dimens.medium_17}px;
  line-height: 22px;
  font-size: ${FontSizes.small_15}px;
  font-weight: bold;
  color: ${Colors.white};
  background-color: ${Colors.brandPrimary};
  ${media.tablet`
    top: 54px;
  `};
`;

const Title = styled.div`
  ${media.phone`
    text-align: left;
    margin-top: 0px;
  `};
  margin-top: ${Dimens.small2}px;
`;

const InputWrapper = styled.div`
  text-align: left;
  margin-top: ${Dimens.medium1}px;
`;

const ButtonWrapper = styled.div`
  max-width: 196px;
  margin: ${Dimens.medium2}px auto auto;
  ${media.phone`
    max-width: 100%;
    margin: ${Dimens.medium}px auto auto;
  `};
`;

const ErrorWrapper = styled.div`
  margin-top: ${Dimens.small}px;
`;

const MarginTopMediumWrapper = styled.div`
  margin-top: ${Dimens.medium1}px;
  text-align: left;
  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `};
`;

type PropTypes = {
  sended: boolean,
  resetError?: string,
  email: string,
  onChangeEmail: Function,
  errors: Array<string>,
  onClickSend: Function,
  buttonDisabled: boolean,
  buttonLoading: boolean,
};

export default ({
  sended,
  resetError,
  email,
  onChangeEmail,
  errors,
  onClickSend,
  buttonDisabled,
  buttonLoading,
}: PropTypes) => (
  <Container resetError={resetError}>
    {sended ? (
      <Fragment>
        <Title>
          <H1 bold>再設定メールを送信しました</H1>
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
        {resetError && <ErrMessage>{resetError}</ErrMessage>}
        <Title>
          <H1 bold>パスワードの再設定</H1>
        </Title>
        <MarginTopMediumWrapper>
          <InlineText.Base>
            モノオクに登録したメールアドレスを入力してください。
            <br />
            パスワードを再設定するためのメールをお送りします。
          </InlineText.Base>
        </MarginTopMediumWrapper>
        <InputWrapper>
          <InputForm
            label="メールアドレス"
            placeholder="info@monooq.com"
            value={email}
            onChange={e => onChangeEmail(e.target.value)}
          />
        </InputWrapper>
        <ErrorWrapper>
          <DisplayErrors keyName="email" errors={errors.email} />
        </ErrorWrapper>
        <ButtonWrapper>
          <Button fill={1} onClick={onClickSend} disabled={buttonDisabled} loading={buttonLoading}>
            再設定メールを送信する
          </Button>
        </ButtonWrapper>
      </Fragment>
    )}
  </Container>
);
