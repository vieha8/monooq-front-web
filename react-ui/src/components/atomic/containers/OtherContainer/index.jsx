// @flow

import React, { Component } from 'react';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import Other from 'components/atomic/LV3/Other';

import connect from '../connect';

class HowToUseContainer extends Component<*> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <MenuPageTemplate
        header={<Header />}
        headline="その他"
        leftContent={<Other />}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

export default connect(HowToUseContainer);
