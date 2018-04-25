// @flow

import React, { Component } from 'react';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Inquiry from 'components/atomic/LV3/Inquiry';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import Footer from 'components/atomic/LV2/Footer';

import connect from '../connect';

class ProfileContainer extends Component<*> {
  render() {
    return (
      <MenuPageTemplate
        header={<Header />}
        headline="モノオクに連絡する"
        caption="サービスの不明点・お困りのことがあればモノオクカスタマーサポートまでお寄せください。"
        leftContent={<ServiceMenu />}
        rightContent={<Inquiry />}
        footer={<Footer />}
      />
    );
  }
}

export default connect(ProfileContainer);
