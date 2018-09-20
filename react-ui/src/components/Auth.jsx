import React from 'react';
import { connect } from 'react-redux';
import { authActions } from 'redux/modules/auth';

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(authActions.checkLogin());
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(authActions.tokenGenerate());
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
