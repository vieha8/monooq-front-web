import React, { Component } from 'react';
import Page from 'components/Page';
import HostSpaceList from 'components/HostSpaceList';
import Menu from 'containers/Menu';

class HostSpaceListContainer extends Component {
  render() {
    return (
      <Page title="スペースの管理" subTitle="登録しているスペースの管理をします">
        <Menu />
        <HostSpaceList />
      </Page>
    );
  }
}

export default HostSpaceListContainer;
