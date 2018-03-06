import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { authActions } from 'redux/modules/auth';

import { apiActions } from '../redux/modules/api';

class AuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(authActions.checkLoginStart());
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      const { Expire } = JSON.parse(token);
      const now = parseInt(Date.now() / 1000, 10);
      if (Expire < now) {
        //TODO 本来有効期限切れの場合はRefreshToken叩く
        this.props.dispatch(apiActions.tokenGeneratePost());
      }
    } else {
      this.props.dispatch(apiActions.tokenGeneratePost());
    }
  }

  render() {
    return null;
  }
}

export const Auth = connect()(AuthComponent);

export default function authRequired(WrappedComponent) {
  class loginRequiredComponent extends WrappedComponent {
    render() {
      if (this.props.isChecking) {
        return null;
      }
      if (!this.props.isLogin) {
        return <Redirect to="/login" />;
      }
      return super.render();
    }
  }

  const mapStateToProps = state => {
    return { isLogin: state.auth.isLogin, isChecking: state.auth.isChecking };
  };

  return connect(mapStateToProps)(loginRequiredComponent);
}
