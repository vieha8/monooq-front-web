import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationHeader from 'components/NavigationHeader';
import { uiActions } from 'redux/modules/ui';

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

  render() {
    const { ui, isLogin, isChecking } = this.props;

    return (
      <NavigationHeader
        loginChecking={isChecking}
        user={isLogin ? { name: 'テストユーザー', id: 'hogehoge' } : null}
        showMenu={ui.showMenu}
        onClickToggleMenu={this.toggleMenu}
      />
    );
  }
}

const mapStateToProps = state => ({
  isChecking: state.auth.isChecking,
  isLogin: state.auth.isLogin,
  ui: state.ui,
});

export default connect(mapStateToProps)(NavigationHeaderContainer);
