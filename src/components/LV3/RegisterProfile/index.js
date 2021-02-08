import React, { Component, Fragment } from 'react';
import { withRouter } from 'next/router';
import { userActions } from 'redux/modules/user';
import { uiActions } from 'redux/modules/ui';
import Path from 'config/path';
import { ErrorMessages } from 'variables';
import { handleAccessTrade, handleCircuitX } from 'helpers/asp';
import { handleGTM } from 'helpers/gtm';
import { isTrimmedEmpty, isBelowTrimmedLimit } from 'helpers/validations/string';
import { isPhoneNumberWithoutHyphen, setErrorPhoneNumber } from 'helpers/validations/phoneNumber';
import RegisterProfile from 'components/LV3/RegisterProfile/RegisterProfileForm';

const Validate = {
  ImageSize: {
    Max: 10485760, // 10MB
  },
  Profile: {
    nameMax: 40,
  },
};

class RegisterProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imageUrlPreview: '',
      name: '',
      phoneNumber: '',
      prefCode: '',
      isHost: 0, // 初期値はゲスト
      error: {},
    };
  }

  componentDidMount() {
    const { name, phoneNumber, prefCode } = this.state;
    this.handleChangeForm('name', name);
    this.handleChangeForm('phoneNumber', phoneNumber);
    this.handleChangeForm('prefCode', prefCode);

    const { user } = this.props;
    handleGTM('leadUserRegistered', user.id);
    handleAccessTrade(100, `user_register_${user.id}`);
    handleCircuitX(1373, user.id);
    handleCircuitX(1376, user.id);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { user } = nextProps;
    if (user && user.name !== '' && !prevState.name) {
      const newError = prevState.error;
      newError.name = [];
      return { name: user.name, imageUrlPreview: user.imageUrl, error: newError };
    }
    return null;
  }

  onClickRegisterProfile = () => {
    const { dispatch, user, router, redirectPath } = this.props;
    const { image, name, phoneNumber, prefCode, isHost } = this.state;

    if (isHost === 0) {
      handleGTM('userRegistered', user.id);
    }

    dispatch(
      userActions.updateUser({
        userId: user.id,
        body: { imageUrl: image, name, phoneNumber, prefCode, isHost: Boolean(isHost) },
      }),
    );

    if (redirectPath && redirectPath !== '') {
      router.push(redirectPath);
      dispatch(uiActions.setUiState({ redirectPath: '' }));
      return;
    }

    if (isHost === 0) {
      router.push(Path.top());
    } else {
      router.push({
        pathname: Path.spaceCreate1(),
        state: { isFromRegister: true },
      });
    }
  };

  onClickPurpose = newState => {
    this.setState({ isHost: newState });
  };

  handleChangeForm = (name, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (name) {
      case 'image':
        if (value && value.size > Validate.ImageSize.Max) {
          errors.push(ErrorMessages.OverSizeSpaceImage('10MB'));
        }
        state.imageUrlPreview = URL.createObjectURL(value);
        break;

      case 'name':
        if (isTrimmedEmpty(value)) {
          errors.push(ErrorMessages.PleaseInput);
        }
        if (value && !isBelowTrimmedLimit(value, Validate.Profile.nameMax)) {
          errors.push(ErrorMessages.LengthMax('お名前', Validate.Profile.nameMax));
        }
        break;

      case 'phoneNumber':
        setErrorPhoneNumber(value, errors);
        break;

      case 'prefCode':
        if (!value || value.length === 0) {
          errors.push(ErrorMessages.PleaseSelect);
        }
        break;

      default:
        break;
    }

    state[name] = value;
    error[name] = errors;
    this.setState({ ...state, error });
  };

  validate = () => {
    const { error, name, phoneNumber, prefCode } = this.state;
    return (
      (error.image === undefined || (error.image && error.image.length === 0)) &&
      !isTrimmedEmpty(name) &&
      isBelowTrimmedLimit(name, Validate.Profile.nameMax) &&
      phoneNumber &&
      isPhoneNumberWithoutHyphen(phoneNumber) &&
      prefCode
    );
  };

  render() {
    const { isLoading } = this.props;
    const { image, imageUrlPreview, name, phoneNumber, prefCode, isHost, error } = this.state;

    return (
      <Fragment>
        <RegisterProfile
          isHost={isHost}
          errors={error}
          onChangeImage={picked => this.handleChangeForm('image', picked)}
          imagePreview={imageUrlPreview}
          image={image}
          onChangeName={value => this.handleChangeForm('name', value)}
          name={name}
          onChangePhoneNumber={value => this.handleChangeForm('phoneNumber', value)}
          phoneNumber={phoneNumber}
          onChangeArea={value => this.handleChangeForm('prefCode', value)}
          prefCode={prefCode}
          onClickPurposeGuest={() => this.onClickPurpose(0)}
          onClickPurposeHost={() => this.onClickPurpose(1)}
          buttonDisabled={!this.validate()}
          buttonLoading={isLoading}
          onClickRegisterProfile={this.onClickRegisterProfile}
        />
      </Fragment>
    );
  }
}

export default withRouter(RegisterProfilePage);
