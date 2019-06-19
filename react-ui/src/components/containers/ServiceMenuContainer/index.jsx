// @flow

import React, { Component } from 'react';
import BurgerMenu from 'react-burger-menu';
import ServiceMenu from 'components/LV3/ServiceMenu';
import MenuWrapPhone from 'components/LV3/ServiceMenu/MenuWrapPhone';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { requestActions } from 'redux/modules/request';
import { userActions } from 'redux/modules/user';

import { authActions } from 'redux/modules/auth';

import connect from '../connect';

type PropTypes = {
  userName?: string,
  userImage?: string,
  isPhone?: boolean,
};

class ServiceMenuContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const { isLogin, dispatch } = this.props;
    if (isLogin) {
      // TODO: 利用状況画面の場合は2重実行になるため対策したい。
      dispatch(requestActions.fetchSchedule());
    }

    this.state = {
      currentMenu: 'slide',
      side: 'right',
    };
  }

  logout = () => {
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }

    const { dispatch } = this.props;
    dispatch(authActions.logout());
  };

  updatePurpose = () => {
    const { dispatch, user } = this.props;
    const body = this.state;
    body.isHost = !user.IsHost;
    dispatch(userActions.updateUser({ userId: user.ID, body }));
  };

  render() {
    const {
      isPhone,
      userName,
      userImage,
      dispatch,
      isLogin,
      unreadRooms,
      user,
      schedule,
    } = this.props;
    const { currentMenu, side } = this.state;

    let isSchedule = false;
    if (schedule && (schedule.user.length > 0 || schedule.host.length > 0)) {
      isSchedule = true;
    }

    if (isPhone) {
      const Menu = BurgerMenu[currentMenu];
      return (
        <MenuWrapPhone wait={20} side={side}>
          <Menu id={currentMenu} right>
            <ServiceMenu
              home={{ to: Path.home() }}
              message={{ to: Path.messages(), notificationCount: unreadRooms }}
              schedule={{ to: Path.schedule() }}
              spaces={{ to: Path.spaces() }}
              addSpace={{
                to: Path.createSpaceInfo(),
                onClick: () => dispatch(uiActions.setUiState({ space: {} })),
              }}
              sales={{ to: Path.sales() }}
              paymentHistory={{ to: Path.paid() }}
              editProfile={{ to: Path.editProfile() }}
              inquiry={{ to: Path.inquiry() }}
              howToUse={{ to: Path.howToUse() }}
              service={{ to: Path.service() }}
              userName={userName}
              userImage={userImage}
              isPhone
              isLogin={isLogin}
              isSchedule={isSchedule}
              isHost={user.IsHost || false}
              changePurposeEvent={{
                onClick: e => {
                  e.preventDefault();
                  this.updatePurpose();
                },
              }}
              logoutEvent={{
                onClick: e => {
                  e.preventDefault();
                  this.logout();
                },
              }}
            />
          </Menu>
        </MenuWrapPhone>
      );
    }

    return (
      <ServiceMenu
        home={{ to: Path.home() }}
        message={{ to: Path.messages(), notificationCount: unreadRooms }}
        schedule={{ to: Path.schedule() }}
        spaces={{ to: Path.spaces() }}
        addSpace={{
          to: Path.createSpaceInfo(),
          onClick: () => dispatch(uiActions.setUiState({ space: {} })),
        }}
        sales={{ to: Path.sales() }}
        paymentHistory={{ to: Path.paid() }}
        editProfile={{ to: Path.editProfile() }}
        help={{ href: 'https://help.monooq.com/' }}
        inquiry={{ to: Path.inquiry() }}
        howToUse={{ to: Path.howToUse() }}
        service={{ to: Path.service() }}
        isLogin={isLogin}
        isSchedule={isSchedule}
        isHost={user.IsHost || false}
        changePurposeEvent={{
          onClick: e => {
            e.preventDefault();
            this.updatePurpose();
          },
        }}
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
  user: state.auth.user,
  isLogin: state.auth.isLogin,
  unreadRooms: state.messages.unreadRooms,
  schedule: state.request.schedule,
});

export default connect(
  ServiceMenuContainer,
  mapStateToProps,
);
