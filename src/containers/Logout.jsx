import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import Menu from 'containers/Menu';
import Logout from 'components/Logout';

class LogoutContainer extends Component {
  render() {
    return (
      <Page title="ログアウト">
        <Menu />
        <Logout />
      </Page>
    );
  }
}

export default connect()(LogoutContainer);
