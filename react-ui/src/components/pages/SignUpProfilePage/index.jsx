import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountTemplate from 'components/templates/AccountTemplate';
import RegisterProfile from './RegisterProfile';

class SignUpProfilePage extends Component {
  render() {
    return <AccountTemplate title="新規登録" form={<RegisterProfile {...this.props} />} />;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  redirectPath: state.ui.redirectPath,
  isRegistering: state.auth.isRegistering,
  isLoading: state.user.isLoading,
  isSignupFailed: state.auth.isSignupFailed,
});

export default connect(mapStateToProps)(SignUpProfilePage);
