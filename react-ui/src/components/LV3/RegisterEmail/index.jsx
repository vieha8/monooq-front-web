import React, { Fragment } from 'react';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import InputFieldIcon from 'components/LV2/Forms/InputFieldIcon';
import Form from './Form';

const getLabelPassword = () => {
  return (
    <Fragment>
      パスワード
      <InlineText.Tiny nobold>&nbsp;※半角英数字のみ8文字以上</InlineText.Tiny>
    </Fragment>
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
      label={getLabelPassword()}
      placeholder="例）mono09boys"
      value={password}
      onChange={e => onChangePassword(e.target.value)}
      onKeyDown={onKeyDownPassword}
      clickIcon={onClickIconPassword}
    />
  );
};

const button = (mode, onClick, disabled, loading) => {
  let returnVal;
  switch (mode) {
    case 'next':
      returnVal = (
        <Button
          primary
          fill={1}
          fontbold
          onClick={onClick}
          disabled={disabled}
          loading={loading ? 1 : 0}
        >
          新規登録
        </Button>
      );
      break;
    case 'facebook':
      returnVal = (
        <Button facebook fill={1} fontbold onClick={onClick} loading={loading ? 1 : 0}>
          Facebookで新規登録
        </Button>
      );
      break;
    case 'login':
      returnVal = (
        <Button secondary borderbold fontbold fill={1} onClick={onClick} loading={loading ? 1 : 0}>
          ログインはこちら
        </Button>
      );
      break;
    default:
  }
  return returnVal;
};

export default ({
  errors,
  email,
  onChangeEmail,
  ispasswordVisible,
  password,
  onChangePassword,
  onClickIconPassword,
  onKeyDownPassword,
  onClickNext,
  buttonDisabled,
  isRegisterChecking,
  onClickFacebook,
  onClickLogin,
}) => (
  <Form
    errors={errors}
    email={email}
    onChangeEmail={onChangeEmail}
    pass={iconInputField(
      ispasswordVisible,
      password,
      onChangePassword,
      onKeyDownPassword,
      onClickIconPassword,
    )}
    next={button('next', onClickNext, buttonDisabled, isRegisterChecking)}
    facebook={button('facebook', onClickFacebook, false, isRegisterChecking)}
    toLogin={button('login', onClickLogin, false, isRegisterChecking)}
    isRegisterChecking={isRegisterChecking}
  />
);
