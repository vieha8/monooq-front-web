import React, { Component } from 'react';
import Path from 'config/path';
import { requestActions } from 'redux/modules/request';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import LoadingPage from 'components/LV3/LoadingPage';
import ScheduleList from 'components/LV3/ScheduleList';
import SpaceDataNone from 'components/LV3/SpaceDataNone';
import { iskeyDownEnter } from 'helpers/keydown';
import { connect } from 'react-redux';
import withAuthRequire from 'components/hooks/withAuthRequire';

class SchedulePage extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(requestActions.fetchSchedule());
  }

  historyToTop = () => {
    const { history } = this.props;
    history.push(Path.top());
  };

  onKeyDownButtonTop = e => {
    if (iskeyDownEnter(e)) {
      this.historyToTop();
    }
  };

  getScheduleProps = (schedule, isHost) => ({
    schedule: {
      isHost,
      user: {
        id: !isHost ? schedule.space.user.id : schedule.user.id,
        name: !isHost ? schedule.space.user.name : schedule.user.name,
        imageUrl: !isHost ? schedule.space.user.imageUrl : schedule.user.imageUrl,
      },
      space: {
        image: {
          src: (schedule.space.images[0] || {}).imageUrl,
          alt: '',
        },
        address: schedule.space.address,
        content: schedule.space.title,
        href: Path.space(schedule.space.id),
      },
      startDate: schedule.startDate,
      endDate: schedule.endDate,
    },
    sales: schedule.price,
    roomId: '',
  });

  showLeftContent = () => {
    const { schedule, user } = this.props;

    const schedules = [].concat(
      ((schedule || {}).user || []).map(s => this.getScheduleProps(s, false)),
      ((schedule || {}).host || []).map(s => this.getScheduleProps(s, true)),
    );

    const { isHost } = user;

    return Array.isArray(schedules) && schedules.length > 0 ? (
      <ScheduleList schedules={schedules} isHost={isHost} />
    ) : (
      <SpaceDataNone
        captionHead={isHost ? '利用されたスペースがありません' : '利用したスペースがありません'}
        caption={
          isHost
            ? 'まだスペースは利用されていません。他のホストの方を参考に、スペース情報を充実させてみましょう。'
            : '利用したスペースがありません。ご希望のスペースを見つけて連絡を取ってみましょう。'
        }
        buttonText="トップに戻る"
        onClick={this.historyToTop}
        onKeyDown={this.onKeyDownButtonTop}
      />
    );
  };

  render() {
    const { isLoading } = this.props;
    return isLoading ? <LoadingPage /> : this.showLeftContent();
  }
}

const mapStateToProps = state => ({
  isLoading: state.request.isLoading,
  user: state.auth.user,
  schedule: state.request.schedule,
});

export default withAuthRequire(
  ContentPageMenu(connect(mapStateToProps)(SchedulePage), {
    headline: '利用状況',
  }),
);
