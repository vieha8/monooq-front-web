// @flow

import React from 'react';
import { connect } from 'react-redux';
import Intercom from 'react-intercom';

class IntercomContainer extends React.Component {
  render() {
    const { user, location } = this.props;

    if (location.pathname.indexOf('/space/') > -1) {
      // スペース詳細では非表示
      return null;
    }

    const userData = {
      user_id: user.ID,
      email: user.Email,
      name: user.Name,
    };
    return <Intercom appID="v0rdx0ap" {...userData} />;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  location: state.router.location,
});

export default connect(mapStateToProps)(IntercomContainer);
