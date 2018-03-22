import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationHeader from 'components/NavigationHeader';
import { uiActions } from 'redux/modules/ui';
import { withRouter } from 'react-router';
import Path from 'config/path';

const disusePage = [/\/maintenance/, /\/help*/];

class NavigationHeaderContainer extends Component {
  onClickSearchIcon = () => {
    const { dispatch } = this.props;

    dispatch(uiActions.setUiState({
      showSearchField: true,
    }));
  }

  onKeyDownSearchField = (e) => {
    if (e && e.keyCode === 13 && e.target.value) {
      window.location.href = `${Path.search()}?location=${e.target.value}`;
    }
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

  renderNavigationHeader() {
    const { ui, isLogin, isChecking, user } = this.props;
    return (
      <NavigationHeader
        loginChecking={isChecking}
        user={isLogin ? user : null}
        showMenu={ui.showMenu}
        showSearchField={ui.showSearchField}
        onKeyDownSearchField={this.onKeyDownSearchField}
        onClickToggleMenu={this.toggleMenu}
        onClickSearchIcon={this.onClickSearchIcon}
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
