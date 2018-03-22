import React from 'react';
import { connect } from 'react-redux';
import SignUp from 'components/SignUp';
import RegisterEmail from 'components/SignUp/RegisterEmail';
import ProfileForm from 'components/SignUp/ProfileForm';
import RegisteredForm from 'components/SignUp/RegisteredForm';
import { authActions } from 'redux/modules/auth';
import { userActions } from 'redux/modules/user';
import { uiActions } from 'redux/modules/ui';
import { errorActions } from 'redux/modules/error';
import { ErrorMessage } from 'strings';
import FormValidator from 'containers/helper/FormValidator';

const Validate = {
  Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
  Password: {
    Min: 8,
  },
  Profile: {
    Max: 1000,
  },
};

class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);

    FormValidator.initialize('signup', props.dispatch, uiActions.setUiState, errorActions.setErrorState);
  }

  onClickSignUpEmail = () => {
    const { email, password } = this.props.ui.signup;

    this.props.dispatch(authActions.signupEmail({ email, password }));
  }

  onClickSignUpFacebook = () => {
    this.props.dispatch(authActions.signupFacebook());
  }

  onClickRegisterProfile = () => {
    const { name, address, profile, image } = this.props.ui.signup;

    this.props.dispatch(userActions.updateUser({
      userId: this.props.user.ID,
      body: { name, profile, image, PrefCode: '13' },
    }));
  };

  // -------------------------------------------
  // メアド登録入力イベント
  // -------------------------------------------

  handleChangeEmail = (value) => {
    const prop = 'email';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    } else if (!value.match(Validate.Email)) {
      errors.push(ErrorMessage.InvalidEmail);
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangePassword = (value) => {
    const prop = 'password';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    } else if (value.length < Validate.Password.Min) {
      errors.push(ErrorMessage.InvalidPassword);
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangePasswordConfirm = (value) => {
    const prop = 'passwordConfirm';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    } else if (value !== this.props.ui.signup.password) {
      errors.push(ErrorMessage.NotMatchPassword);
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  validateRegisterEmail = () => {
    const { ui } = this.props;
    const signup = ui.signup || {};

    return (
      signup.email && signup.email.match(Validate.Email)
      && signup.password && signup.password.length >= Validate.Password.Min
      && signup.passwordConfirm && signup.passwordConfirm === signup.password
    );
  }

  // -------------------------------------------
  // プロフィール登録入力イベント
  // -------------------------------------------

  handleChangeProfileImage = (image) => {
    const prop = 'image';
    FormValidator.changeUiState(prop, image, this.props.ui);
  }

  handleChangeName = (value) => {
    const prop = 'name';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangeAddress = (value) => {
    const prop = 'address';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangeProfile = (value) => {
    const prop = 'profile';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }
    if (value.length > Validate.Profile.Max) {
      errors.push(ErrorMessage.LengthMax('紹介文', Validate.Profile.Max));
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  validateProfile = () => {
    const { ui } = this.props;
    const signup = ui.signup || {};

    return (
      signup.name && signup.name.length > 0
      && signup.address && signup.address.length > 0
      && signup.profile
      && signup.profile.length > 0
      && signup.profile.length <= Validate.Profile.Max
    );
  }

  render() {
    const { error, user, ui } = this.props;
    return (
      <SignUp
        step={ui.signUpStep}
        registerEmail={
          <RegisterEmail
            onClickSignUpEmail={this.onClickSignUpEmail}
            onClickSignUpFacebook={this.onClickSignUpFacebook}
            handleChangeEmail={this.handleChangeEmail}
            handleChangePassword={this.handleChangePassword}
            handleChangePasswordConfirm={this.handleChangePasswordConfirm}
            errors={{
              email: error.errors.email,
              password: error.errors.password,
              passwordConfirm: error.errors.passwordConfirm,
              signupFailed: this.props.isSignupFailed && [ErrorMessage.FailedSignUp],
            }}
            buttonDisabled={!this.validateRegisterEmail()}
          />
        }
        profileForm={
          <ProfileForm
            image={(ui.signup || {}).image}
            handleChangeProfileImage={this.handleChangeProfileImage}
            handleChangeName={this.handleChangeName}
            handleChangeAddress={this.handleChangeAddress}
            handleChangeProfile={this.handleChangeProfile}
            errors={{
              name: error.errors.name,
              address: error.errors.address,
              profile: error.errors.profile,
            }}
            buttonDisabled={!this.validateProfile()}
            onClickRegisterProfile={this.onClickRegisterProfile}
          />
        }
        registeredForm={
          <RegisteredForm
            user={user}
          />
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  user: state.auth.user,
  isSignupFailed: state.auth.isSignupFailed,
  error: state.error,
});

export default connect(mapStateToProps)(SignUpContainer);
