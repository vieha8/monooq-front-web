// @flow

import React, { Component } from 'react';
import ServiceMenu from 'components/atomic/LV3/ServiceMenu';
import Path from 'config/path';

import { authActions } from 'redux/modules/auth';

import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  user: {
    ID: number,
  },
};

class ServiceMenuContainer extends Component<PropTypes> {
  logout: Function;
  logout = () => {
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }

    const { dispatch } = this.props;
    dispatch(authActions.logout());
    window.location.href = Path.top();
  };

  render() {
    const { user } = this.props;

    return (
      <ServiceMenu
        message={{ href: Path.messages(), notificationCount: 0 }}
        schedule={{ href: Path.schedule(user.ID), notificationCount: 0 }}
        spaces={{ href: Path.spaces(user.ID) }}
        addSpace={{ href: Path.createSpaceInfo() }}
        salesTransfer={{ href: Path.salesTransfers(user.ID) }}
        paymentHistory={{ href: Path.paid(user.ID) }}
        becomeHost={{ href: Path.createSpaceInfo() }}
        editProfile={{ href: Path.editProfile(user.ID) }}
        inquiry={{ href: Path.inquiry(user.ID) }}
        logout={{
          onClick: e => {
            e.preventDefault();
            this.logout();
          },
        }}
        hasSpace
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(ServiceMenuContainer, mapStateToProps);
