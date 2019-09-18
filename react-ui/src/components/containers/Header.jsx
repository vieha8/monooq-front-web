// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/LV3/Header';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import { withRouter } from 'react-router';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';

type PropTypes = {
  isChecking: boolean,
  isLogin: boolean,
  user: {
    id: string,
    name: string,
    imageUrl: string,
  },
};

class HeaderContainer extends Component<PropTypes> {
  componentWillUnmount() {
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }
  }

  logout = () => {
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }
    const { dispatch } = this.props;
    dispatch(authActions.logout());
  };

  render() {
    const { isLogin, isChecking, noHeaderButton, user, unreadRooms, dispatch } = this.props;
    return (
      <Header
        topUrl={Path.top()}
        isCheckingLogin={isChecking}
        noHeaderButton={noHeaderButton}
        user={
          isLogin
            ? {
                id: user.id,
                name: user.name,
                image: user.imageUrl,
                isHost: user.isHost,
              }
            : null
        }
        messageUrl={Path.messageList()}
        messageCount={unreadRooms}
        searchConditionUrl={Path.searchCondition()}
        spMenu={<ServiceMenu userName={user.name} userImage={user.imageUrl} isPhone />}
        loginUrl={Path.login()}
        signupUrl={Path.signUp()}
        addSpace={{
          to: Path.createSpaceInfo(),
          onClick: () => dispatch(uiActions.setUiState({ space: {} })),
        }}
        spaces={{ to: Path.spaces() }}
        sales={{ to: Path.sales() }}
        logoutEvent={{
          onClick: e => {
            e.preventDefault();
            this.logout();
          },
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  isChecking: state.auth.isChecking,
  isLogin: state.auth.isLogin,
  user: state.auth.user,
  unreadRooms: state.messages.unreadRooms,
});

export default withRouter(connect(mapStateToProps)(HeaderContainer));
