import React from 'react';
import { connect } from 'react-redux';
import { authActions } from 'redux/modules/auth';

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(authActions.checkLogin());
    const token = localStorage.getItem('token');
    if (token) {
      const { Expire } = JSON.parse(token);
      const now = parseInt(Date.now() / 1000, 10);
      if (Expire < now) {
        // TODO 本来有効期限切れの場合はRefreshToken叩く
        this.props.dispatch(authActions.tokenGenerate());
      }
    } else {
      this.props.dispatch(authActions.tokenGenerate());
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export const Auth = connect(mapStateToProps)(AuthContainer);

export default Auth;
