// @flow

import React, { Component } from 'react';
import { userActions } from 'redux/modules/user';
import RegisterProfile from 'components/LV3/RegisterProfile';
import ReactGA from 'react-ga';
import Path from 'config/path';
import { ErrorMessages } from 'variables';

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
  phoneNumber: {
    NoHyphenVer: /^0\d{9,10}$/, // 先頭「0」+「半角数字9〜10桁」
    HyphenVer: /^0\d{2,3}-\d{2,4}-\d{4}$/, // 先頭「0」＋「半角数字2〜3桁」＋「-」＋「半角数字1〜4桁」＋「-」＋「半角数字4桁」
  },
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
      error: {},
    };
  }

  componentDidMount() {
    const script = document.createElement('script');

    script.innerHTML = `var __atw = __atw || [];
    __atw.push({ "merchant" : "monooq", "param" : {
        "result_id" : "100",
        "verify" : "user_register_${this.props.user.id}",
    }});
(function(a){var b=a.createElement("script");b.src="https://h.accesstrade.net/js/nct/cv.min.js";b.async=!0;
a=a.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})(document);`;

    document.body.appendChild(script);

    const { name, prefCode, profile, phoneNumber } = this.state;
    this.handleChangeForm('name', name);
    this.handleChangeForm('prefCode', prefCode);
    this.handleChangeForm('profile', profile);
    this.handleChangeForm('phoneNumber', phoneNumber);
  }

  onClickRegisterProfile = () => {
    const { dispatch, user, history } = this.props;
    const { image, name, prefCode, profile, phoneNumber } = this.state;
    dispatch(
      userActions.updateUser({
        userId: user.id,
        body: { imageUri: image, name, prefCode, profile, phoneNumber },
      }),
    );
    history.push(Path.signUpPurpose());
  };

  handleChangeForm = (name: string, value: any) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (name) {
      case 'image':
        state.imageUriPreview = URL.createObjectURL(value);
        break;

      case 'name':
        if (value === undefined ? true : value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        }
        break;

      case 'prefCode':
        if (value.length === 0) {
          errors.push(ErrorMessages.PleaseSelect);
        }
        break;

      case 'profile':
        if (value === undefined ? true : value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.Profile.Max) {
          errors.push(ErrorMessages.LengthMax('自己紹介', Validate.Profile.Max));
        }
        break;

      case 'phoneNumber':
        if (value.replace(/\s/g, '').length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (
          !(
            value.match(Validate.phoneNumber.NoHyphenVer) ||
            value.match(Validate.phoneNumber.HyphenVer)
          )
        ) {
          errors.push(ErrorMessages.InvalidPhoneNumber);
        }
        break;

      default:
        break;
    }

    state[name] = value;
    error[name] = errors;
    state.hasChanged = true;
    this.setState({ ...state, error });
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
      (phoneNumber.match(Validate.phoneNumber.NoHyphenVer) ||
        phoneNumber.match(Validate.phoneNumber.HyphenVer))
    );
  };

  render() {
    const { isLoading, history } = this.props;
    const { image, imageUriPreview, name, prefCode, profile, phoneNumber, error } = this.state;

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
        nameErrors={error.name}
        prefCode={prefCode}
        prefCodeErrors={error.prefCode}
        profile={profile}
        profileErrors={error.profile}
        phoneNumber={phoneNumber}
        phoneNumberErrors={error.phoneNumber}
        onClickSkip={() => {
          ReactGA.event({
            category: 'User Register',
            action: 'Skip Profile',
          });
          history.push(Path.signUpPurpose());
        }}
        onClickRegisterProfile={this.onClickRegisterProfile}
        buttonDisabled={!this.validate()}
        buttonLoading={isLoading}
      />
    );
  }
}
