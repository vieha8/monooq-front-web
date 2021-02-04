import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountTemplate from 'components/templates/AccountTemplate';
import LoadingPage from 'components/LV3/LoadingPage';
import RegisterProfile from 'components/LV3/RegisterProfile';

class SignUpProfilePage extends Component {
  render() {
    const { user } = this.props;
    if (!user.id) {
      return <LoadingPage />;
    }

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
