import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Menu from 'components/Menu';
import { authActions } from 'redux/modules/auth';
import Path from 'config/path';

class MenuContainer extends Component {
  logout = () => {
    const { dispatch, history } = this.props;
    dispatch(authActions.logout());
    history.push(Path.top());
  }

  render() {
    const { auth, showMobile } = this.props;
    return (
      <Menu
        showMobile={showMobile}
        userId={auth.user.id}
        onClickLogout={this.logout}  
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(MenuContainer));
