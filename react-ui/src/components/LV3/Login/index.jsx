import React from 'react';
import Path from 'config/path';
import Button from 'components/LV1/Forms/Button';
import InputField from 'components/LV1/Forms/InputField';
import { H1 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';
import InputFieldIcon from 'components/LV2/Forms/InputFieldIcon';
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
    <InputFieldIcon
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

const textLink = () => {
  return (
    <TextLink
      to={Path.resetPassword()}
      fontSize={FontSizes.small}
      color={Colors.brandPrimary}
      underline="true"
    >
      パスワードを忘れた方はこちら
    </TextLink>
  );
};

const button = (mode, onClick, disabled, loading) => {
  let returnVal;
  switch (mode) {
    case 'login':
      returnVal = (
        <Button primary fill={1} fontbold onClick={onClick} disabled={disabled} loading={loading}>
          ログイン
        </Button>
      );
      break;
    case 'facebook':
      returnVal = (
        <Button facebook fill={1} fontbold onClick={onClick} loading={loading}>
          Facebookでログイン
        </Button>
      );
      break;
    case 'signup':
      returnVal = (
        <Button secondary borderbold fontbold fill={1} onClick={onClick}>
          新規登録はこちら
        </Button>
      );
      break;
    default:
  }
  return returnVal;
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
}) => (
  <Form
    title={<H1 bold>ログイン</H1>}
    email={inputField(email, onChangeEmail)}
    pass={iconInputField(
      ispasswordVisible,
      password,
      onChangePassword,
      onKeyDownPassword,
      onClickIconPassword,
    )}
    failed={
      loginFailed && (
        <InlineText.Small color={Colors.error}>
          ユーザー名またはパスワードに誤りがあります。
        </InlineText.Small>
      )
    }
    remind={textLink()}
    login={button('login', onClickLogin, buttonDisabled, isLoginChecking)}
    facebook={button('facebook', onClickFacebook, false, isLoginChecking)}
    toSignup={button('signup', onClickSignup, false, false)}
  />
);
