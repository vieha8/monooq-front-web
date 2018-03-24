import React, { Component } from 'react';
import { authConnect } from 'components/Auth';
import Page from 'components/Page';
import Menu from 'containers/Menu';
import EditProfile from 'components/EditProfile';
import EditProfileCompleted from 'components/EditProfile/Completed';
import { uiActions } from 'redux/modules/ui';
import { userActions } from 'redux/modules/user';
import { errorActions } from 'redux/modules/error';
import { ErrorMessage } from 'strings';
import FormValidator from 'containers/helper/FormValidator';

const Validate = {
  Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
  Profile: {
    Max: 1000,
  },
};

class ProfileContainer extends Component {
  constructor(props) {
    super(props);

    FormValidator.initialize('editProfile', props.dispatch, uiActions.setUiState, errorActions.setErrorState);
  }

  onClickSave = () => {
    const { dispatch, user, ui } = this.props;
    dispatch(userActions.updateUser({ userId: user.ID, body: ui.editProfile }));
  };

  handleChangeEmail = (value) => {
    const prop = 'email';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    } else if (!value.match(Validate.Email)) {
      errors.push(ErrorMessage.InvalidEmail);
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangeProfileImage = (pickedImage) => {
    const { dispatch, ui } = this.props;
    dispatch(uiActions.setUiState({
      editProfile: {
        ...ui.editProfile,
        image: pickedImage.preview,
        imageUri: pickedImage,
      },
    }));
  }

  handleChangeName = (value) => {
    const prop = 'name';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangePrefCode = (value) => {
    const prop = 'prefCode';
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangeProfile = (value) => {
    const prop = 'profile';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }
    if (value.length > Validate.Profile.Max) {
      errors.push(ErrorMessage.LengthMax('紹介文', Validate.Profile.Max));
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  validate = () => {
    const { ui } = this.props;
    const editProfile = ui.editProfile || {};

    return (
      editProfile.name && editProfile.name.length > 0
      && editProfile.email && editProfile.email.match(Validate.Email)
      && editProfile.prefCode
      && editProfile.profile
      && editProfile.profile.length > 0
      && editProfile.profile.length <= Validate.Profile.Max
    );
  }

  renderEditProfileCompoleted = () => {
    const { user } = this.props;
    return (
      <Page title="プロフィールの更新が完了しました">
        <Menu />
        <EditProfileCompleted userId={user.ID} />
      </Page>
    );
  };

  renderEditProfile = () => {
    const { ui, error } = this.props;
    const editProfile = ui.editProfile || {};
    return (
      <Page title="プロフィールを編集する">
        <Menu />
        <EditProfile
          {...this.props}
          onClickSave={this.onClickSave}
          handleChangeProfileImage={this.handleChangeProfileImage}
          handleChangeName={this.handleChangeName}
          handleChangeEmail={this.handleChangeEmail}
          handleChangePrefCode={this.handleChangePrefCode}
          handleChangeProfile={this.handleChangeProfile}
          user={editProfile}
          errors={{
            name: error.errors.name,
            email: error.errors.email,
            profile: error.errors.profile,
          }}
          buttonDisabled={!this.validate()}
        />
      </Page>
    );
  };

  render() {
    const { updateSuccess } = this.props;

    return (
      updateSuccess
        ? this.renderEditProfileCompoleted()
        : this.renderEditProfile()
    );
  }
}

const mapStateToProps = (state) => {
  if (!state.ui.editProfile && state.auth.user.Name) {
    const user = state.auth.user;
    state.ui.editProfile = {
      name: user.Name,
      email: user.Email,
      prefCode: user.PrefCode,
      profile: user.Profile,
      image: user.ImageUrl,
    };
  }

  return ({
    ui: state.ui,
    user: state.auth.user,
    error: state.error,
    updateSuccess: state.user.updateSuccess,
  });
};

export default authConnect(mapStateToProps)(ProfileContainer);
