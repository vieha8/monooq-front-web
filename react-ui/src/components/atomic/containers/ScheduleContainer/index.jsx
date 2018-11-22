// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { requestActions } from 'redux/modules/request';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import LoadingPage from 'components/atomic/LV3/LoadingPage';
import ScheduleList from 'components/atomic/LV3/ScheduleList';
import NoDataView from 'components/atomic/LV3/NoDataView';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    const { dispatch } = this.props;
    dispatch(requestActions.fetchSchedule());
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getScheduleProps: Function;
  getScheduleProps = (schedule: Object, isHost: boolean) => ({
    schedule: {
      hostIsMySelf: isHost,
      opponentName: isHost ? schedule.User.Name : schedule.Space.Host.Name,
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
    sales: schedule.Price,
    roomId: '',
  });

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { isLoading, schedule, history } = this.props;

    if (isLoading) {
      return <LoadingPage />;
    }

    const schedules = [].concat(
      ((schedule || {}).user || []).map(s => this.getScheduleProps(s, false)),
      ((schedule || {}).host || []).map(s => this.getScheduleProps(s, true)),
    );

    return (
      <div>
        <MenuPageTemplate
          header={<Header />}
          headline="利用状況"
          leftContent={
            Array.isArray(schedules) && schedules.length > 0 ? (
              <ScheduleList schedules={schedules} />
            ) : (
              // TODO:ホスト側の表示を実装
              <NoDataView
                captionHead="利用したスペースがありません"
                caption="利用したスペースがありません。ご希望のスペースを見つけて連絡を取ってみましょう。"
                buttonText="ホームへ戻る"
                onClick={() => history.push(Path.top())}
              />
            )
          }
          rightContent={<ServiceMenu />}
        />
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

export default connect(
  ScheduleContainer,
  mapStateToProps,
);
