// @flow

import React, { Component } from 'react';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import HowToUse from 'components/LV3/HowToUse';

import connect from '../connect';

class HowToUseContainer extends Component<*> {
  render() {
    return (
      <MenuPageTemplate
        header={<Header />}
        headline="モノオクの使い方"
        leftContent={<HowToUse />}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

export default connect(HowToUseContainer);
