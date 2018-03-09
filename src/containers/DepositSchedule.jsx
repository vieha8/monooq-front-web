import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import DepositSchedule from 'components/DepositSchedule';
import HostMenu from 'components/Menu/HostMenu';

class DepositScheduleContainer extends Component {
  render() {
    const { auth } = this.props;

    return (
      <Page title="預かるスケジュール">
        <HostMenu />
        <DepositSchedule userId={auth.user.id} />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(DepositScheduleContainer);
