// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/atomic/organisms/Header';
import ServiceMenu from 'components/atomic/organisms/ServiceMenu';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';
import { withRouter } from 'react-router';
import Path from 'config/path';

type PropTypes = {
  dispatch: Function,
  ui: {
    showMenu: boolean,
    showSearchField: boolean,
    location: string,
  },
  isChecking: boolean,
  isLogin: boolean,
  user: {

  },
  top: boolean,
  help: boolean,
}

class HeaderContainer extends Component<PropTypes> {
  onClickSearch = () => {
    const { dispatch, ui } = this.props;

    if (ui.showSearchField && ui.location) {
      this.search();
    } else {
      dispatch(uiActions.setUiState({ showSearchField: true }));
    }
  }

  handleKeyDownSearch = (e) => {
    const { dispatch, ui } = this.props;

    if (e && e.keyCode === 13 && e.target.value) {
      this.search();
    }
  }

  handleChangeSearchField = (value: string) => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({ location: value }));
  }

  search = () => {
    const { dispatch, ui, history } = this.props;
    history.push(`${Path.search()}?location=${ui.location}`);
    dispatch(uiActions.setUiState({ location: '', showSearchField: false }));
  }

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
    const { dispatch } = this.props;

    document.body.style.overflowY = 'auto';

    dispatch(uiActions.setUiState({
      showMenu: false,
    }));
  }

  logout = () => {
    document.body.style.overflowY = 'auto';
    const { dispatch } = this.props;
    dispatch(authActions.logout());
  }

  render() {
    const { ui, isLogin, isChecking, user, top, help } = this.props;

    return (
      <Header
        top={top}
        help={help}
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
        onClickSearchIcon={this.onClickSearch}
        showSearchField={ui.showSearchField}
        onKeyDownSearch={this.handleKeyDownSearch}
        onChangeSearchField={this.handleChangeSearchField}
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
