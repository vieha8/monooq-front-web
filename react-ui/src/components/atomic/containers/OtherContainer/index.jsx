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

class HowToUseContainer extends Component<PropTypes> {
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
          />
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

export default connect(HowToUseContainer);
