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
  image: ?File,
  name: string,
  prefCode: string,
  profile: string,
}

const Validate = {
  Profile: {
    Max: 1000,
  },
};

export default class RegisterContainer extends Component {
  constructor(props: PropTypes) {
    super(props);

    this.state = {
      image: null,
      name: '',
      prefCode: '',
      profile: '',
    };
  }

  state: State;

  validate = () => {
    const { name, prefCode, profile } = this.state;
    return (
      name && name.length > 0
      && prefCode
      && profile
      && profile.length > 0
      && profile.length <= Validate.Profile.Max
    );
  }

  props: PropTypes;

  render() {
    return (
      <RegisterProfile
      />
    );
  }
}
