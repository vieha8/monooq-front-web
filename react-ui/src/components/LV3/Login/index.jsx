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
  ispasswordVisible: boolean,
  password: string,
  onChangePassword: Function,
  onKeyDownPassword: Function,
  onClickIconPassword: Function,
  loginFailed: boolean,
  onClickLogin: Function,
  buttonDisabled: boolean,
  isLoginChecking: boolean,
  onClickFacebook: Function,
  onClickSignup: Function,
};

export default ({
  email,
  onChangeEmail,
  ispasswordVisible,
  password,
  onChangePassword,
  onKeyDownPassword,
  onClickIconPassword,
  loginFailed,
  onClickLogin,
  buttonDisabled,
  isLoginChecking,
  onClickFacebook,
  onClickSignup,
}: PropTypes) => (
  <Form
    title={<H1 bold>ログイン</H1>}
    email={
      <InputField
        placeholder="メールアドレス"
        value={email}
        onChange={e => onChangeEmail(e.target.value)}
      />
    }
    pass={
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
    }
    failed={
      loginFailed && (
        <InlineText.Small color={Colors.error}>
          ユーザー名またはパスワードに誤りがあります。
        </InlineText.Small>
      )
    }
    remind={
      <TextLink
        to={Path.resetPassword()}
        fontSize={FontSizes.small}
        color={Colors.brandPrimary}
        underline="true"
      >
        パスワードを忘れた方はこちら
      </TextLink>
    }
    login={
      <Button
        primary
        fill={1}
        fontbold
        onClick={onClickLogin}
        disabled={buttonDisabled}
        loading={isLoginChecking}
      >
        ログイン
      </Button>
    }
    facebook={
      <Button facebook fill={1} fontbold onClick={onClickFacebook} loading={isLoginChecking}>
        Facebookでログイン
      </Button>
    }
    toSignup={
      <Button secondary borderbold fontbold fill={1} onClick={onClickSignup}>
        新規登録はこちら
      </Button>
    }
  />
);
