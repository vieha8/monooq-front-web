import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import UserMenu from 'components/Menu/UserMenu';
import Profile from 'components/Profile';
import ProfileEditCompleted from 'components/Profile/EditCompleted';
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
        <UserMenu />
        <Profile
          hostName="YUKI HASHIDA"
          onClickSave={this.onClickSave}
        />
      </Page>
    );
  }

  renderEditProfileCompoleted() {
    return (
      <Page title="プロフィールの更新が完了しました">
        <UserMenu />
        <ProfileEditCompleted />
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

export default connect(mapStateToProps)(ProfileContainer);
