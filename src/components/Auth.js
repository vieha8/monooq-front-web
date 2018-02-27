import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { authActions } from 'redux/modules/auth';

class AuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(authActions.checkLoginStart());
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
