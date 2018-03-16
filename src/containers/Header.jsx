// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/organisms/Header';
import ServiceMenu from 'components/organisms/ServiceMenu';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';
import { withRouter } from 'react-router';
import Path from 'config/path';

type PropTypes = {
  dispatch: Function,
  ui: {
    showMenu: boolean,
  },
  isChecking: boolean,
  isLogin: boolean,
  user: {

  },
}

class HeaderContainer extends Component<PropTypes> {
  toggleMenu = () => {
    const { dispatch, ui } = this.props;

    if (ui.showMenu) {
      document.body.style.overflowY = 'auto';
    } else {
      document.body.style.overflowY = 'hidden';
    }

    dispatch(uiActions.setUiState({
      showMenu: !ui.showMenu,
    }));
  }

  closeMenu = () => {
    const { dispatch, ui } = this.props;

    document.body.style.overflowY = 'auto';

    dispatch(uiActions.setUiState({
      showMenu: false,
    }));
  }

  logout = () => {
    const { dispatch } = this.props;
    dispatch(authActions.logout());
  }

  render() {
    const { ui, isLogin, isChecking, user } = this.props;

    return (
      <Header
        isCheckingLogin={isChecking}
        homeUri={Path.top()}
        searchUri={Path.search()}
        messageUri={Path.messages()}
        messageCount={0}
        user={isLogin ? {
          image: '',
          name: '',
        } : null}
        loginUri={Path.login()}
        signupUri={Path.signup()}
        onClickAvatar={this.toggleMenu}
        onClickCloseMenu={this.closeMenu}
        showMenu={ui.showMenu}
        menu={(
          <ServiceMenu
            message={{ href: Path.message(), notificationCount: 0 }}
            schedule={{ href: Path.schedule(user.id), notificationCount: 0 }}
            spaces={{ href: Path.spaces(user.id) }}
            addSpace={{ href: Path.createSpaceInfo() }}
            salesTransfer={{ href: Path.salesTransfers(user.id) }}
            paymentHistory={{ href: Path.paid(user.id) }}
            becomeHost={{ href: Path.createSpaceInfo() }}
            editProfile={{ href: Path.editProfile(user.id) }}
            inquiry={{ href: Path.inquiry(user.id) }}
            logout={{ onClick: () => this.logout() }}
            hasSpace
          />
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  isChecking: state.auth.isChecking,
  isLogin: state.auth.isLogin,
  ui: state.ui,
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps)(HeaderContainer));
