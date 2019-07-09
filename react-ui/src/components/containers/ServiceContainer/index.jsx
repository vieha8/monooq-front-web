// @flow

import React, { Component } from 'react';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import Service from 'components/LV3/Service';

import connect from '../connect';

class ServiceContainer extends Component<PropTypes> {
  leftContent = () => {
    const { isLogin } = this.props;
    return <Service isLogin={isLogin} />;
  };

  render() {
    return (
      <MenuPageTemplate
        header={<Header />}
        headline="モノオクについて"
        leftContent={this.leftContent()}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
});

export default connect(
  ServiceContainer,
  mapStateToProps,
);
