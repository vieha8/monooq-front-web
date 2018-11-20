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
        message={{ href: Path.messages(), notificationCount: 0 }}
        schedule={{ href: Path.schedule(user.ID), notificationCount: 0 }}
        spaces={{ href: Path.spaces(user.ID) }}
        addSpace={{ href: Path.createSpaceInfo() }}
        sales={{ href: Path.sales() }}
        paymentHistory={{ href: Path.paid(user.ID) }}
        editProfile={{ href: Path.editProfile(user.ID) }}
        help={{ href: 'https://help.monooq.com/' }}
        inquiry={{ href: Path.inquiry(user.ID) }}
        howToUse={{ href: Path.howToUse() }}
        other={{ href: Path.other() }}
        hasSpace
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
