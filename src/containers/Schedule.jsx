import React, { Component } from 'react';
import Page from 'components/Page';
import Schedule from 'components/Schedule';
import Menu from 'containers/Menu';
import { requestActions } from 'redux/modules/request';
import { authConnect }  from "../components/Auth";

class ScheduleContainer extends Component {

  constructor(props){
    super(props);
    props.dispatch(requestActions.fetchSchedule());
  }

  render() {
    return (
      <Page title="スケジュール">
        <Menu />
        <Schedule {...this.props} />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  schedule: state.request.schedule,
});

export default authConnect(mapStateToProps)(ScheduleContainer);