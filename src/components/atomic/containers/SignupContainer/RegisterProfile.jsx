// @flow

import React, { Component } from 'react';
import { authActions } from 'redux/modules/auth';
import RegisterProfile from 'components/atomic/organisms/RegisterProfile';
import { ErrorMessage } from 'strings';

type PropTypes = {
  dispatch: Function,
  isRegisting: boolean,
  isSignupFailed: boolean,
}

type State = {
}

export default class RegisterContainer extends Component {
  state: State;

  validate = () => {
    return false;
  }

  props: PropTypes;

  render() {
    return (
      <RegisterProfile
      />
    );
  }
}
