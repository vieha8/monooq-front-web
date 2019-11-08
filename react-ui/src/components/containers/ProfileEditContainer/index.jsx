import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import handleBeforeUnload from 'components/hocs/HandleBeforeUnload';
import ProfileEdit from 'components/LV3/ProfileEdit';
import ProfileEditCompleted from 'components/LV3/ProfileEdit/Completed';
import { H1 } from 'components/LV1/Texts/Headline';
import { userActions } from 'redux/modules/user';
import { ErrorMessages } from 'variables';
import { iskeyDownEnter, iskeyDownSpace } from 'helpers/keydown';

const PURPOSE_USER = '1';
const PURPOSE_HOST = '2';

const Validate = {
  Email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
  phoneNumber: {
    NoHyphenVer: /^0\d{9,10}$/, // 先頭「0」+「半角数字9〜10桁」
    HyphenVer: /^0\d{2,3}-\d{2,4}-\d{4}$/, // 先頭「0」＋「半角数字2〜3桁」＋「-」＋「半角数字1〜4桁」＋「-」＋「半角数字4桁」
  },
  Profile: {
    Max: 1000,
  },
};

class ProfileEditContainer extends Component {
  constructor(props) {
    super(props);

    const { dispatch, user } = this.props;

    dispatch(userActions.prepareUpdateUser());

    this.state = {
      imageUrl: user.imageUrl,
      name: user.name || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      prefCode: user.prefCode || '',
      profile: user.profile || '',
      purpose: user.isHost ? PURPOSE_HOST : PURPOSE_USER,
      isNoticeEmail: user.isNoticeEmail,
      error: {},
    };
  }

  componentDidMount() {
    const { name, email, phoneNumber, prefCode, profile, purpose } = this.state;
    this.handleChangeUI('name', name);
    this.handleChangeUI('email', email);
    this.handleChangeUI('phoneNumber', phoneNumber);
    this.handleChangeUI('prefCode', prefCode);
    this.handleChangeUI('profile', profile);
    this.handleChangeUI('purpose', purpose);
  }

  onKeyDownNoticeEmail = e => {
    if (iskeyDownSpace(e)) {
      const { isNoticeEmail } = this.state;
      this.handleChangeUI('isNoticeEmail', !isNoticeEmail);
    }
  };

  onKeyDownButtonUpdate = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickUpdate();
    }
  };

  onClickUpdate = () => {
    const { user } = this.props;
    const { name, profile, purpose } = this.state;

    this.setState({ hasChanged: false, errors: {} });

    if (this.validate()) {
      const { dispatch } = this.props;
      const body = this.state;
      body.name = name === undefined ? '' : name.trim();
      body.profile = profile === undefined ? '' : profile.trim();
      body.isHost = purpose === PURPOSE_HOST;
      dispatch(userActions.updateUser({ userId: user.id, body }));
    }
  };

  handleChangeUI = (propName, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'imageUrl':
        state.imageUrlPreview = URL.createObjectURL(value);
        break;

      case 'name':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        }
        break;

      case 'email':
        if (!value || value.replace(/\s/g, '').length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (!value.match(Validate.Email)) {
          errors.push(ErrorMessages.InvalidEmail);
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

      case 'profile':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.Profile.Max) {
          errors.push(ErrorMessages.LengthMax('自己紹介', Validate.Profile.Max));
        }
        break;

      case 'prefCode':
      case 'purpose':
        if (value.length === 0) {
          errors.push(ErrorMessages.PleaseSelect);
        }
        break;

      default:
        break;
    }

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

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
      imageUrl,
      imageUrlPreview,
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

    if (updateSuccess) {
      return <ProfileEditCompleted userId={user.id} />;
    }

    return (
      <Fragment>
        <H1 bold>プロフィール編集</H1>
        <ProfileEdit
          errors={error}
          onChangeImage={value => this.handleChangeUI('imageUrl', value)}
          imagePreview={imageUrlPreview}
          image={imageUrl}
          onChangeName={value => this.handleChangeUI('name', value)}
          name={name}
          onChangeEmail={value => this.handleChangeUI('email', value)}
          email={email}
          isNoticeEmail={isNoticeEmail}
          onChangeNoticeEmail={() => this.handleChangeUI('isNoticeEmail', !isNoticeEmail)}
          onKeyDownNoticeEmail={this.onKeyDownNoticeEmail}
          onChangePhoneNumber={value => this.handleChangeUI('phoneNumber', value)}
          phoneNumber={phoneNumber}
          onChangePrefCode={value => this.handleChangeUI('prefCode', value)}
          prefCode={prefCode}
          onChangeProfile={value => this.handleChangeUI('profile', value)}
          profile={profile}
          onChangePurpose={value => this.handleChangeUI('purpose', value)}
          purpose={purpose}
          buttonDisabled={!this.validate()}
          buttonLoading={isLoading}
          onClickUpdate={this.onClickUpdate}
          onKeyDownButtonUpdate={this.onKeyDownButtonUpdate}
        />
      </Fragment>
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

export default authRequired(
  handleBeforeUnload(ContentPageMenu(connect(mapStateToProps)(ProfileEditContainer), {})),
);
