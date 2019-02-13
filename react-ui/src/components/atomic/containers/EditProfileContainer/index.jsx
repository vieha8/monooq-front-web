// @flow

import React, { Component } from 'react';

import { userActions } from 'redux/modules/user';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import LoadingPage from 'components/atomic/LV3/LoadingPage';
import EditProfile from 'components/atomic/LV3/EditProfile';
import EditProfileCompleted from 'components/atomic/LV3/EditProfile/Completed';
import ErrorMessage from 'strings';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  user: {
    ID: number,
  },
  isLoading: boolean,
  updateSuccess: boolean,
};

const Validate = {
  Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
  phoneNumber: {
    NoHyphenVer: /^0\d{9,10}$/, // 先頭「0」+「半角数字9〜10桁」
    HyphenVer: /^0\d{2,3}-\d{2,4}-\d{4}$/, // 先頭「0」＋「半角数字2〜3桁」＋「-」＋「半角数字1〜4桁」＋「-」＋「半角数字4桁」
  },
  Profile: {
    Max: 1000,
  },
};

class ProfileContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    const { dispatch, user } = this.props;

    checkLogin(this.props);

    dispatch(userActions.prepareUpdateUser());

    this.state = {
      imageUri: user.ImageUrl,
      name: user.Name,
      email: user.Email,
      prefCode: user.PrefCode,
      profile: user.Profile,
      phoneNumber: user.PhoneNumber,
      purpose: user.IsHost ? 2 : 1,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user.ID && nextProps.user.ID) {
      const user = nextProps.user;
      this.setState({
        imageUri: user.ImageUrl,
        imageUriPreview: '',
        name: user.Name,
        email: user.Email,
        prefCode: user.PrefCode,
        profile: user.Profile,
        phoneNumber: user.PhoneNumber,
        purpose: user.IsHost ? 2 : 1,
      });
    }
  }

  onClickUpdate: Function;
  onClickUpdate = () => {
    const { user } = this.props;
    const { name, email, phoneNumber, prefCode, profile, purpose } = this.state;

    this.setState({ hasChanged: false, errors: {} });

    if (this.validate()) {
      const { dispatch } = this.props;
      const body = this.state;
      body.isHost = purpose === '2';
      dispatch(userActions.updateUser({ userId: user.ID, body }));
      return;
    }

    const errors = {};
    // 名前チェック
    if (!name) {
      errors.name = [].concat(errors.name, [ErrorMessage.PleaseInput]);
    }
    // emailチェック
    if (!email) {
      errors.email = [].concat(errors.email, [ErrorMessage.PleaseInput]);
    }
    // 電話番号チェック
    if (!phoneNumber) {
      errors.phoneNumber = [].concat(errors.phoneNumber, [ErrorMessage.PleaseInput]);
    }

    // お住いの地域選択
    if (!prefCode) {
      errors.prefCode = [].concat(errors.prefCode, [ErrorMessage.PleaseSelect]);
    }
    // プロフィールチェック
    if (!profile) {
      errors.profile = [].concat(errors.profile, [ErrorMessage.PleaseInput]);
    }

    this.setState({ errors });
  };

  handleChangeUI: Function;
  handleChangeUI = (propsName: string, value) => {
    const state = this.state;
    if (propsName === 'imageUri') {
      state.imageUriPreview = URL.createObjectURL(value);
    }
    state[propsName] = value;
    this.setState(state);
  };

  validate: Function;
  validate = () => {
    const { name, email, phoneNumber, prefCode, profile } = this.state;

    return (
      name &&
      name.length > 0 &&
      email &&
      email.match(Validate.Email) &&
      phoneNumber &&
      (phoneNumber.match(Validate.phoneNumber.NoHyphenVer) ||
        phoneNumber.match(Validate.phoneNumber.HyphenVer)) &&
      prefCode &&
      profile &&
      profile.length > 0 &&
      profile.length <= Validate.Profile.Max
    );
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { updateSuccess, isChecking, isLoading, user } = this.props;

    if (isChecking) {
      return <LoadingPage />;
    }

    const {
      imageUri,
      imageUriPreview,
      name,
      email,
      phoneNumber,
      prefCode,
      profile,
      purpose,
    } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={updateSuccess ? 'プロフィール編集が完了しました' : 'プロフィール編集'}
        leftContent={
          updateSuccess ? (
            <EditProfileCompleted userId={user.ID} />
          ) : (
            <EditProfile
              image={imageUri}
              imagePreview={imageUriPreview}
              name={name}
              email={email}
              phoneNumber={phoneNumber}
              prefCode={prefCode}
              profile={profile}
              purpose={purpose}
              onChangeImage={value => this.handleChangeUI('imageUri', value)}
              onChangeName={value => this.handleChangeUI('name', value)}
              onChangeEmail={value => this.handleChangeUI('email', value)}
              onChangePhoneNumber={value => this.handleChangeUI('phoneNumber', value)}
              onChangePrefCode={value => this.handleChangeUI('prefCode', value)}
              onChangePurpose={value => this.handleChangeUI('purpose', value)}
              onChangeProfile={value => this.handleChangeUI('profile', value)}
              buttonDisabled={!this.validate()}
              buttonLoading={isLoading}
              onClickUpdate={this.onClickUpdate}
            />
          )
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    user: state.auth.user || {},
    updateSuccess: state.user.updateSuccess,
    isLoading: state.user.isLoading,
    redirectPath: state.ui.redirectPath,
  });

export default connect(
  ProfileContainer,
  mapStateToProps,
);
