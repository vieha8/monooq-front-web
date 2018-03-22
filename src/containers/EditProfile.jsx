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

  handleChangeProfileImage = (image) => {
    const prop = 'image';
    FormValidator.changeUiState(prop, image, this.props.ui);
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

  renderEditProfileCompoleted = () => {
    return (
      <Page title="プロフィールの更新が完了しました">
        <Menu />
        <EditProfileCompleted />
      </Page>
    );
  };

  renderEditProfile = () => {
    const { ui } = this.props;
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
        />
      </Page>
    );
  };

  render() {
    const { ui } = this.props;

    return (
      ui.editCompleted
        ? this.renderEditProfileCompoleted()
        : this.renderEditProfile()
    );
  }
}

const mapStateToProps = (state) => {
  if (!(state.ui.editProfile || {}).name && state.auth.user.Name) {
    const user = state.auth.user;
    state.ui.editProfile = {
      name: user.Name,
      email: user.Email,
      prefCode: user.PrefCode,
      profile: user.Profile,
    };
  }

  return ({
    ui: state.ui,
    user: state.auth.user,
    error: state.error,
  });
};

export default authConnect(mapStateToProps)(ProfileContainer);
