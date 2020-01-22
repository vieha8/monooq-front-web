import React, { Component } from 'react';
import { connect } from 'react-redux';
import { partialMatch } from 'helpers/string';
import { getSafeValue } from 'helpers/properties';
import Header from 'components/LV3/Header';
import ServiceMenu from 'components/pages/ServiceMenuPage';
import { withRouter } from 'react-router';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';

class HeaderPage extends Component {
  constructor(props) {
    super(props);

    const targetUrl = props.match ? props.match.url : '';
    let pagePathScrollPage = '';
    let isLinkRed = false;

    if (
      partialMatch(targetUrl, Path.about()) ||
      partialMatch(targetUrl, Path.howtouse()) ||
      partialMatch(targetUrl, Path.lp1Host()) ||
      this.isLpGuest(targetUrl)
    ) {
      isLinkRed = true;
    }

    if (targetUrl && (props.top || isLinkRed)) {
      pagePathScrollPage = targetUrl;
    }

    this.state = {
      pagePathScrollPage,
      isOverTopView: false,
      isLinkRed: !!isLinkRed,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('scroll', () => this.watchCurrentPosition(), true);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('scroll', () => this.watchCurrentPosition(), true);
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }
  }

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

  isLpGuest = path => {
    return (
      partialMatch(path, Path.lp1Guest()) ||
      partialMatch(path, Path.lp1Guest2()) ||
      partialMatch(path, Path.lp2Guest()) ||
      partialMatch(path, Path.lp2Guest2()) ||
      partialMatch(path, Path.lp3Guest())
    );
  };

  isLpGuest2 = path => {
    return partialMatch(path, Path.lp1Guest2()) || partialMatch(path, Path.lp2Guest2());
  };

  watchCurrentPosition() {
    const { pagePathScrollPage } = this.state;
    let positionScrollPC = 450;
    let positionScrollSP = 290;

    if (pagePathScrollPage) {
      const positionScroll = this.scrollTop();

      this.setStateOverTopView(false);

      if (
        partialMatch(pagePathScrollPage, Path.about()) ||
        partialMatch(pagePathScrollPage, Path.howtouse()) ||
        this.isLpGuest(pagePathScrollPage)
      ) {
        positionScrollPC = 540;
        positionScrollSP = 320;
      } else if (partialMatch(pagePathScrollPage, Path.lp1Host())) {
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
    const {
      top,
      isLogin,
      isChecking,
      noHeaderButton,
      noLinkLogo,
      user,
      unreadRooms,
      schedule,
      dispatch,
      history,
    } = this.props;

    const { isOverTopView, pagePathScrollPage, isLinkRed } = this.state;

    let isSchedule = false;
    if (schedule && (schedule.user.length > 0 || schedule.host.length > 0)) {
      isSchedule = true;
    }

    return (
      <Header
        top={top}
        isOverTopView={isOverTopView}
        isPageLp={
          partialMatch(pagePathScrollPage, Path.lp1Host()) || this.isLpGuest(pagePathScrollPage)
        }
        isPageLp123Guest={this.isLpGuest(pagePathScrollPage)}
        isPageLp12GuestLinkTop={this.isLpGuest2(pagePathScrollPage)}
        isLinkRed={isLinkRed}
        topUrl={Path.top()}
        isCheckingLogin={isChecking}
        noHeaderButton={noHeaderButton}
        noLinkLogo={noLinkLogo}
        user={
          isLogin
            ? {
                id: user.id,
                name: user.name,
                image: user.imageUrl,
                isHost: user.isHost,
              }
            : null
        }
        messageUrl={Path.messageList()}
        messageCount={unreadRooms}
        searchConditionUrl={Path.searchCondition()}
        spMenu={<ServiceMenu userName={user.name} userImage={user.imageUrl} />}
        loginUrl={Path.login()}
        onClickSignup={() => history.push(Path.signUp())}
        aboutUrl={Path.about()}
        howtouseUrl={Path.howtouse()}
        helpUrl="https://help.monooq.com/"
        addSpace={{
          to: Path.spaceCreate1(),
          onClick: () => dispatch(uiActions.setUiState({ space: {} })),
        }}
        spaces={{ to: Path.spaces() }}
        schedule={{ to: Path.schedule() }}
        isSchedule={isSchedule}
        sales={{ to: Path.sales() }}
        logoutEvent={{
          onClick: e => {
            e.preventDefault();
            this.logout();
          },
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  isChecking: state.auth.isChecking,
  isLogin: state.auth.isLogin,
  user: state.auth.user,
  unreadRooms: state.messages.unreadRooms,
  schedule: state.request.schedule,
});

export default withRouter(connect(mapStateToProps)(HeaderPage));
