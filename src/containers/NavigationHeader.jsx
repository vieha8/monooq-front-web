import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationHeader from 'components/NavigationHeader';
import { authActions } from 'redux/modules/auth';
import { uiActions } from 'redux/modules/ui';
import { withRouter } from 'react-router';
import Path from 'config/path';

const disusePage = [/\/maintenance/, /\/help*/];

class NavigationHeaderContainer extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(authActions.checkLogin());
  }

  onClickSearchIcon = () => {
    const { dispatch, ui } = this.props;

    if (ui.showSearchField && ui.keywordLocation) {
      this.search(ui.keywordLocation);
    } else {
      dispatch(uiActions.setUiState({
        showSearchField: true,
      }));
    }
  }

  onClickCloseSearch = () => {
    const { dispatch } = this.props;

    dispatch(uiActions.setUiState({
      showSearchField: false,
    }));
  }

  onKeyDownSearchField = (e) => {
    if (e && e.keyCode === 13 && e.target.value) {
      this.search(e.target.value);
    }
  }

  handleInputKeyword = (value) => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      keywordLocation: value,
    }));
  }

  search = (location) => {
    window.location.href = `${Path.search()}?location=${location}`;
  }

  toggleMenu = () => {
    const { dispatch, ui } = this.props;

    if (document.body) {
      if (ui.showMenu) {
        document.body.style.overflowY = 'auto';
      } else {
        document.body.style.overflowY = 'hidden';
      }
    }

    dispatch(uiActions.setUiState({
      showMenu: !ui.showMenu,
    }));
  }

  closeMenu = () => {
    const { dispatch } = this.props;
    if (document.body) {
      document.body.style.overflowY = 'auto';
    }
    dispatch(uiActions.setUiState({
      showMenu: false,
    }));
  }

  renderNavigationHeader() {
    const { ui, isLogin, isChecking, user } = this.props;
    return (
      <NavigationHeader
        loginChecking={isChecking}
        user={isLogin && user.Name ? user : null}
        showMenu={ui.showMenu}
        showSearchField={ui.showSearchField}
        onKeyDownSearchField={this.onKeyDownSearchField}
        onClickToggleMenu={this.toggleMenu}
        onClickSearchIcon={this.onClickSearchIcon}
        onClickCloseSearch={this.onClickCloseSearch}
        onChangeKeyword={this.handleInputKeyword}
        closeMenu={this.closeMenu}
      />
    );
  }


  render() {
    const { location } = this.props;

    let headerDisuse = false;
    disusePage.forEach((disuse) => {
      if (location.pathname.match(disuse)) {
        headerDisuse = true;
      }
    });

    if (headerDisuse) return null;

    return this.renderNavigationHeader();
  }
}

const mapStateToProps = state => ({
  isChecking: state.auth.isChecking,
  isLogin: state.auth.isLogin,
  ui: state.ui,
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps)(NavigationHeaderContainer));
