// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { requestActions } from 'redux/modules/request';

import ServiceMenu from 'components/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import Header from 'components/containers/Header';
import LoadingPage from 'components/LV3/LoadingPage';
import ScheduleList from 'components/LV3/ScheduleList';
import NoDataView from 'components/LV3/NoDataView';
import { iskeyDownEnter } from 'helpers/keydown';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(requestActions.fetchSchedule());
  }

  historyToHome: Function;

  historyToHome = () => {
    const { history } = this.props;
    history.push(Path.home());
  };

  onKeyDownButtonHome: Function;

  onKeyDownButtonHome = e => {
    if (iskeyDownEnter(e)) {
      this.historyToHome();
    }
  };

  getScheduleProps: Function;

  getScheduleProps = (schedule: Object, isHost: boolean) => ({
    schedule: {
      isHost,
      user: {
        ID: !isHost ? schedule.Space.Host.ID : schedule.User.ID,
        Name: !isHost ? schedule.Space.Host.Name : schedule.User.Name,
        ImageUrl: !isHost ? schedule.Space.Host.ImageUrl : schedule.User.ImageUrl,
      },
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

  showLeftContent = () => {
    const { schedule, user } = this.props;

    const schedules = [].concat(
      ((schedule || {}).user || []).map(s => this.getScheduleProps(s, false)),
      ((schedule || {}).host || []).map(s => this.getScheduleProps(s, true)),
    );

    const isHost = user.IsHost;

    return Array.isArray(schedules) && schedules.length > 0 ? (
      <ScheduleList schedules={schedules} isHost={isHost} />
    ) : (
      <NoDataView
        captionHead={isHost ? '利用されたスペースがありません' : '利用したスペースがありません'}
        caption={
          isHost
            ? 'まだスペースは利用されていません。他のホストの方を参考に、スペース情報を充実させてみましょう。'
            : '利用したスペースがありません。ご希望のスペースを見つけて連絡を取ってみましょう。'
        }
        buttonText="ホームへ戻る"
        onClick={this.historyToHome}
        onKeyDown={this.onKeyDownButtonHome}
      />
    );
  };

  render() {
    const { isLoading } = this.props;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="利用状況"
        leftContent={isLoading ? <LoadingPage /> : this.showLeftContent()}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.request.isLoading,
  user: state.auth.user,
  schedule: state.request.schedule,
});

export default authRequired(connect(mapStateToProps)(ScheduleContainer));
