import React, { Component, Fragment } from 'react';
import { userActions } from 'redux/modules/user';
import { uiActions } from 'redux/modules/ui';
import RegisterProfile from 'components/LV3/RegisterProfile';
import ReactGA from 'react-ga';
import Path from 'config/path';
import { ErrorMessages } from 'variables';
import { handleGTM } from 'helpers/gtm';
import { handleAccessTrade, handleCircuitX } from 'helpers/asp';

const Validate = {
  phoneNumber: {
    NoHyphenVer: /^0\d{9,10}$/, // 先頭「0」+「半角数字9〜10桁」
    HyphenVer: /^0\d{2,3}-\d{2,4}-\d{4}$/, // 先頭「0」＋「半角数字2〜3桁」＋「-」＋「半角数字1〜4桁」＋「-」＋「半角数字4桁」
  },
  Profile: {
    Max: 1000,
  },
};

export default class RegisterProfileContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imageUrlPreview: '',
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
    const { name, prefCode, profile, phoneNumber } = this.state;
    this.handleChangeForm('name', name);
    this.handleChangeForm('prefCode', prefCode);
    this.handleChangeForm('profile', profile);
    this.handleChangeForm('phoneNumber', phoneNumber);
  }

  componentDidUpdate(props) {
    if (!props.user.id && this.props.user.id) {
      const { user } = this.props;
      handleAccessTrade(100, `user_register_${user.id}`);
      handleCircuitX(1373, user.id);
      handleCircuitX(1376, user.id);
      handleGTM('leadUserRegistered', user.id);
    }
  }

  onClickRegisterProfile = () => {
    const { dispatch, user, history } = this.props;
    const { image, name, prefCode, profile, phoneNumber } = this.state;
    dispatch(uiActions.setUiState({ redirectPath: '' }));
    dispatch(
      userActions.updateUser({
        userId: user.id,
        body: { imageUrl: image, name, prefCode, profile, phoneNumber },
      }),
    );
    history.push(Path.signUpPurpose());
  };

  handleChangeForm = (name, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (name) {
      case 'image':
        state.imageUrlPreview = URL.createObjectURL(value);
        break;

      case 'name':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        }
        break;

      case 'prefCode':
        if (!value || value.length === 0) {
          errors.push(ErrorMessages.PleaseSelect);
        }
        break;

      case 'profile':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.Profile.Max) {
          errors.push(ErrorMessages.LengthMax('自己紹介', Validate.Profile.Max));
        }
        break;

      case 'phoneNumber':
        if (!value || value.replace(/\s/g, '').length === 0) {
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
    const { image, imageUrlPreview, name, prefCode, profile, phoneNumber, error } = this.state;

    return (
      <Fragment>
        <RegisterProfile
          errors={error}
          onChangeImage={picked => this.handleChangeForm('image', picked)}
          imagePreview={imageUrlPreview}
          image={image}
          onChangeName={value => this.handleChangeForm('name', value)}
          name={name}
          onChangeArea={value => this.handleChangeForm('prefCode', value)}
          prefCode={prefCode}
          onChangeProfile={value => this.handleChangeForm('profile', value)}
          profile={profile}
          onChangePhoneNumber={value => this.handleChangeForm('phoneNumber', value)}
          phoneNumber={phoneNumber}
          buttonDisabled={!this.validate()}
          buttonLoading={isLoading}
          onClickSkip={() => {
            ReactGA.event({
              category: 'User Register',
              action: 'Skip Profile',
            });
            history.push(Path.signUpPurpose());
          }}
          onClickRegisterProfile={this.onClickRegisterProfile}
        />
      </Fragment>
    );
  }
}
