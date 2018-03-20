import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PasswordResetEnd from 'components/PasswordReset/End';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';

class PasswordResetEndContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onClickPasswordReset = () => {
    const { email } = this.props.ui;
    if(!email || email === ''){
      return;
    }
    this.props.dispatch(authActions.passwordReset({ email }));
  };

  handleChangeEmail = (event) => {
    this.props.dispatch(uiActions.setUiState({
      email: event.target.value,
    }));
  };

  showLoginForm = () => {
    if (this.props.isChecking) {
      return null;
    }

    if (!this.props.isLogin) {
      return (
        <PasswordResetEnd
          onClickPasswordReset={this.onClickPasswordReset}
          handleChangeEmail={this.handleChangeEmail}
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
});

export default connect(mapStateToProps)(PasswordResetEndContainer);
