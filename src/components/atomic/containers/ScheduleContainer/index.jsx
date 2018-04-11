// @flow

import React, { Component } from 'react';
import numeral from 'numeral';
import Path from 'config/path';

import { requestActions } from 'redux/modules/request';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import Footer from 'components/atomic/molecules/Footer';
import LoadingPage from 'components/atomic/organisms/LoadingPage';
import ScheduleList from 'components/atomic/organisms/ScheduleList';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    const { dispatch } = this.props;
    dispatch(requestActions.fetchSchedule());
  }

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
          href: Path.space(schedule.Space.ID),
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

    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

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

const mapStateToProps = state =>
  mergeAuthProps(state, {
    isLoading: state.request.isLoading,
    user: state.auth.user,
    schedule: state.request.schedule,
  });

export default connect(ScheduleContainer, mapStateToProps);
