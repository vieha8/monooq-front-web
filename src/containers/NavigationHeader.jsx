import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationHeader from 'components/NavigationHeader';
import { uiActions } from 'redux/modules/ui';
import { withRouter } from 'react-router';

const disusePage = ['/maintenance', '/help'];

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
    const { ui, isLogin, isChecking, user } = this.props;
    return (
      <NavigationHeader
        loginChecking={isChecking}
        user={isLogin ? user : null}
        showMenu={ui.showMenu}
        onClickToggleMenu={this.toggleMenu}
      />
    );
  }


  render() {
    const { location } = this.props;

    return (
      disusePage.includes(location.pathname)
        ? ''
        : this.renderNavigationHeader()
    );
  }
}

const mapStateToProps = state => ({
  isChecking: state.auth.isChecking,
  isLogin: state.auth.isLogin,
  ui: state.ui,
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps)(NavigationHeaderContainer));
