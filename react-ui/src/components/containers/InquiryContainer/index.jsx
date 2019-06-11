// @flow

import React, { Component } from 'react';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import Inquiry from 'components/LV3/Inquiry';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';

import connect from '../connect';

class InquiryContainer extends Component<*> {
  render() {
    const { isLogin } = this.props;
    return (
      <MenuPageTemplate
        header={<Header />}
        headline="お問い合わせ"
        leftContent={<Inquiry isLogin={isLogin} />}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
});

export default connect(
  InquiryContainer,
  mapStateToProps,
);
