import React from 'react';
import { connect } from 'react-redux';
import SignUp from 'components/SignUp';
import { authActions } from 'redux/modules/auth';
import { uiActions } from 'redux/modules/ui';
import { errorActions } from 'redux/modules/error';
import { ErrorMessage } from 'strings';
import FormValidator from 'containers/helper/FormValidator';

const Validate = {
  Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  Password: {
    Min: 8,
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

  validate = () => {
    const { ui } = this.props;
    const signup = ui.signup || {};

    return (
      signup.email && signup.email.match(Validate.Email)
      && signup.password && signup.password.length >= Validate.Password.Min
      && signup.passwordConfirm && signup.passwordConfirm === signup.password
    );
  }

  render() {
    const { error } = this.props;
    return (
      <SignUp
        step={this.props.ui.signUpStep}
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
        buttonDisabled={!this.validate()}
        {...this.props}
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
