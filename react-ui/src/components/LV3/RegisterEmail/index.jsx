// @flow

import React from 'react';
import Path from 'config/path';
import Button from 'components/LV1/Button';
import InlineText from 'components/LV1/InlineText';
import { H1 } from 'components/LV1/Headline';
import TextLink from 'components/LV1/TextLink';
import IconInputField from 'components/LV2/IconInputField';
import InputField from 'components/LV1/InputField';
import { Colors, FontSizes } from 'variables';
import Form from './Form';

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
    email={
      <InputField
        placeholder="メールアドレス"
        value={email}
        onChange={e => onChangeEmail(e.target.value)}
      />
    }
    emailError={emailError.map((text, i) => (
      <InlineText.Small key={`email_error_${i}`.toString()} color={Colors.error}>
        {text}
      </InlineText.Small>
    ))}
    pass={
      <IconInputField
        right
        iconClassName={ispasswordVisible ? 'fal fa-eye-slash' : 'fal fa-eye'}
        type={ispasswordVisible ? 'password' : 'text'}
        placeholder="パスワード"
        value={password}
        onChange={e => onChangePassword(e.target.value)}
        onKeyDown={onKeyDownPassword}
        clickIcon={onClickIconPassword}
      />
    }
    passError={passError.map((text, i) => (
      <InlineText.Small key={`pass_error_${i}`.toString()} color={Colors.error}>
        {text}
      </InlineText.Small>
    ))}
    terms={
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
    }
    next={
      <Button
        primary
        fill={1}
        fontbold
        onClick={onClickNext}
        disabled={buttonDisabled}
        loading={isRegisterChecking}
      >
        新規登録
      </Button>
    }
    otherLogin={<InlineText.Base>お持ちのアカウントで登録</InlineText.Base>}
    facebook={
      <Button facebook fill={1} fontbold onClick={onClickFacebook} loading={isRegisterChecking}>
        Facebookで新規登録
      </Button>
    }
    toLogin={
      <Button secondary borderbold fontbold fill={1} onClick={onClickLogin}>
        ログインはこちら
      </Button>
    }
  />
);
