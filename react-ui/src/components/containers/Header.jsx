import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/LV3/Header';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import { withRouter } from 'react-router';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';

const PATH_TOP = '/';
const PATH_ABOUT = '/about';
const PATH_HOWTOUSE = '/howtouse';

class HeaderContainer extends Component {
  constructor(props) {
    super(props);

    const targetUrl = props.match ? props.match.url : '';
    let pagePathScrollPage = '';
    let isLinkRed = false;

    if (targetUrl === PATH_ABOUT || targetUrl === PATH_HOWTOUSE) {
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

      switch (pagePathScrollPage) {
        case PATH_TOP:
          positionScrollPC = 450;
          positionScrollSP = 290;
          break;
        case PATH_ABOUT:
        case PATH_HOWTOUSE:
          positionScrollPC = 540;
          positionScrollSP = 320;
          break;
        default:
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
        isScrollPage={pagePathScrollPage}
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
        onClickSearch={() => history.push(Path.top())}
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
