// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

import { userActions } from 'redux/modules/user';

import ServiceMenu from 'components/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import Header from 'components/containers/Header';
import EditProfile from 'components/LV3/EditProfile';
import EditProfileCompleted from 'components/LV3/EditProfile/Completed';
import ErrorMessage from 'strings';

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

class EditProfileContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    const { dispatch, user } = this.props;

    dispatch(userActions.prepareUpdateUser());

    this.state = {
      imageUri: user.ImageUrl,
      name: user.Name || '',
      email: user.Email || '',
      phoneNumber: user.PhoneNumber || '',
      prefCode: user.PrefCode || '',
      profile: user.Profile || '',
      purpose: user.IsHost ? 2 : 1,
      isNoticeEmail: user.IsNoticeEmail,
      error: {},
    };
  }

  onKeyDownNoticeEmail = e => {
    if (e && e.keyCode === 32) {
      const { isNoticeEmail } = this.state;
      this.handleChangeUI('isNoticeEmail', !isNoticeEmail);
    }
  };

  handleBeforeUnload(e) {
    e.preventDefault();
    e.returnValue = 'データが保存されませんが、よろしいですか?';
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('beforeunload', this.handleBeforeUnload);

    const { name, email, phoneNumber, prefCode, profile, purpose } = this.state;
    this.handleChangeUI('name', name);
    this.handleChangeUI('email', email);
    this.handleChangeUI('phoneNumber', phoneNumber);
    this.handleChangeUI('prefCode', prefCode);
    this.handleChangeUI('profile', profile);
    this.handleChangeUI('purpose', purpose);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  onClickUpdate: Function;

  onClickUpdate = () => {
    const { user } = this.props;
    const { name, profile, purpose } = this.state;

    this.setState({ hasChanged: false, errors: {} });

    if (this.validate()) {
      const { dispatch } = this.props;
      const body = this.state;
      body.name = name === undefined ? '' : name.trim();
      body.profile = profile === undefined ? '' : profile.trim();
      body.isHost = purpose === '2';
      dispatch(userActions.updateUser({ userId: user.ID, body }));
    }
  };

  handleChangeUI: Function;

  handleChangeUI = (propName: string, value: any) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'imageUri':
        state.imageUriPreview = URL.createObjectURL(value);
        break;

      case 'name':
        if (value === undefined ? true : value.trim().length === 0) {
          errors.push(ErrorMessage.PleaseInput);
        }
        break;

      case 'email':
        if (value.replace(/\s/g, '').length === 0) {
          errors.push(ErrorMessage.PleaseInput);
        } else if (!value.match(Validate.Email)) {
          errors.push(ErrorMessage.InvalidEmail);
        }
        break;

      case 'phoneNumber':
        if (value.replace(/\s/g, '').length === 0) {
          errors.push(ErrorMessage.PleaseInput);
        } else if (
          !(
            value.match(Validate.phoneNumber.NoHyphenVer) ||
            value.match(Validate.phoneNumber.HyphenVer)
          )
        ) {
          errors.push(ErrorMessage.InvalidPhoneNumber);
        }
        break;

      case 'profile':
        if (value === undefined ? true : value.trim().length === 0) {
          errors.push(ErrorMessage.PleaseInput);
        } else if (value.length > Validate.Profile.Max) {
          errors.push(ErrorMessage.LengthMax('自己紹介', Validate.Profile.Max));
        }
        break;

      case 'prefCode':
      case 'purpose':
        if (value.length === 0) {
          errors.push(ErrorMessage.PleaseSelect);
        }
        break;

      default:
        break;
    }

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate: Function;

  validate = () => {
    const { name, email, phoneNumber, prefCode, profile, purpose } = this.state;

    return (
      name &&
      (name === undefined ? false : name.trim().length > 0) &&
      email &&
      email.match(Validate.Email) &&
      phoneNumber &&
      (phoneNumber.match(Validate.phoneNumber.NoHyphenVer) ||
        phoneNumber.match(Validate.phoneNumber.HyphenVer)) &&
      prefCode &&
      profile &&
      (profile === undefined ? false : profile.trim().length > 0) &&
      profile.length <= Validate.Profile.Max &&
      purpose
    );
  };

  render() {
    const { updateSuccess, isLoading, user, errMessage } = this.props;

    const {
      imageUri,
      imageUriPreview,
      name,
      email,
      phoneNumber,
      prefCode,
      profile,
      purpose,
      isNoticeEmail,
      error,
    } = this.state;

    if (errMessage) {
      error.email = [errMessage];
    }

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
              nameErrors={error.name}
              email={email}
              emailErrors={error.email}
              phoneNumber={phoneNumber}
              phoneNumberErrors={error.phoneNumber}
              prefCode={prefCode}
              prefCodeErrors={error.prefCode}
              profile={profile}
              profileErrors={error.profile}
              purpose={purpose}
              purposeErrors={error.purpose}
              isNoticeEmail={isNoticeEmail}
              onKeyDownNoticeEmail={this.onKeyDownNoticeEmail}
              onChangeImage={value => this.handleChangeUI('imageUri', value)}
              onChangeName={value => this.handleChangeUI('name', value)}
              onChangeEmail={value => this.handleChangeUI('email', value)}
              onChangePhoneNumber={value => this.handleChangeUI('phoneNumber', value)}
              onChangePrefCode={value => this.handleChangeUI('prefCode', value)}
              onChangeProfile={value => this.handleChangeUI('profile', value)}
              onChangePurpose={value => this.handleChangeUI('purpose', value)}
              onChangeNoticeEmail={() => this.handleChangeUI('isNoticeEmail', !isNoticeEmail)}
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

const mapStateToProps = state => ({
  user: state.auth.user || {},
  updateSuccess: state.user.updateSuccess,
  isLoading: state.user.isLoading,
  errMessage: state.user.errMessage,
  redirectPath: state.ui.redirectPath,
});

export default authRequired(connect(mapStateToProps)(EditProfileContainer));
