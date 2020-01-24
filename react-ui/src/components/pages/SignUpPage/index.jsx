import React, { Component } from 'react';
import AccountTemplate from 'components/templates/AccountTemplate';
import Path from 'config/path';
import { authActions } from 'redux/modules/auth';
import { connect } from 'react-redux';
import RegisterEmail from './RegisterEmail';

class SignUpPage extends Component {
  componentDidMount() {
    const { dispatch, user, history } = this.props;
    if (user.id) {
      if (user.name === '') {
        history.push(Path.signUpProfile());
      } else {
        history.push(Path.top());
      }
    } else {
      dispatch(authActions.initSignup());
    }
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <AccountTemplate
        errorHeader={errorMessage}
        title="新規登録"
        form={<RegisterEmail {...this.props} />}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isRegistering: state.auth.isRegistering,
  isLoading: state.user.isLoading,
  errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps)(SignUpPage);
