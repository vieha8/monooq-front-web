// @flow

import React, { Component } from 'react';
import BurgerMenu from 'react-burger-menu';
import ServiceMenu from 'components/LV3/ServiceMenu';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';
import connect from '../connect';

type PropTypes = {
  userName?: string,
  userImage?: string,
};

class ServiceMenuContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);
    this.state = {
      currentMenu: 'slide',
      isOpen: false,
    };
  }

  logout = () => {
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }

    const { dispatch } = this.props;
    dispatch(authActions.logout());
  };

  handleStateChange(state) {
    this.setState({ isOpen: state.isOpen });
  }

  render() {
    const { userName, userImage, dispatch, isLogin, user, schedule } = this.props;
    const { currentMenu, isOpen } = this.state;

    let isSchedule = false;
    if (schedule && (schedule.user.length > 0 || schedule.host.length > 0)) {
      isSchedule = true;
    }

    const Menu = BurgerMenu[currentMenu];
    return (
      <Menu
        id={currentMenu}
        width={300}
        right
        isOpen={isOpen}
        onStateChange={state => this.handleStateChange(state)}
        className={isOpen ? 'open' : 'close'}
      >
        <ServiceMenu
          signupUrl={{ to: Path.signUp() }}
          loginUrl={{ to: Path.login() }}
          top={{ to: Path.top() }}
          schedule={{ to: Path.schedule() }}
          spaces={{ to: Path.spaces() }}
          addSpace={{
            to: Path.createSpaceInfo(),
            onClick: () => dispatch(uiActions.setUiState({ space: {} })),
          }}
          sales={{ to: Path.sales() }}
          paymentHistory={{ to: Path.paid() }}
          help={{ href: 'https://help.monooq.com/' }}
          inquiry={{ to: Path.inquiry() }}
          userId={user.id}
          userName={userName}
          userImage={userImage}
          isLogin={isLogin}
          isSchedule={isSchedule}
          isHost={user.isHost || false}
          logoutEvent={{
            onClick: e => {
              e.preventDefault();
              this.logout();
            },
          }}
        />
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isLogin: state.auth.isLogin,
  schedule: state.request.schedule,
});

export default connect(
  ServiceMenuContainer,
  mapStateToProps,
);
