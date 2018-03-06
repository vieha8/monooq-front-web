import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import UserMenu from 'components/Menu/UserMenu';
import Logout from 'components/Logout';

class LogoutContainer extends Component {
  render() {
    return (
      <Page title="ログアウト">
        <UserMenu />
        <Logout />
      </Page>
    );
  }
}

export default connect()(LogoutContainer);
