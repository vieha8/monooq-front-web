// @flow

import React, { Component } from 'react';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import AboutMonooq from 'components/LV3/AboutMonooq';

import { authActions } from 'redux/modules/auth';

import connect from '../connect';

type PropTypes = {
  dispatch: Function,
};

class AboutMonooqContainer extends Component<PropTypes> {
  logout = () => {
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }
    const { dispatch } = this.props;
    dispatch(authActions.logout());
  };

  render() {
    const { isLogin } = this.props;
    return (
      <MenuPageTemplate
        header={<Header />}
        headline="モノオクについて"
        leftContent={
          <AboutMonooq
            logout={{
              onClick: e => {
                e.preventDefault();
                this.logout();
              },
            }}
            isLogin={isLogin}
          />
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
});

export default connect(
  AboutMonooqContainer,
  mapStateToProps,
);
