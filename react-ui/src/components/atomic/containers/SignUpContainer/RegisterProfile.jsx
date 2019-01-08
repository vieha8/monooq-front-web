// @flow

import React, { Component } from 'react';
import { userActions } from 'redux/modules/user';
import { uiActions } from 'redux/modules/ui';
import RegisterProfile from 'components/atomic/LV3/RegisterProfile';
import ReactGA from 'react-ga';

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

export default class RegisterProfileContainer extends Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);

    this.state = {
      image: null,
      imageUriPreview: '',
      name: '',
      prefCode: '',
      profile: '',
      isHost: 0,
      phoneNumber: '',
      hasChanged: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const script = document.createElement('script');

    script.innerHTML = `var __atw = __atw || [];
    __atw.push({ "merchant" : "monooq", "param" : {
        "result_id" : "100",
        "verify" : "user_register_${this.props.user.ID}",
    }});
(function(a){var b=a.createElement("script");b.src="https://h.accesstrade.net/js/nct/cv.min.js";b.async=!0;
a=a.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})(document);`;

    document.body.appendChild(script);
  }

  onClickRegisterProfile = () => {
    const { dispatch, user } = this.props;
    const { image, name, prefCode, profile, phoneNumber } = this.state;
    dispatch(
      userActions.updateUser({
        userId: user.ID,
        body: { imageUri: image, name, prefCode, profile, phoneNumber },
      }),
    );
  };

  handleChangeForm = (name: string, value: any) => {
    const { state } = this;
    if (name === 'image') {
      state.imageUriPreview = URL.createObjectURL(value);
    }
    state[name] = value;
    state.hasChanged = true;
    this.setState(state);
  };

  validate = () => {
    const { name, prefCode, profile, phoneNumber } = this.state;
    return (
      name &&
      name.length > 0 &&
      prefCode &&
      profile &&
      profile.length > 0 &&
      profile.length <= Validate.Profile.Max &&
      phoneNumber &&
      phoneNumber.length >= 10 &&
      phoneNumber.length <= 12
    );
  };

  render() {
    const { isLoading, dispatch } = this.props;
    const { image, imageUriPreview, name, prefCode, profile, phoneNumber } = this.state;

    return (
      <RegisterProfile
        onChangeImage={picked => this.handleChangeForm('image', picked)}
        onChangeName={value => this.handleChangeForm('name', value)}
        onChangeArea={value => this.handleChangeForm('prefCode', value)}
        onChangeProfile={value => this.handleChangeForm('profile', value)}
        onChangePhoneNumber={value => this.handleChangeForm('phoneNumber', value)}
        image={image}
        imagePreview={imageUriPreview}
        name={name}
        prefCode={prefCode}
        profile={profile}
        phoneNumber={phoneNumber}
        onClickSkip={() => {
          dispatch(
            uiActions.setUiState({
              signupStep: 2,
            }),
          );
          ReactGA.event({
            category: 'User Register',
            action: 'Skip Profile',
          });
        }}
        onClickRegisterProfile={this.onClickRegisterProfile}
        buttonDisabled={!this.validate()}
        buttonLoading={isLoading}
      />
    );
  }
}
