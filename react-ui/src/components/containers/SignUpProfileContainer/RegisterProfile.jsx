import React, { Component, Fragment } from 'react';
import { userActions } from 'redux/modules/user';
import { uiActions } from 'redux/modules/ui';
import RegisterProfile from 'components/LV3/RegisterProfile';
import Path from 'config/path';
import { ErrorMessages } from 'variables';
import { handleGTM } from 'helpers/gtm';

const Validate = {
  ImageSize: {
    Max: 10485760, // 10MB
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
      isHost: 0, // 初期値はゲスト
      error: {},
    };
  }

  componentDidMount() {
    const { name, prefCode } = this.state;
    this.handleChangeForm('name', name);
    this.handleChangeForm('prefCode', prefCode);
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
      name &&
      name.length > 0 &&
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
