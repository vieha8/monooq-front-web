import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import UserMenu from 'components/Menu/UserMenu';
import UserMode from 'components/ModeChanged/User';

class UserModeContainer extends Component {
  render() {
    return (
      <Page title="ユーザーモードに切り替わりました">
        <UserMenu />
        <UserMode />
      </Page>
    );
  }
}

export default connect()(UserModeContainer);
