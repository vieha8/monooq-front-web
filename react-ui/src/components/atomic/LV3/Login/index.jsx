// @flow

import React from 'react';
import Path from 'config/path';
import Button from 'components/atomic/LV1/Button';
import InlineText from 'components/atomic/LV1/InlineText';
import { H2 } from 'components/atomic/LV1/Headline';
import TextLink from 'components/atomic/LV1/TextLink';
import InputField from 'components/atomic/LV1/InputField';
import { Colors, FontSizes } from 'variables';
import Form from './Form';

type PropTypes = {
  onClickFacebook: Function,
  onClickLogin: Function,
  onChangeEmail: Function,
  onChangePassword: Function,
  email: string,
  password: string,
  loginFailed: boolean,
  buttonDisabled: boolean,
  isLoginChecking: boolean,
};

export default (props: PropTypes) => (
  <Form
    title={<H2 bold>ログイン</H2>}
    email={
      <InputField
        placeholder="メールアドレス"
        value={props.email}
        onChange={e => props.onChangeEmail(e.target.value)}
      />
    }
    pass={
      <InputField
        type="password"
        placeholder="パスワード"
        value={props.password}
        onChange={e => props.onChangePassword(e.target.value)}
      />
    }
    failed={
      props.loginFailed && (
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
        パスワード忘れた方はこちら
      </TextLink>
    }
    login={
      <Button
        primary
        fill={1}
        onClick={props.onClickLogin}
        disabled={props.buttonDisabled}
        loading={props.isLoginChecking}
      >
        ログイン
      </Button>
    }
    facebook={
      <Button facebook fill={1} onClick={props.onClickFacebook} loading={props.isLoginChecking}>
        Facebookでログイン
      </Button>
    }
    toSignup={
      <Button secondary borderbold fontbold fill={1} onClick={props.onClickSignup}>
        新規登録はこちら
      </Button>
    }
  />
);
