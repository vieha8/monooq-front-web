import React, { Component } from 'react';
import { authConnect } from "../components/Auth";
import Page from 'components/Page';
import Menu from 'containers/Menu';
import EditProfile from 'components/EditProfile';
import EditProfileCompleted from 'components/EditProfile/Completed';
import { uiActions } from 'redux/modules/ui';
import { userActions } from "../redux/modules/user";

class ProfileContainer extends Component {
  onClickSave = () => {
    const { dispatch, user, ui } = this.props;
    dispatch(userActions.updateUser({ userId: user.ID, body: ui.user }));
  };

  renderEditProfile = () => {
    return (
      <Page title="プロフィールを編集する">
        <Menu />
        <EditProfile
          {...this.props}
          onClickSave={this.onClickSave}
          handleChangeText={this.handleChangeText}
          handleChangeSelect={this.handleChangeSelect}
        />
      </Page>
    );
  };

  renderEditProfileCompoleted = () => {
    return (
      <Page title="プロフィールの更新が完了しました">
        <Menu />
        <EditProfileCompleted />
      </Page>
    );
  };

  handleChangeText = ({ target }) => {
    const { user } = this.props.ui;
    Object.assign(user, { [target.name]: target.value });
    this.props.dispatch(uiActions.setUiState({ user }));
  };

  handleChangeSelect = (_, target) => {
    this.handleChangeText({ target });
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

const mapStateToProps = state => {
  if(!state.ui.user.name && state.auth.user.Name){
    const user = state.auth.user;
    state.ui.user = {
      name: user.Name,
      email: user.Email,
      prefCode: user.PrefCode,
      profile: user.Profile,
    };
  }
  return ({
    ui: state.ui,
    user: state.auth.user,
  });
};

export default authConnect(mapStateToProps)(ProfileContainer);
