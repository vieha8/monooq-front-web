import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Path from 'config/path';
import { partialMatch } from 'helpers/string';
import { getSafeValue } from 'helpers/properties';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';
import HeaderComponent from 'components/LV3/Header/View';
import LPLink from './LPLink';

// TODO function component化
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverTopView: false,
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

  isLp = path => {
    return (
      partialMatch(path, Path.lp1Guest()) ||
      partialMatch(path, Path.lp1Guest2()) ||
      partialMatch(path, Path.lp2Guest()) ||
      partialMatch(path, Path.lp2Guest2()) ||
      partialMatch(path, Path.lp3Guest()) ||
      partialMatch(path, Path.lp1Host())
    );
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
      partialMatch(path, Path.login()) ||
      this.isLpGuest(path)
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

      if (
        partialMatch(path, Path.about()) ||
        partialMatch(path, Path.howtouse()) ||
        this.isLpGuest(path)
      ) {
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
    const { schedule, dispatch, history } = this.props;

    const { isOverTopView } = this.state;

    let isSchedule = false;
    if (schedule && (schedule.user.length > 0 || schedule.host.length > 0)) {
      isSchedule = true;
    }

    const nowPath = window.location.pathname;
    const isTop = nowPath === '/';

    const noHeaderButton =
      this.isSignUpProfile(nowPath) ||
      partialMatch(nowPath, Path.lp1Host()) ||
      this.isLpGuest(nowPath);
    const noLinkLogo = this.isSignUpProfile(nowPath);

    const isLp = this.isLp(nowPath);

    return (
      <Fragment>
        <HeaderComponent
          isTop={isTop}
          isOverTopView={isOverTopView}
          isLinkRed={this.isLinkRed()}
          noHeaderButton={noHeaderButton}
          noLinkLogo={noLinkLogo}
          onClickSignup={() => history.push(Path.signUp())} // TODO View側に移す
          addSpace={{
            to: Path.spaceCreate1(),
            onClick: () => dispatch(uiActions.setUiState({ space: {} })),
          }}
          isSchedule={isSchedule}
          logoutEvent={{
            onClick: e => {
              e.preventDefault();
              this.logout();
            },
          }}
        />
        {isLp && (
          <LPLink
            isOverTopView={isOverTopView}
            isPageLp123Guest={this.isLpGuest(nowPath)}
            isPageLp12GuestLinkTop={this.isLpGuest2(nowPath)}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  schedule: state.request.schedule,
});

export default withRouter(connect(mapStateToProps)(Header));
