import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import HostMenu from 'components/Menu/UserMenu';
import HostMode from 'components/ModeChanged/User';

class HostModeContainer extends Component {
  render() {
    return (
      <Page title="ホストモードに切り替わりました">
        <HostMenu />
        <HostMode />
      </Page>
    );
  }
}

export default connect()(HostModeContainer);
