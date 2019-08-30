// @flow

import React, { Component } from 'react';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import Service from 'components/LV3/Service';
import connect from '../connect';

class ServiceContainer extends Component<PropTypes> {
  render() {
    const { isLogin } = this.props;
    return <Service isLogin={isLogin} />;
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
});

export default ContentPageMenu(
  connect(
    ServiceContainer,
    mapStateToProps,
  ),
  {
    headline: 'モノオクについて',
  },
);
