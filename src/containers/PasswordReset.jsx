import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PasswordReset from 'components/PasswordReset';
import { uiActions } from 'redux/modules/ui';
import { errorActions } from 'redux/modules/error';
import { authActions } from 'redux/modules/auth';
import { ErrorMessage } from 'strings';
import FormValidator from 'containers/helper/FormValidator';

const Validate = {
  Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
};

class PasswordResetContainer extends React.Component {
  constructor(props) {
    super(props);

    FormValidator.initialize('resetPassword', props.dispatch, uiActions.setUiState, errorActions.setErrorState);
  }

  onClickPasswordReset = () => {
    const { ui } = this.props;
    const resetPassword = ui.resetPassword || {};
    this.props.dispatch(authActions.passwordReset({ email: resetPassword.email }));
  };

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
  };

  validate = () => {
    const { ui } = this.props;
    const resetPassword = ui.resetPassword || {};
    return (
      resetPassword.email && resetPassword.email.match(Validate.Email)
    );
  }

  showLoginForm = () => {
    if (this.props.isChecking) {
      return null;
    }

    if (!this.props.isLogin) {
      return (
        <PasswordReset
          onClickPasswordReset={this.onClickPasswordReset}
          handleChangeEmail={this.handleChangeEmail}
          errors={{
            email: this.props.error.errors.email,
          }}
          buttonDisabled={!this.validate()}
        />
      );
    }

    return <Redirect to="/" />;
  };

  render() {
    return <Fragment>{this.showLoginForm()}</Fragment>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isChecking: state.auth.isChecking,
  ui: state.ui,
  error: state.error,
});

export default connect(mapStateToProps)(PasswordResetContainer);
