// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/atomic/organisms/Header';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
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
};

class HeaderContainer extends Component<PropTypes> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(authActions.checkLogin());
  }

  onClickSearch: Function;
  onClickSearch = () => {
    const { dispatch, ui } = this.props;

    if (ui.showSearchField && ui.location) {
      this.search();
    } else {
      dispatch(uiActions.setUiState({ showSearchField: true }));
    }
  };

  onClickCloseSearch: Function;
  onClickCloseSearch = () => {
    const { dispatch } = this.props;
    dispatch(
      uiActions.setUiState({
        showSearchField: false,
        location: '',
      }),
    );
  };

  handleKeyDownSearch: Function;
  handleKeyDownSearch = e => {
    if (e && e.keyCode === 13 && e.target.value) {
      this.search();
    }
  };

  handleChangeSearchField: Function;
  handleChangeSearchField = (value: string) => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({ location: value }));
  };

  search: Function;
  search = () => {
    const { dispatch, ui, history } = this.props;
    history.push(`${Path.search()}?location=${ui.location}`);
    dispatch(uiActions.setUiState({ location: '', showSearchField: false }));
  };

  toggleMenu: Function;
  toggleMenu = () => {
    const { dispatch, ui } = this.props;

    if (ui.showMenu) {
      if (document && document.body) {
        document.body.style.overflowY = 'auto';
      }
    } else if (document && document.body) {
      document.body.style.overflowY = 'hidden';
    }

    dispatch(uiActions.setUiState({ showMenu: !ui.showMenu }));
  };

  closeMenu: Function;
  closeMenu = () => {
    const { dispatch } = this.props;

    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }

    dispatch(uiActions.setUiState({ showMenu: false }));
  };

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
        user={
          isLogin && user.Name
            ? {
                image: user.ImageUrl,
              }
            : null
        }
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
        menu={<ServiceMenu />}
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
