import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import UserMenu from 'components/Menu/UserMenu';
import Profile from 'components/Profile';
import { uiActions } from 'redux/modules/ui';

class ProfileContainer extends Component {
  render() {
    const { ui } = this.props;

    return (
      <Page title="プロフィールを編集する">
        <UserMenu />
        <Profile
          hostName="YUKI HASHIDA"
        />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(ProfileContainer);
