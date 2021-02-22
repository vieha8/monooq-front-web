import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import { Dimens } from 'variables';
import Path from 'config/path';
import authActions from 'redux/actions/auth';
import { spaceActions } from 'redux/modules/space';
import { getPrefecture } from 'helpers/prefectures';
import { isOverTabletWindow } from 'helpers/style/media-query';
import { partialMatch } from 'helpers/string';
import HeaderComponent from 'components/LV3/Header/View';
import dynamic from 'next/dynamic'

const ChannelService = dynamic(()=> import('components/LV1/ChannelService').then(r =>r ))
function shutdownChannelService() {
  ChannelService && ChannelService.then(c => {
    c.default.shutdown();
  });
}

function bootChannelService(isLogin, user) {
  ChannelService.then(c => {
    if (isLogin) {
      const {
        id,
        name,
        email,
        phoneNumber,
        inviteCode,
        isHost,
        isNoticeEmail,
        isNoticeSMS,
        lastLoginAt,
        prefCode,
        refererUrl,
        createdAt,
        UpdatedAt,
      } = user;
      c.default.boot({
        pluginKey: process.env.NEXT_PUBLIC_KEY_CHANNEL_IO,
        memberId: id,
        profile: {
          name,
          email,
          mobileNumber: phoneNumber,
          inviteCode,
          isHost,
          isNoticeEmail,
          isNoticeSMS,
          lastLoginAt,
          prefCode: getPrefecture(prefCode),
          refererUrl,
          createdAt,
          UpdatedAt,
        },
      });
    } else {
      c.default.boot({
        pluginKey: process.env.NEXT_PUBLIC_KEY_CHANNEL_IO,
      });
    }
  });
}

const Wrap = styled.div`
  margin-top: ${Dimens.headerHeight}px;
`;

let TIMER_CHANNEL = false;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: null,
      isOverTablet: true,
    };
  }

  componentDidMount() {
    this.setState({ isOverTablet: isOverTabletWindow() });
    window.addEventListener('resize', () => this.checkResize(), true);

    const { dispatch } = this.props;
    dispatch(spaceActions.getSpaceAccessLog({ limit: 8, ifEmpty: true }));
  }

  componentDidUpdate(prevProps) {
    const {
      isLogin,
      user,
      router: { pathname },
    } = this.props;
    if (isLogin !== prevProps.isLogin || pathname !== prevProps.router.pathname) {
      shutdownChannelService();
      bootChannelService(isLogin, user);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.checkResize(), true);
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }
    shutdownChannelService();
  }

  checkResize = () => {
    const { queue } = this.state;
    clearTimeout(queue);
    const queueFunction = setTimeout(() => {
      this.setState({ isOverTablet: isOverTabletWindow() });
    }, 100);
    this.setState({ queue: queueFunction });
  };

  logout = () => {
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }
    const { dispatch } = this.props;
    dispatch(authActions.logout());
  };

  render() {
    const {
      schedule,
      spaces,
      isLogin,
      user,
      router: { pathname },
    } = this.props;
    const { isOverTablet } = this.state;

    let isSchedule = false;
    if (schedule && (schedule.user.length > 0 || schedule.host.length > 0)) {
      isSchedule = true;
    }

    const noHeaderButton = partialMatch(pathname, Path.signUpProfile());

    if (TIMER_CHANNEL !== false) {
      clearTimeout(TIMER_CHANNEL);
    }
    TIMER_CHANNEL = setTimeout(() => {
      bootChannelService(isLogin, user);
    }, 20);

    return (
      <Wrap>
        <HeaderComponent
          isOverTablet={isOverTablet}
          noHeaderButton={noHeaderButton}
          isSchedule={isSchedule}
          logoutEvent={{
            onClick: e => {
              e.preventDefault();
              this.logout();
            },
          }}
          accessLogSpaces={spaces || []}
        />
      </Wrap>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isLogin: state.auth.isLogin,
  schedule: state.request.schedule,
  spaces: state.space.spaces,
});

export default withRouter(connect(mapStateToProps)(Header));
