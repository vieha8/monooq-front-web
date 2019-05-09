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
  onClickIconPassword: Function,
  onClickNext: Function,
  onClickFacebook: Function,
  onChangeEmail: Function,
  onChangePassword: Function,
  onKeyDownPassword: Function,
  email: string,
  emailError: Array<string>,
  password: string,
  passError: Array<string>,
  buttonDisabled: boolean,
  isRegisterChecking: boolean,
  ispasswordVisible: boolean,
};

export default (props: PropTypes) => (
  <Form
    title={<H1 bold>新規登録</H1>}
    email={
      <InputField
        placeholder="メールアドレス"
        value={props.email}
        onChange={e => props.onChangeEmail(e.target.value)}
      />
    }
    emailError={props.emailError.map((text, i) => (
      <InlineText.Small key={`email_error_${i}`.toString()} color={Colors.error}>
        {text}
      </InlineText.Small>
    ))}
    pass={
      <IconInputField
        right="true"
        iconClassName={props.ispasswordVisible ? 'fal fa-eye-slash' : 'fal fa-eye'}
        type={props.ispasswordVisible ? 'password' : 'text'}
        placeholder="パスワード"
        value={props.password}
        onChange={e => props.onChangePassword(e.target.value)}
        clickIcon={props.onClickIconPassword}
        onKeyDown={props.onKeyDownPassword}
      />
    }
    passError={props.passError.map((text, i) => (
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
        onClick={props.onClickNext}
        disabled={props.buttonDisabled}
        loading={props.isRegisterChecking}
      >
        新規登録
      </Button>
    }
    otherLogin={<InlineText.Base>お持ちのアカウントで登録</InlineText.Base>}
    facebook={
      <Button
        facebook
        fill={1}
        fontbold
        onClick={props.onClickFacebook}
        loading={props.isRegisterChecking}
      >
        Facebookで新規登録
      </Button>
    }
    toLogin={
      <Button secondary borderbold fontbold fill={1} onClick={props.onClickLogin}>
        ログインはこちら
      </Button>
    }
  />
);
