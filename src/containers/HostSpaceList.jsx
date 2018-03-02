import React, { Component } from 'react';
import Page from 'components/Page';
import HostSpaceList from 'components/HostSpaceList';
import HostMenu from 'components/Menu/HostMenu';

class HostSpaceListContainer extends Component {
  render() {
    return (
      <Page title="スペースの管理" subTitle="登録しているスペースの管理をします">
        <HostMenu />
        <HostSpaceList />
      </Page>
    );
  }
}

export default HostSpaceListContainer;
