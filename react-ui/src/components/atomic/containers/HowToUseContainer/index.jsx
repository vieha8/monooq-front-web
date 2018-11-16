// @flow

import React, { Component } from 'react';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import HowToUse from 'components/atomic/LV3/HowToUse';

import connect from '../connect';

class HowToUseContainer extends Component<*> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
