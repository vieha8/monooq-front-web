import React, { Component } from 'react';
import Page from 'components/Page';
import CancelSchedule from 'components/CancelSchedule';
import HostMenu from 'components/Menu/HostMenu';

class HostSpaceListContainer extends Component {
  render() {
    return (
      <Page title="キャンセルする" subTitle="預かり開始日の15日前まではキャンセル手数料はかかりません。">
        <HostMenu />
        <CancelSchedule />
      </Page>
    );
  }
}

export default HostSpaceListContainer;
