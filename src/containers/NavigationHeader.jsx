import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import NavigationHeader from 'components/NavigationHeader';
import { uiActions } from 'redux/modules/ui';
import { withRouter } from 'react-router';

const disusePage = [ '/maintenance' ];

class NavigationHeaderContainer extends Component {
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
    const { ui, isLogin, isChecking, location } = this.props;
    return (
      <NavigationHeader
        loginChecking={isChecking}
        user={isLogin ? { name: 'テストユーザー', id: 'hogehoge' } : null}
        showMenu={ui.showMenu}
        onClickToggleMenu={this.toggleMenu}
      />
    );
  }


  render() {
    const { ui, isLogin, isChecking, location } = this.props;

    return (
      location.pathname == disusePage[0]
        ? ""
        : this.renderNavigationHeader()
    );
  }
}

const mapStateToProps = state => ({
  isChecking: state.auth.isChecking,
  isLogin: state.auth.isLogin,
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(NavigationHeaderContainer));
