// @flow

import React, { Component } from 'react';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import Other from 'components/atomic/LV3/Other';

import { authActions } from 'redux/modules/auth';

import connect from '../connect';

type PropTypes = {
  dispatch: Function,
};

class OtherContainer extends Component<PropTypes> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
        headline="その他"
        leftContent={
          <Other
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
  OtherContainer,
  mapStateToProps,
);
