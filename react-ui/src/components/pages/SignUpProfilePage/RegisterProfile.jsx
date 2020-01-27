import React, { Component, Fragment } from 'react';
import { userActions } from 'redux/modules/user';
import { uiActions } from 'redux/modules/ui';
import RegisterProfile from 'components/LV3/RegisterProfile';
import Path from 'config/path';
import { ErrorMessages } from 'variables';
import { handleAccessTrade, handleCircuitX } from 'helpers/asp';
import { handleGTM } from 'helpers/gtm';

const Validate = {
  ImageSize: {
    Max: 10485760, // 10MB
  },
  Profile: {
    nameMax: 40,
  },
};

export default class RegisterProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      imageUrlPreview: '',
      name: '',
      prefCode: '',
      isHost: 0, // 初期値はゲスト
      error: {},
    };
  }

  componentDidMount() {
    const { name, prefCode } = this.state;
    this.handleChangeForm('name', name);
    this.handleChangeForm('prefCode', prefCode);

    const { user } = this.props;
    if (user.id) {
      handleAccessTrade(100, `user_register_${user.id}`);
      handleCircuitX(1373, user.id);
      handleCircuitX(1376, user.id);
    }
  }

  componentDidUpdate(props) {
    const { user } = this.props;
    if (!props.user.id && user.id) {
      handleGTM('leadUserRegistered', user.id);
    }
  }

  onClickRegisterProfile = () => {
    const { dispatch, user, history } = this.props;
    const { image, name, prefCode, isHost } = this.state;

    if (isHost === 0) {
      handleGTM('userRegistered', user.id);
    }

    dispatch(uiActions.setUiState({ redirectPath: '' }));
    dispatch(
      userActions.updateUser({
        userId: user.id,
        body: { imageUrl: image, name, prefCode, isHost: Boolean(isHost) },
      }),
    );
    history.push(Path.top());
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
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        }
        if (value && value.trim().length > Validate.Profile.nameMax) {
          errors.push(ErrorMessages.LengthMax('お名前', Validate.Profile.nameMax));
        }
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
    const { error, name, prefCode } = this.state;
    return (
      (error.image === undefined || (error.image && error.image.length === 0)) &&
      (name === undefined
        ? false
        : name.trim().length > 0 && name.trim().length <= Validate.Profile.nameMax) &&
      prefCode
    );
  };

  render() {
    const { isLoading } = this.props;
    const { image, imageUrlPreview, name, prefCode, isHost, error } = this.state;

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
