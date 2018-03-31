// @flow

import React, { Component } from 'react';

import LoginPage from 'components/atomic/pages/Login';

import connect from './connect';

class LoginContainer extends Component {
  render() {
    return (
      <LoginPage />
    );
  }
}

export default connect(LoginContainer);
