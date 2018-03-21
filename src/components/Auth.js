import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { authActions } from 'redux/modules/auth';

class AuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(authActions.checkLoginStart());
    const token = localStorage.getItem('token');
    if (token) {
      const { Expire } = JSON.parse(token);
      const now = parseInt(Date.now() / 1000, 10);
      if (Expire < now) {
        //TODO 本来有効期限切れの場合はRefreshToken叩く
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

export const Auth = connect(mapStateToProps)(AuthComponent);

export const authConnect = mapStateToProps => {
  return WrappedComponent => {
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
    const mergeMapStateToProps = state => {
      return {
        ...mapStateToProps(state),
        ...{
          isLogin: state.auth.isLogin,
          isChecking: state.auth.isChecking,
        },
      };
    };
    return withRouter(connect(mergeMapStateToProps)(loginRequiredComponent));
  };
};
