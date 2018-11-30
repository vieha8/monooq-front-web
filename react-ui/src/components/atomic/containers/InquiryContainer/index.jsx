// @flow

import React, { Component } from 'react';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Inquiry from 'components/atomic/LV3/Inquiry';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';

import connect from '../connect';

class ProfileContainer extends Component<*> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <MenuPageTemplate
        header={<Header />}
        headline="お問い合わせ"
        leftContent={<Inquiry />}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

export default connect(ProfileContainer);
