import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import UserMenu from 'components/Menu/UserMenu';
import EditProfile from 'components/Report';
import EditProfileCompleted from 'components/Report/Completed';
import { uiActions } from 'redux/modules/ui';

class ReportContainer extends Component {
  onClickSave = () => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      reportCompleted: true,
    }));
  }

  renderEditProfile() {
    return (
      <Page title="不適切な場所を報告">
        <UserMenu />
        <EditProfile
          hostName="YUKI HASHIDA"
          onClickSave={this.onClickSave}
        />
      </Page>
    );
  }

  renderEditProfileCompoleted() {
    return (
      <Page title="送信完了しました">
        <UserMenu />
        <EditProfileCompleted />
      </Page>
    );
  }

  render() {
    const { ui } = this.props;

    return (
      ui.reportCompleted
        ? this.renderEditProfileCompoleted()
        : this.renderEditProfile()
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(ReportContainer);
