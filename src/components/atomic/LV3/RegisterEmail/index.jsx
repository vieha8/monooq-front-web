// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import Button from 'components/atomic/LV1/Button';
import InlineText from 'components/atomic/LV1/InlineText';
import { H1 } from 'components/atomic/LV1/Headline';
import TextLink from 'components/atomic/LV1/TextLink';
import IconInputField from 'components/atomic/LV2/IconInputField';
import logoUri from 'images/monooq_logo_mark.svg';
import { Colors } from 'variables';
import Form from './Form';

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

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
};

export default (props: PropTypes) => (
  <Form
    logo={<Logo src={logoUri} />}
    title={<H1>登録する</H1>}
    email={
      <IconInputField
        iconClassName="fal fa-envelope"
        placeholder="example.com"
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
      <IconInputField
        type="password"
        iconClassName="fal fa-unlock-alt"
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
      <IconInputField
        type="password"
        iconClassName="fal fa-lock-open-alt"
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
        <TextLink to={Path.terms()} target="_blank">
          利用規約
        </TextLink>
        <InlineText.Base>と</InlineText.Base>
        <TextLink to={Path.privacy()} target="_blank">
          プライバシーポリシー
        </TextLink>
        <InlineText.Base>に同意の上、</InlineText.Base>
        <br />
        <InlineText.Base>次へボタンを押してください。</InlineText.Base>
      </Fragment>
    }
    next={
      <Button
        primary
        center
        onClick={props.onClickNext}
        disabled={props.buttonDisabled}
        loading={props.isRegisterChecking}
      >
        次へ
      </Button>
    }
    otherLogin={<InlineText.Base>お持ちのアカウントで登録</InlineText.Base>}
    facebook={
      <Button facebook center onClick={props.onClickFacebook} loading={props.isRegisterChecking}>
        Facebookで登録
      </Button>
    }
    toLogin={<TextLink to={Path.login()}>ログインはこちら</TextLink>}
  />
);
