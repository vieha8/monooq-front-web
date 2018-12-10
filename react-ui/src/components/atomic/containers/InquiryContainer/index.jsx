// @flow

import React, { Component } from 'react';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Inquiry from 'components/atomic/LV3/Inquiry';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';

import connect from '../connect';

class InquiryContainer extends Component<*> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
