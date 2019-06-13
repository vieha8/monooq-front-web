// @flow

import React, { Component } from 'react';
import BurgerMenu from 'react-burger-menu';
import ServiceMenu from 'components/LV3/ServiceMenu';
import MenuWrapPhone from 'components/LV3/ServiceMenu/MenuWrapPhone';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';

import { authActions } from 'redux/modules/auth';

import connect from '../connect';

type PropTypes = {
  userName?: String,
  userImage?: String,
  isPhone?: boolean,
};

class ServiceMenuContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);
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

  render() {
    const { isPhone, userName, userImage, dispatch, isLogin, unreadRooms } = this.props;

    if (isPhone) {
      const Menu = BurgerMenu[this.state.currentMenu];
      return (
        <MenuWrapPhone wait={20} side={this.state.side}>
          <Menu id={this.state.currentMenu} right>
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
              aboutMonooq={{ to: Path.aboutMonooq() }}
              userName={userName}
              userImage={userImage}
              isPhone
              isLogin={isLogin}
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
        aboutMonooq={{ to: Path.aboutMonooq() }}
        isLogin={isLogin}
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
});

export default connect(
  ServiceMenuContainer,
  mapStateToProps,
);
