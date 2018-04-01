// @flow

import React, { Component } from 'react';
import { userActions } from 'redux/modules/user';
import RegisterProfile from 'components/atomic/organisms/RegisterProfile';

type PropTypes = {
  dispatch: Function,
  isLoading: boolean,
}

type State = {
  image: ?File,
  name: string,
  prefCode: string,
  profile: string,
  hasChanged: boolean,
}

const Validate = {
  Profile: {
    Max: 1000,
  },
};

export default class RegisterContainer extends Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);

    this.state = {
      image: null,
      name: '',
      prefCode: '',
      profile: '',
      hasChanged: false,
    };
  }

  onClickRegisterProfile = () => {
    const { dispatch, user } = this.props;
    const { image, name, prefCode, profile } = this.state;
    dispatch(userActions.updateUser({
      userId: user.ID,
      body: { image, name, prefCode, profile },
    }));
  }

  handleChangeForm = (name: string, value: any) => {
    const state = this.state;
    state[name] = value;
    state.hasChanged = true;
    this.setState(state);
  }

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

  render() {
    const { isLoading } = this.props;
    const { image, name, prefCode, profile } = this.state;

    return (
      <RegisterProfile
        onChangeImage={picked => this.handleChangeForm('image', picked)}
        onChangeName={value => this.handleChangeForm('name', value)}
        onChangeArea={value => this.handleChangeForm('prefCode', value)}
        onChangeProfile={value => this.handleChangeForm('profile', value)}
        image={image}
        name={name}
        prefCode={prefCode}
        profile={profile}
        onClickRegisterProfile={this.onClickRegisterProfile}
        buttonDisabled={!this.validate()}
        buttonLoading={isLoading}
      />
    );
  }
}
