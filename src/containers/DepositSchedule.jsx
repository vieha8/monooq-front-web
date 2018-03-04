import React, { Component } from 'react';
import Page from 'components/Page';
import DepositSchedule from 'components/DepositSchedule';
import HostMenu from 'components/Menu/HostMenu';

class HostSpaceListContainer extends Component {
  render() {
    return (
      <Page title="預かるスケジュール">
        <HostMenu />
        <DepositSchedule />
      </Page>
    );
  }
}

export default HostSpaceListContainer;
