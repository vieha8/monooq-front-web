import React, { Component } from 'react';
import AccountTemplate from 'components/templates/AccountTemplate';
import RegisterProfile from './RegisterProfile';
import connect from '../connect';

class SignUpProfilePage extends Component {
  render() {
    return <AccountTemplate title="新規登録" form={<RegisterProfile {...this.props} />} />;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isRegistering: state.auth.isRegistering,
  isLoading: state.user.isLoading,
  isSignupFailed: state.auth.isSignupFailed,
});

export default connect(SignUpProfilePage, mapStateToProps);
