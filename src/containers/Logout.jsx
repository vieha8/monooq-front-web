import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import Menu from 'containers/Menu';
import Logout from 'components/Logout';
import { authActions } from 'redux/modules/auth';

class LogoutContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(authActions.logout());
  }

  render() {
    return (
      <Page title="ログアウト">
        <Menu />
        <Logout />
      </Page>
    );
  }
}

export default connect()(LogoutContainer);
