import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import { H1 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';
import InputForm from 'components/LV2/Forms/InputForm';
import ErrorList from 'components/LV2/Lists/ErrorList';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';

const Container = styled.div`
  text-align: center;
`;

const ErrMessage = styled.div`
  width: 100%;
  height: 54px;
  display: block;
  position: fixed;
  left: 0px;
  top: 85px;
  z-index: ${ZIndexes.frontParts};
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
    margin-top: 0px;
  `};
  margin-bottom: ${Dimens.small2}px;
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

const TextWrap = styled.div`
  ${media.phone`
    text-align: left;
  `};
`;

export default ({
  sended,
  resetError,
  email,
  onChangeEmail,
  errors,
  onClickSend,
  buttonDisabled,
  buttonLoading,
}) => (
  <Container>
    {sended ? (
      <Fragment>
        <Title>
          <H1 bold>再設定メールを送信しました</H1>
        </Title>
        <TextWrap>
          <InlineText.Base>
            パスワード再設定用のメールをお送りしました。
            <br />
            メールの内容にしたがってお手続きください。
          </InlineText.Base>
        </TextWrap>
      </Fragment>
    ) : (
      <Fragment>
        {resetError && <ErrMessage>{resetError}</ErrMessage>}
        <TextWrap>
          <InlineText.Base>
            モノオクに登録したメールアドレスを入力してください。
            <br />
            パスワードを再設定するためのメールをお送りします。
          </InlineText.Base>
        </TextWrap>
        <InputWrapper>
          <InputForm
            label="メールアドレス"
            placeholder="info@monooq.com"
            value={email}
            onChange={e => onChangeEmail(e.target.value)}
          />
        </InputWrapper>
        <ErrorWrapper>
          <ErrorList keyName="email" errors={errors.email} />
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
