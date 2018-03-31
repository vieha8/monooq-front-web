// @flow

import React, { Component } from 'react';

import SignupPage from 'components/atomic/pages/Signup';

import connect from './connect';

class SignupContainer extends Component {
  render() {
    return (
      <SignupPage />
    );
  }
}

export default connect(SignupContainer);
