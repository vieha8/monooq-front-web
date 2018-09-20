// @flow

import React, { Component } from 'react';
import { userActions } from 'redux/modules/user';
import RegisterProfile from 'components/atomic/LV3/RegisterProfile';

type PropTypes = {
  dispatch: Function,
  isLoading: boolean,
};

type State = {
  image: ?File,
  name: string,
  prefCode: string,
  profile: string,
  isHost: boolean,
  hasChanged: boolean,
};

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
      isHost: 0,
      hasChanged: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickRegisterProfile = () => {
    const { dispatch, user } = this.props;
    const { image, name, prefCode, profile, isHost } = this.state;
    dispatch(
      userActions.updateUser({
        userId: user.ID,
        body: { imageUri: image, name, prefCode, profile, isHost: Boolean(isHost) },
      }),
    );
  };

  handleChangeForm = (name: string, value: any) => {
    const { state } = this;
    state[name] = value;
    state.hasChanged = true;
    this.setState(state);
  };

  validate = () => {
    const { name, prefCode, profile } = this.state;
    return (
      name &&
      name.length > 0 &&
      prefCode &&
      profile &&
      profile.length > 0 &&
      profile.length <= Validate.Profile.Max
    );
  };

  render() {
    const { isLoading } = this.props;
    const { image, name, prefCode, profile, isHost } = this.state;

    return (
      <RegisterProfile
        onChangeImage={picked => this.handleChangeForm('image', picked)}
        onChangeName={value => this.handleChangeForm('name', value)}
        onChangeArea={value => this.handleChangeForm('prefCode', value)}
        onChangeProfile={value => this.handleChangeForm('profile', value)}
        onChangeIsHost={value => this.handleChangeForm('isHost', value)}
        image={image}
        name={name}
        prefCode={prefCode}
        profile={profile}
        isHost={isHost}
        onClickRegisterProfile={this.onClickRegisterProfile}
        buttonDisabled={!this.validate()}
        buttonLoading={isLoading}
      />
    );
  }
}
