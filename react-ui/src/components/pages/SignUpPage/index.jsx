import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Path from 'config/path';
import { authActions } from 'redux/modules/auth';
import AccountTemplate from 'components/templates/AccountTemplate';
import Header from 'components/pages/Header';
import LoadingPage from '../../LV3/LoadingPage';
import RegisterEmail from './RegisterEmail';

class SignUpPage extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.isInitialized && this.props.isInitialized) {
      const { dispatch } = this.props;
      dispatch(authActions.checkRedirect());
    }
  }

  render() {
    const { errorMessage, isInitialized, user } = this.props;

    if (!isInitialized) {
      return <LoadingPage />;
    }

    if (user.id) {
      return <Redirect to={Path.top()} />;
    }

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
  isInitialized: state.init.isInitialized,
});

export default connect(mapStateToProps)(SignUpPage);
