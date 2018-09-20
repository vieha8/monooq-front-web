// @flow

import React from 'react';
import { connect } from 'react-redux';
import Intercom from 'react-intercom';

class IntercomContainer extends React.Component {
  render() {
    if (process.env.NODE_ENV !== 'production') {
      return null;
    }
    const { user } = this.props;
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
});

export default connect(mapStateToProps)(IntercomContainer);
