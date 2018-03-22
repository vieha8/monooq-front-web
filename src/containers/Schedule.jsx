import React, { Component } from 'react';
import Page from 'components/Page';
import Schedule from 'components/Schedule';
import Menu from 'containers/Menu';
import { requestActions } from 'redux/modules/request';
import { authConnect } from "../components/Auth";

class ScheduleContainer extends Component {

  constructor(props) {
    super(props);
    props.dispatch(requestActions.fetchSchedule());
  }

  render() {
    return (
      <Page title="スケジュール">
        <Menu />
        <Schedule {...this.props} schedule={{
          user: [
            {
              Space: {
                Host: {
                  Name: 'hogehogehogehogehogehoge',
                },
                AddressPref: '12',
                Title: 'hogehogehogehogehogehoge',
              },
              StartDate: '2019/12/20',
              EndDate: '2019/12/20',
              Price: 2000,
            },
            {
              Space: {
                Host: {
                  Name: 'hogehogehogehogehogehoge',
                },
                AddressPref: '12',
                Title: 'hogehogehogehogehogehoge',
              },
              StartDate: '2019/12/20',
              EndDate: '2019/12/20',
              Price: 2000,
            },
          ],
          host: [
            {
              User: {
                Name: 'hogehogehogehogehogehoge',
              },
              Space: {
                AddressPref: '12',
                Title: 'hogehogehogehogehogehogehogehoge',
              },
              StartDate: '2019/12/20',
              EndDate: '2019/12/20',
              Price: 2000,
            },
            {
              User: {
                Name: 'hosthost',
              },
              Space: {
                AddressPref: '12',
                Title: 'hogehogehogehogehogehoge',
              },
              StartDate: '2019/12/20',
              EndDate: '2019/12/20',
              Price: 2000,
            },
          ],
        }} />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  schedule: state.request.schedule,
});

export default authConnect(mapStateToProps)(ScheduleContainer);