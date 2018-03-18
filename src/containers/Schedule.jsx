import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import Schedule from 'components/Schedule';
import Menu from 'containers/Menu';
import { requestActions } from 'redux/modules/request';

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

export default connect(mapStateToProps)(ScheduleContainer);