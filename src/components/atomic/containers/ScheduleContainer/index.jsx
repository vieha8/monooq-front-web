// @flow

import React, { Component } from 'react';
import numeral from 'numeral';

import { requestActions } from 'redux/modules/request';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import Footer from 'components/atomic/molecules/Footer';
import LoadingPage from 'components/atomic/organisms/LoadingPage';
import ScheduleList from 'components/atomic/organisms/ScheduleList';

import { authConnect } from 'components/Auth';

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    dispatch(requestActions.fetchSchedule());
  }

  showSpace: Function;
  showSpace = () => {};

  getScheduleProps = (schedule: Object, isHost: boolean) => {
    return {
      schedule: {
        hostIsMySelf: isHost,
        opponentName: schedule.User.Name,
        space: {
          image: {
            src: (schedule.Space.Images[0] || {}).ImageUrl,
            alt: '',
          },
          address: schedule.Space.Address,
          content: schedule.Space.Title,
          onClick: () => this.showSpace(),
        },
        startDate: schedule.StartDate,
        endDate: schedule.EndDate,
      },
      sales: numeral(schedule.Price).format('0,0'),
      roomId: '',
    };
  };

  render() {
    const { isLoading, schedule } = this.props;

    return (
      <div>
        <MenuPageTemplate
          header={<Header />}
          headline="スケジュール"
          leftContent={<ServiceMenu />}
          rightContent={
            <ScheduleList
              schedules={[].concat(
                ((schedule || {}).user || []).map(s => this.getScheduleProps(s, false)),
                ((schedule || {}).host || []).map(s => this.getScheduleProps(s, true)),
              )}
            />
          }
          footer={<Footer />}
        />
        {isLoading && <LoadingPage />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.request.isLoading,
  user: state.auth.user,
  schedule: state.request.schedule,
});

export default authConnect(mapStateToProps)(ScheduleContainer);
