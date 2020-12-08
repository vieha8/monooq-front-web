import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Path from 'config/path';
import { isOverTabletWindow } from 'helpers/style/media-query';
import { partialMatch } from 'helpers/string';
import { getSafeValue } from 'helpers/properties';
import { authActions } from 'redux/modules/auth';
import { getPrefecture } from 'helpers/prefectures';
import ChannelService from 'components/LV1/ChannelService';
import { spaceActions } from 'redux/modules/space';
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

let TIMER_CHANNEL = false;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverTopView: false,
      queue: null,
      isOverTablet: true,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({ isOverTablet: isOverTabletWindow() });
    window.addEventListener('scroll', () => this.watchCurrentPosition(), true);
    window.addEventListener('resize', () => this.checkResize(), true);

    const { dispatch } = this.props;
    dispatch(spaceActions.getSpaceAccessLog({ limit: 8, ifEmpty: true }));
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.isLogin !== prevProps.isLogin ||
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      ChannelService.shutdown();
      bootChannelService(this.props.isLogin, this.props.user);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('scroll', () => this.watchCurrentPosition(), true);
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

  scrollTop = () => {
    const isWebKit = this.browser ? this.browser.isWebKit : false;
    let tgt;

    if ('scrollingElement' in document) {
      tgt = document.scrollingElement;
    } else if (isWebKit) {
      tgt = document.body;
    } else {
      tgt = document.documentElement;
    }
    const scrollTop = (tgt && tgt.scrollTop) || 0;
    return Math.max(window.pageYOffset, scrollTop);
  };

  setStateOverTopView = isOverTopView => {
    if (this._isMounted) {
      this.setState({ isOverTopView });
    }
  };

  isSignUpProfile = path => {
    return partialMatch(path, Path.signUpProfile());
  };

  isLinkRed = () => {
    const path = window.location.pathname;
    return !!(
      partialMatch(path, Path.about()) ||
      partialMatch(path, Path.howtouse()) ||
      partialMatch(path, Path.lp1Host()) ||
      partialMatch(path, Path.signUp()) ||
      partialMatch(path, Path.login())
    );
  };

  isScrollPage = () => {
    const path = window.location.pathname;
    return !!(path && (path === '/' || this.isLinkRed()));
  };

  watchCurrentPosition() {
    const path = window.location.pathname;
    let positionScrollPC = 450;
    let positionScrollSP = 290;

    if (this.isScrollPage) {
      const positionScroll = this.scrollTop();

      this.setStateOverTopView(false);

      if (partialMatch(path, Path.about()) || partialMatch(path, Path.howtouse())) {
        positionScrollPC = 540;
        positionScrollSP = 320;
      } else if (partialMatch(path, Path.lp1Host())) {
        positionScrollPC = 520;
        positionScrollSP = 360;
      }

      const widthWindow = getSafeValue(() => window.parent.screen.width);
      if (widthWindow) {
        if (widthWindow > 480) {
          if (positionScroll > positionScrollPC) {
            this.setStateOverTopView(true);
          }
        } else if (positionScroll > positionScrollSP) {
          this.setStateOverTopView(true);
        }
      } else {
        this.setStateOverTopView(true);
      }
    }
  }

  render() {
    const { schedule, spaces, isLogin, user } = this.props;
    const { isOverTopView, isOverTablet } = this.state;

    let isSchedule = false;
    if (schedule && (schedule.user.length > 0 || schedule.host.length > 0)) {
      isSchedule = true;
    }

    const nowPath = window.location.pathname;
    const isTop = nowPath === '/';

    const noHeaderButton = this.isSignUpProfile(nowPath) || partialMatch(nowPath, Path.lp1Host());
    const noLinkLogo = this.isSignUpProfile(nowPath);

    if (TIMER_CHANNEL !== false) {
      clearTimeout(TIMER_CHANNEL);
    }
    TIMER_CHANNEL = setTimeout(() => {
      bootChannelService(isLogin, user);
    }, 3000);

    return (
      <Fragment>
        <HeaderComponent
          isTop={isTop}
          isOverTopView={isOverTopView}
          isOverTablet={isOverTablet}
          isLinkRed={this.isLinkRed()}
          noHeaderButton={noHeaderButton}
          noLinkLogo={noLinkLogo}
          isSchedule={isSchedule}
          logoutEvent={{
            onClick: e => {
              e.preventDefault();
              this.logout();
            },
          }}
          accessLogSpaces={spaces || []}
        />
      </Fragment>
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
