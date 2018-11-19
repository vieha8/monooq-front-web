// @flow

import React, { Component } from 'react';

import { userActions } from 'redux/modules/user';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
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
        name: user.Name,
        email: user.Email,
        prefCode: user.PrefCode,
        profile: user.Profile,
        phoneNumber: user.PhoneNumber,
      });
    }
  }

  onClickUpdate: Function;
  onClickUpdate = () => {
    const { user } = this.props;
    const { name, email, prefCode, profile } = this.state;

    this.setState({ hasChanged: false, errors: {} });

    if (this.validate()) {
      const { dispatch } = this.props;
      dispatch(userActions.updateUser({ userId: user.ID, body: this.state }));
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

  handleChangeUI: Function;
  handleChangeUI = (propsName: string, value) => {
    const state = this.state;
    state[propsName] = value;
    this.setState(state);
  };

  validate: Function;
  validate = () => {
    const { name, email, prefCode, profile } = this.state;

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

    const { updateSuccess, isChecking, isLoading, user } = this.props;

    if (isChecking) {
      return <LoadingPage />;
    }

    const { imageUri, name, email, prefCode, profile, phoneNumber } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={updateSuccess ? 'プロフィールの変更が完了しました' : 'プロフィールの変更・編集'}
        leftContent={
          updateSuccess ? (
            <EditProfileCompleted userId={user.ID} />
          ) : (
            <EditProfile
              image={imageUri}
              name={name}
              email={email}
              prefCode={prefCode}
              profile={profile}
              phoneNumber={phoneNumber}
              onChangeImage={value => this.handleChangeUI('imageUri', value)}
              onChangeName={value => this.handleChangeUI('name', value)}
              onChangeEmail={value => this.handleChangeUI('email', value)}
              onChangePrefCode={value => this.handleChangeUI('prefCode', value)}
              onChangePurpose={value => this.handleChangeUI('purpose', value)}
              onChangeProfile={value => this.handleChangeUI('profile', value)}
              onChangePhoneNumber={value => this.handleChangeUI('phoneNumber', value)}
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
  });

export default connect(
  ProfileContainer,
  mapStateToProps,
);
