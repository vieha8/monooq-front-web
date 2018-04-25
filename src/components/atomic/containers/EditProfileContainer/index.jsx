// @flow

import React, { Component } from 'react';

import { userActions } from 'redux/modules/user';
import { uiActions } from 'redux/modules/ui';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import Footer from 'components/atomic/LV2/Footer';
import LoadingPage from 'components/atomic/LV3/LoadingPage';
import EditProfile from 'components/atomic/LV3/EditProfile';
import EditProfileCompleted from 'components/atomic/LV3/EditProfile/Completed';
import { ErrorMessage } from 'strings';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  user: {
    ID: number,
  },
  ui: {
    editProfile: {
      name: string,
      email: string,
      prefCode: string,
      profile: string,
      imageUri: string,
    },
  },
  isLoading: boolean,
  updateSuccess: boolean,
};

const Validate = {
  Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
  Profile: {
    Max: 1000,
  },
};

class ProfileContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    checkLogin(this.props);
  }

  onClickUpdate = () => {
    const { user, ui } = this.props;
    const { name, email, prefCode, profile } = ui;

    this.setState({ hasChanged: false, errors: {} });

    if (this.validate()) {
      const { dispatch } = this.props;
      dispatch(userActions.updateUser({ userId: user.ID, body: ui.editProfile }));
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
    // お住いの地域選択
    if (!prefCode) {
      errors.email = [].concat(errors.prefCode, [ErrorMessage.PleaseSelect]);
    }
    // プロフィールチェック
    if (!profile) {
      errors.profile = [].concat(errors.profile, [ErrorMessage.PleaseInput]);
    }

    this.setState({ errors });
  };

  handleChangeUI = (propsName: string, value) => {
    const { dispatch, ui } = this.props;
    const nextUI = Object.assign({}, ui);
    nextUI.editProfile[propsName] = value;
    dispatch(uiActions.setUiState(nextUI));
  };

  validate: Function;
  validate = () => {
    const { ui } = this.props;
    const { name, email, prefCode, profile } = ui.editProfile;

    return (
      name &&
      name.length > 0 &&
      email &&
      email.match(Validate.Email) &&
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

    const { updateSuccess, isLoading, user, ui } = this.props;

    if (!ui.editProfile) {
      return <LoadingPage />;
    }

    const { imageUri, name, email, prefCode, profile } = ui.editProfile;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={updateSuccess ? 'プロフィールの更新が完了しました' : 'プロフィールを編集する'}
        leftContent={<ServiceMenu />}
        rightContent={
          updateSuccess ? (
            <EditProfileCompleted userId={user.ID} />
          ) : (
            <EditProfile
              image={imageUri}
              name={name}
              email={email}
              prefCode={prefCode}
              profile={profile}
              onChangeImage={value => this.handleChangeUI('imageUri', value)}
              onChangeName={value => this.handleChangeUI('name', value)}
              onChangeEmail={value => this.handleChangeUI('email', value)}
              onChangePrefCode={value => this.handleChangeUI('prefCode', value)}
              onChangeProfile={value => this.handleChangeUI('profile', value)}
              buttonDisabled={!this.validate()}
              buttonLoading={isLoading}
              onClickUpdate={this.onClickUpdate}
            />
          )
        }
        footer={<Footer />}
      />
    );
  }
}

const mapStateToProps = state => {
  let editProfile = state.ui.editProfile;

  if (!editProfile && state.auth.user.Name) {
    const user = state.auth.user;
    editProfile = {
      imageUri: user.ImageUrl,
      name: user.Name,
      email: user.Email,
      prefCode: user.PrefCode,
      profile: user.Profile,
    };
  }

  return mergeAuthProps(state, {
    ui: {
      editProfile,
    },
    user: state.auth.user,
    updateSuccess: state.user.updateSuccess,
    isLoading: state.user.isLoading,
  });
};

export default connect(ProfileContainer, mapStateToProps);
