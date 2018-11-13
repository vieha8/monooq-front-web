// @flow

import React, { Fragment } from 'react';
import Path from 'config/path';
import Button from 'components/atomic/LV1/Button';
import InlineText from 'components/atomic/LV1/InlineText';
import { H2 } from 'components/atomic/LV1/Headline';
import TextLink from 'components/atomic/LV1/TextLink';
import InputField from 'components/atomic/LV1/InputField';
import InputForm from 'components/atomic/LV2/InputForm';
import { Colors, FontSizes } from 'variables';
import Form from './Form';

type PropTypes = {
  onClickNext: Function,
  onClickFacebook: Function,
  onChangeEmail: Function,
  onChangePassword: Function,
  onChangePasswordConfirm: Function,
  email: string,
  emailError: Array<string>,
  password: string,
  passError: Array<string>,
  passwordConfirm: string,
  passConfirmError: Array<string>,
  buttonDisabled: boolean,
  isRegisterChecking: boolean,
  signUpError: boolean,
};

export default (props: PropTypes) => (
  <Form
    title={<H2 bold>新規登録</H2>}
    email={
      <InputField
        placeholder="メールアドレス"
        value={props.email}
        onChange={e => props.onChangeEmail(e.target.value)}
      />
    }
    emailError={props.emailError.map((text, i) => (
      <InlineText.Small key={`email_error_${i}`} color={Colors.error}>
        {text}
      </InlineText.Small>
    ))}
    pass={
      <InputForm
        type="password"
        hintbottom="8文字以上の半角英数字で入力してください"
        placeholder="パスワード"
        value={props.password}
        onChange={e => props.onChangePassword(e.target.value)}
      />
    }
    passError={props.passError.map((text, i) => (
      <InlineText.Small key={`pass_error_${i}`} color={Colors.error}>
        {text}
      </InlineText.Small>
    ))}
    passConfirm={
      <InputForm
        type="password"
        hintbottom="8文字以上の半角英数字で入力してください"
        placeholder="パスワードを再入力"
        value={props.passwordConfirm}
        onChange={e => props.onChangePasswordConfirm(e.target.value)}
      />
    }
    passConfirmError={props.passConfirmError.map((text, i) => (
      <InlineText.Small key={`pass_confirm_error_${i}`} color={Colors.error}>
        {text}
      </InlineText.Small>
    ))}
    terms={
      <Fragment>
        新規登録を行うと、
        <br />
        <TextLink
          to={Path.terms()}
          target="_blank"
          fontSize={FontSizes.small}
          color={Colors.brandPrimary}
          underline
        >
          利用規約
        </TextLink>
        <InlineText.Base>と</InlineText.Base>
        <TextLink
          to={Path.privacy()}
          target="_blank"
          fontSize={FontSizes.small}
          color={Colors.brandPrimary}
          underline
        >
          プライバシーポリシー
        </TextLink>
        <InlineText.Base>に同意したとみなします</InlineText.Base>
      </Fragment>
    }
    next={
      <Button
        primary
        fill={1}
        onClick={props.onClickNext}
        disabled={props.buttonDisabled}
        loading={props.isRegisterChecking}
      >
        新規登録
      </Button>
    }
    otherLogin={<InlineText.Base>お持ちのアカウントで登録</InlineText.Base>}
    facebook={
      <Button facebook fill={1} onClick={props.onClickFacebook} loading={props.isRegisterChecking}>
        Facebookで新規登録
      </Button>
    }
    signUpError={
      props.signUpError ? (
        <InlineText.Small color={Colors.error}>
          すでに登録済みのメールアドレスです。
        </InlineText.Small>
      ) : null
    }
    toLogin={
      <Button secondary borderbold fontbold fill={1} onClick={props.onClickLogin}>
        ログインはこちら
      </Button>
    }
  />
);
