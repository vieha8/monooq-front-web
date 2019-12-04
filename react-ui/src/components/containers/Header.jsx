import React, { Component } from 'react';
import { connect } from 'react-redux';
import { partialMatch } from 'helpers/string';
import Header from 'components/LV3/Header';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import { withRouter } from 'react-router';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';
import ReactGA from 'react-ga';

class HeaderContainer extends Component {
  constructor(props) {
    super(props);

    const targetUrl = props.match ? props.match.url : '';
    let pagePathScrollPage = '';
    let isLinkRed = false;

    if (
      partialMatch(targetUrl, Path.about()) ||
      partialMatch(targetUrl, Path.howtouse()) ||
      partialMatch(targetUrl, Path.lp1Guest()) ||
      partialMatch(targetUrl, Path.lp1Guest2()) ||
      partialMatch(targetUrl, Path.lp2Guest()) ||
      partialMatch(targetUrl, Path.lp3Guest())
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

  watchCurrentPosition() {
    const { pagePathScrollPage } = this.state;
    let positionScrollPC = 0;
    let positionScrollSP = 0;

    if (pagePathScrollPage) {
      const positionScroll = this.scrollTop();

      if (this._isMounted) {
        this.setState({ isOverTopView: false });
      }

      if (partialMatch(pagePathScrollPage, Path.top())) {
        positionScrollPC = 450;
        positionScrollSP = 290;
      } else if (
        partialMatch(pagePathScrollPage, Path.about()) ||
        partialMatch(pagePathScrollPage, Path.howtouse()) ||
        partialMatch(pagePathScrollPage, Path.lp1Guest()) ||
        partialMatch(pagePathScrollPage, Path.lp1Guest2()) ||
        partialMatch(pagePathScrollPage, Path.lp2Guest()) ||
        partialMatch(pagePathScrollPage, Path.lp3Guest())
      ) {
        positionScrollPC = 540;
        positionScrollSP = 320;
      }

      if (window.parent.screen.width > 480) {
        if (positionScroll > positionScrollPC) {
          if (this._isMounted) {
            this.setState({ isOverTopView: true });
          }
        }
      } else if (positionScroll > positionScrollSP) {
        if (this._isMounted) {
          this.setState({ isOverTopView: true });
        }
      }
    }
  }

  render() {
    const {
      top,
      isLogin,
      isChecking,
      noHeaderButton,
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
        isPageLp123={
          partialMatch(pagePathScrollPage, Path.lp1Guest()) ||
          partialMatch(pagePathScrollPage, Path.lp1Guest2()) ||
          partialMatch(pagePathScrollPage, Path.lp2Guest()) ||
          partialMatch(pagePathScrollPage, Path.lp3Guest())
        }
        isPageLp1_2={
          partialMatch(pagePathScrollPage, Path.lp1Guest2()) // 命名あれなのわかってるが暫定的に by masaya
        }
        isLinkRed={isLinkRed}
        topUrl={Path.top()}
        isCheckingLogin={isChecking}
        noHeaderButton={noHeaderButton}
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
        onClickSearch={() => {
          ReactGA.event({
            category: 'Search',
            action: 'Tap Header Icon',
          });
          history.push(Path.top());
        }}
        aboutUrl={Path.about()}
        howtouseUrl={Path.howtouse()}
        helpUrl="https://help.monooq.com/"
        addSpace={{
          to: Path.createSpaceInfo(),
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

export default withRouter(connect(mapStateToProps)(HeaderContainer));
