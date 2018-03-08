import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import Menu from 'containers/Menu';
import UserMode from 'components/ModeChanged/User';

class UserModeContainer extends Component {
  render() {
    return (
      <Page title="ユーザーモードに切り替わりました">
        <Menu />
        <UserMode />
      </Page>
    );
  }
}

export default connect()(UserModeContainer);
