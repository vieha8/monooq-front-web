import React, { Component } from 'react';
import { authConnect } from "../components/Auth";
import Page from 'components/Page';
import Menu from 'containers/Menu';
import EditProfile from 'components/EditProfile';
import EditProfileCompleted from 'components/EditProfile/Completed';
import { uiActions } from 'redux/modules/ui';

class ProfileContainer extends Component {
  onClickSave = () => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      editCompleted: true,
    }));
  }

  renderEditProfile() {
    return (
      <Page title="プロフィールを編集する">
        <Menu />
        <EditProfile
          hostName="YUKI HASHIDA"
          onClickSave={this.onClickSave}
        />
      </Page>
    );
  }

  renderEditProfileCompoleted() {
    return (
      <Page title="プロフィールの更新が完了しました">
        <Menu />
        <EditProfileCompleted />
      </Page>
    );
  }

  render() {
    const { ui } = this.props;

    return (
      ui.editCompleted
        ? this.renderEditProfileCompoleted()
        : this.renderEditProfile()
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default authConnect(mapStateToProps)(ProfileContainer);
