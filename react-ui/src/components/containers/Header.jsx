// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/LV3/Header';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import { withRouter } from 'react-router';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';

type PropTypes = {
  isChecking: boolean,
  isLogin: boolean,
  user: {
    id: string,
    name: string,
    imageUrl: string,
  },
};

class HeaderContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);
    this.state = {
      isTop: !!props.top,
      isOverTopView: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', () => this.watchCurrentPosition(), true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll');
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
    let tgt;
    if ('scrollingElement' in document) {
      tgt = document.scrollingElement;
    } else if (this.browser.isWebKit) {
      tgt = document.body;
    } else {
      tgt = document.documentElement;
    }
    const scrollTop = (tgt && tgt.scrollTop) || 0;
    return Math.max(window.pageYOffset, scrollTop);
  };

  watchCurrentPosition() {
    const { isTop } = this.state;
    if (isTop) {
      const positionScroll = this.scrollTop();
      this.setState({ isOverTopView: false });

      if (window.parent.screen.width > 480) {
        if (positionScroll > 450) {
          this.setState({ isOverTopView: true });
        }
      } else if (positionScroll > 290) {
        this.setState({ isOverTopView: true });
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

    const { isOverTopView } = this.state;

    let isSchedule = false;
    if (schedule && (schedule.user.length > 0 || schedule.host.length > 0)) {
      isSchedule = true;
    }

    return (
      <Header
        isOverTopView={isOverTopView}
        top={top}
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
