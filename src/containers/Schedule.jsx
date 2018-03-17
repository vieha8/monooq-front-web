import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import Schedule from 'components/Schedule';
import UserMenu from 'components/Menu/UserMenu';

class ScheduleContainer extends Component {
  render() {
    const { auth } = this.props;
    return (
      <Page title="スケジュール">
        <UserMenu />
        <Schedule userId={auth.user.id} />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ScheduleContainer);