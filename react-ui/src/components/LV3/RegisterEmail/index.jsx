// @flow

import React from 'react';
import Path from 'config/path';
import Button from 'components/LV1/Forms/Button';
import InputField from 'components/LV1/Forms/InputField';
import { H1 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';
import IconInputField from 'components/LV2/Forms/IconInputField';
import { Colors, FontSizes } from 'variables';
import Form from './Form';

const inputField = (email, onChangeEmail) => {
  return (
    <InputField
      placeholder="メールアドレス"
      value={email}
      onChange={e => onChangeEmail(e.target.value)}
    />
  );
};

const iconInputField = (
  ispasswordVisible,
  password,
  onChangePassword,
  onKeyDownPassword,
  onClickIconPassword,
) => {
  return (
    <IconInputField
      right="true"
      iconClassName={ispasswordVisible ? 'fal fa-eye-slash' : 'fal fa-eye'}
      type={ispasswordVisible ? 'password' : 'text'}
      placeholder="パスワード"
      value={password}
      onChange={e => onChangePassword(e.target.value)}
      onKeyDown={onKeyDownPassword}
      clickIcon={onClickIconPassword}
    />
  );
};

const inlineText = () => {
  return (
    <InlineText.Base fontSize={12}>
      新規登録を行うと、
      <br />
      <TextLink
        to={Path.terms()}
        target="_blank"
        rel="noopener noreferrer"
        fontSize={FontSizes.small_12}
        color={Colors.brandPrimary}
        underline="true"
      >
        利用規約
      </TextLink>
      と
      <TextLink
        to={Path.privacy()}
        target="_blank"
        rel="noopener noreferrer"
        fontSize={FontSizes.small_12}
        color={Colors.brandPrimary}
        underline="true"
      >
        プライバシーポリシー
      </TextLink>
      に同意したとみなします
    </InlineText.Base>
  );
};

const button = (mode, onClick, disabled, loading) => {
  let returnVal;
  switch (mode) {
    case 'next':
      returnVal = (
        <Button primary fill={1} fontbold onClick={onClick} disabled={disabled} loading={loading}>
          新規登録
        </Button>
      );
      break;
    case 'facebook':
      returnVal = (
        <Button facebook fill={1} fontbold onClick={onClick} loading={loading}>
          Facebookで新規登録
        </Button>
      );
      break;
    case 'login':
      returnVal = (
        <Button secondary borderbold fontbold fill={1} onClick={onClick}>
          ログインはこちら
        </Button>
      );
      break;
    default:
  }
  return returnVal;
};

type PropTypes = {
  email: string,
  onChangeEmail: Function,
  emailError: Array<string>,
  ispasswordVisible: boolean,
  password: string,
  onChangePassword: Function,
  onClickIconPassword: Function,
  onKeyDownPassword: Function,
  passError: Array<string>,
  onClickNext: Function,
  buttonDisabled: boolean,
  isRegisterChecking: boolean,
  onClickFacebook: Function,
  onClickLogin: Function,
};

export default ({
  email,
  onChangeEmail,
  emailError,
  ispasswordVisible,
  password,
  onChangePassword,
  onClickIconPassword,
  onKeyDownPassword,
  passError,
  onClickNext,
  buttonDisabled,
  isRegisterChecking,
  onClickFacebook,
  onClickLogin,
}: PropTypes) => (
  <Form
    title={<H1 bold>新規登録</H1>}
    email={inputField(email, onChangeEmail)}
    emailError={emailError.map((text, i) => (
      <InlineText.Small key={`email_error_${i}`.toString()} color={Colors.error}>
        {text}
      </InlineText.Small>
    ))}
    pass={iconInputField(
      ispasswordVisible,
      password,
      onChangePassword,
      onKeyDownPassword,
      onClickIconPassword,
    )}
    passError={passError.map((text, i) => (
      <InlineText.Small key={`pass_error_${i}`.toString()} color={Colors.error}>
        {text}
      </InlineText.Small>
    ))}
    terms={inlineText()}
    next={button('next', onClickNext, buttonDisabled, isRegisterChecking)}
    otherLogin={<InlineText.Base>お持ちのアカウントで登録</InlineText.Base>}
    facebook={button('facebook', onClickFacebook, false, isRegisterChecking)}
    toLogin={button('login', onClickLogin, false, false)}
  />
);
