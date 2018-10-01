import React from 'react';
import { connect } from 'react-redux';
import { authActions } from 'redux/modules/auth';

class AuthContainer extends React.PureComponent {
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

export default connect()(AuthContainer);
