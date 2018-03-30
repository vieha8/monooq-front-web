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
    ID: string,
    Name: string,
    ImageUrl: string,
  },
  top: boolean,
  help: boolean,
}

class HeaderContainer extends Component<PropTypes> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(authActions.checkLogin());
  }

  onClickSearch = () => {
    const { dispatch, ui } = this.props;

    if (ui.showSearchField && ui.location) {
      this.search();
    } else {
      dispatch(uiActions.setUiState({ showSearchField: true }));
    }
  }

  onClickCloseSearch = () => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      showSearchField: false,
      location: '',
    }));
  }

  handleKeyDownSearch = (e) => {
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
      document.body && (
        document.body.style.overflowY = 'auto'
      );
    } else {
      document.body && (
        document.body.style.overflowY = 'hidden'
      );
    }

    dispatch(uiActions.setUiState({
      showMenu: !ui.showMenu,
    }));
  }

  closeMenu = () => {
    const { dispatch } = this.props;

    document.body && (
      document.body.style.overflowY = 'auto'
    );

    dispatch(uiActions.setUiState({
      showMenu: false,
    }));
  }

  logout = () => {
    document.body && (
      document.body.style.overflowY = 'auto'
    );

    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      showMenu: false,
    }));
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
        user={(isLogin && user.Name) ? {
          image: user.ImageUrl,
        } : null}
        loginUri={Path.login()}
        signupUri={Path.signup()}
        onClickAvatar={this.toggleMenu}
        onClickSearchIcon={this.onClickSearch}
        onClickCloseSearch={this.onClickCloseSearch}
        showSearchField={ui.showSearchField}
        onKeyDownSearch={this.handleKeyDownSearch}
        onChangeSearchField={this.handleChangeSearchField}
        onClickCloseMenu={this.closeMenu}
        showMenu={ui.showMenu}
        menu={(
          <ServiceMenu
            message={{ href: Path.message(), notificationCount: 0 }}
            schedule={{ href: Path.schedule(user.ID), notificationCount: 0 }}
            spaces={{ href: Path.spaces(user.ID) }}
            addSpace={{ href: Path.createSpaceInfo() }}
            salesTransfer={{ href: Path.salesTransfers(user.ID) }}
            paymentHistory={{ href: Path.paid(user.ID) }}
            becomeHost={{ href: Path.createSpaceInfo() }}
            editProfile={{ href: Path.editProfile(user.ID) }}
            inquiry={{ href: Path.inquiry(user.ID) }}
            logout={{ onClick: (e) => { e.preventDefault(); this.logout(); } }}
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
