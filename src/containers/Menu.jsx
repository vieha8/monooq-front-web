import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Menu from 'components/Menu';
import { authActions } from 'redux/modules/auth';
import Path from 'config/path';
import {uiActions} from "../redux/modules/ui";

class MenuContainer extends Component {
  logout = () => {
    const { dispatch } = this.props;
    dispatch(authActions.logout());
    window.location.href = Path.top();
  };

  onClickLink = () => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      showMenu: false,
    }));
  };

  render() {
    const { auth, showMobile } = this.props;
    return (
      <Menu
        showMobile={showMobile}
        userId={auth.user.ID}
        onClickLogout={this.logout}
        onClickLink={this.onClickLink}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(MenuContainer));
