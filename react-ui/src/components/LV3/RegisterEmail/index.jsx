import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Path from 'config/path';
import { Dimens, Colors, FontSizes, ErrorMessages } from 'variables';
import { iskeyDownEnter } from 'helpers/keydown';
import { media } from 'helpers/style/media-query';
import { authActions } from 'redux/modules/auth';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';
import InputFieldIcon from 'components/LV2/Forms/InputFieldIcon';
import InputForm from 'components/LV2/Forms/InputForm';
import ErrorList from 'components/LV2/Lists/ErrorList';

const Validate = {
  Email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
  Password: /^([a-zA-Z0-9]{8,})$/,
};

const Email = styled.div``;

const Pass = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const Terms = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium1_26}px;
  ${media.phone`
    margin-top: ${Dimens.medium_20}px;
  `};
`;

const Next = styled.div`
  margin-top: ${Dimens.medium1_26}px;
  ${media.phone`
    margin-top: ${Dimens.medium_20}px;
  `};
`;

const Facebook = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const ToLogin = styled.div`
  text-align: center;
  margin-top: ${Dimens.medium}px;
  padding-top: ${Dimens.medium}px;
  border-top: 1px solid ${Colors.borderGray};
`;

const getLabelPassword = () => {
  return (
    <Fragment>
      パスワード
      <InlineText.Tiny nobold>&nbsp;※半角英数字のみ8文字以上</InlineText.Tiny>
    </Fragment>
  );
};

const RegisterPage = ({ isRegisterChecking }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    return email && email.match(Validate.Email) && password && password.match(Validate.Password);
  };

  const handleChangeUI = (propName, value) => {
    const setError = [];
    switch (propName) {
      case 'email':
        if (!value || value.trim().length === 0) {
          setError.push(ErrorMessages.PleaseInput);
        } else if (!value.match(Validate.Email)) {
          setError.push(ErrorMessages.InvalidEmail);
        }
        break;
      case 'password':
        if (!value || value.trim().length === 0) {
          setError.push(ErrorMessages.PleaseInput);
        } else if (!value.match(Validate.Password)) {
          setError.push(ErrorMessages.InvalidPassword);
        }
        break;
      default:
        break;
    }
    setErrors(state => ({ ...state, [propName]: setError }));
  };

  const onClickNext = () => {
    dispatch(authActions.signupEmail({ email, password }));
  };

  const onKeyDownPassword = e => {
    if (iskeyDownEnter(e) && validate()) {
      onClickNext();
    }
  };

  const onClickFacebook = () => {
    dispatch(authActions.signupFacebook());
  };

  return (
    <Fragment>
      <Email>
        <InputForm
          label="メールアドレス"
          placeholder="例）info@monooq.com"
          value={email}
          onChange={e => handleChangeUI('email', e.target.value, setEmail(e.target.value))}
        />
        <ErrorList keyName="error_email" errors={errors.email} />
      </Email>
      <Pass>
        <InputFieldIcon
          right="true"
          iconClassName={isVisiblePassword ? 'fal fa-eye' : 'fal fa-eye-slash'}
          type={isVisiblePassword ? 'text' : 'password'}
          label={getLabelPassword()}
          placeholder="例）mono09boys"
          value={password}
          onChange={e => handleChangeUI('password', e.target.value, setPassword(e.target.value))}
          onKeyDown={onKeyDownPassword}
          clickIcon={() => setIsVisiblePassword(!isVisiblePassword)}
        />
        <ErrorList keyName="error_password" errors={errors.password} />
      </Pass>
      <Terms>
        <InlineText.Base fontSize={12}>
          新規登録を行うと、
          <br />
          <TextLink
            to={Path.terms()}
            target="_blank"
            rel="noopener noreferrer"
            fontSize={FontSizes.small_12}
            color={Colors.brandPrimary}
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
          >
            個人情報保護方針
          </TextLink>
          に同意したとみなします
        </InlineText.Base>
      </Terms>
      <Next>
        <Button
          primary
          fill={1}
          fontbold
          onClick={onClickNext}
          disabled={!validate()}
          loading={isRegisterChecking ? 1 : 0}
        >
          新規登録
        </Button>
      </Next>
      <Facebook>
        <Button
          facebook
          fill={1}
          fontbold
          onClick={onClickFacebook}
          loading={isRegisterChecking ? 1 : 0}
        >
          Facebookで新規登録
        </Button>
      </Facebook>
      {!isRegisterChecking && (
        <ToLogin>
          <Button
            secondary
            borderbold
            fontbold
            fill={1}
            onClick={() => history.push(Path.login())}
            loading={isRegisterChecking ? 1 : 0}
          >
            ログインはこちら
          </Button>
        </ToLogin>
      )}
    </Fragment>
  );
};

export default RegisterPage;
