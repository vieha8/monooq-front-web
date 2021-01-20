import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import { Dimens } from 'variables';
import Path from 'config/path';
import { authActions } from 'redux/modules/auth';
import { spaceActions } from 'redux/modules/space';
import { getPrefecture } from 'helpers/prefectures';
import { isOverTabletWindow } from 'helpers/style/media-query';
import { partialMatch } from 'helpers/string';
import ChannelService from 'components/LV1/ChannelService';
import HeaderComponent from 'components/LV3/Header/View';

const KEY_CHANNEL_PROD = '1a0525b6-4c6d-4752-a1fa-41301134bc4e';
const KEY_CHANNEL_DEV = 'faef3b55-fa0e-4d90-a97d-1c4f7f5848d2';

function bootChannelService(isLogin, user) {
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

    ChannelService.boot({
      pluginKey: process.env.REACT_APP_ENV === 'production' ? KEY_CHANNEL_PROD : KEY_CHANNEL_DEV,
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
    ChannelService.boot({
      pluginKey: process.env.REACT_APP_ENV === 'production' ? KEY_CHANNEL_PROD : KEY_CHANNEL_DEV,
    });
  }
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
      ChannelService.shutdown();
      bootChannelService(isLogin, user);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.checkResize(), true);
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }
    ChannelService.shutdown();
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
    }, 3000);

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
