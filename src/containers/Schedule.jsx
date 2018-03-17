import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import Schedule from 'components/Schedule';
import UserMenu from 'components/Menu/UserMenu';
import { requestActions } from "../redux/modules/request";

class ScheduleContainer extends Component {

  constructor(props){
    super(props);
    this.props.dispatch(requestActions.fetchSchedule());
  }

  render() {
    return (
      <Page title="スケジュール">
        <UserMenu />
        <Schedule userId={this.props.user.ID} />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ScheduleContainer);