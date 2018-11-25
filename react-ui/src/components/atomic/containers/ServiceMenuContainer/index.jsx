// @flow

import React, { Component } from 'react';
import ServiceMenu from 'components/atomic/LV3/ServiceMenu';
import Path from 'config/path';

import connect from '../connect';

type PropTypes = {
  user: {
    ID: number,
  },
};

class ServiceMenuContainer extends Component<PropTypes> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { user } = this.props;

    return (
      <ServiceMenu
        home={{ to: Path.home() }}
        message={{ to: Path.messages(), notificationCount: 0 }}
        schedule={{ to: Path.schedule(user.ID), notificationCount: 0 }}
        spaces={{ to: Path.spaces(user.ID) }}
        addSpace={{ to: Path.createSpaceInfo() }}
        sales={{ to: Path.sales() }}
        paymentHistory={{ to: Path.paid(user.ID) }}
        editProfile={{ to: Path.editProfile(user.ID) }}
        help={{ href: 'https://help.monooq.com/' }}
        inquiry={{ to: Path.inquiry(user.ID) }}
        howToUse={{ to: Path.howToUse() }}
        other={{ to: Path.other() }}
        hasSpace={user.IsHost}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  ServiceMenuContainer,
  mapStateToProps,
);
