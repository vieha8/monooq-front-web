// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/LV3/Header';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import { withRouter } from 'react-router';
import Path from 'config/path';

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

  render() {
    const { isLogin, isChecking, noHeaderButton, user, unreadRooms } = this.props;
    return (
      <Header
        topUrl={Path.top()}
        isCheckingLogin={isChecking}
        noHeaderButton={noHeaderButton}
        user={
          isLogin
            ? {
                name: user.name,
                image: user.imageUrl,
              }
            : null
        }
        messageUrl={Path.messageList()}
        messageCount={unreadRooms}
        searchConditionUrl={Path.searchCondition()}
        spMenu={<ServiceMenu userName={user.name} userImage={user.imageUrl} isPhone />}
        homeUrl={Path.home()}
        loginUrl={Path.login()}
        signupUrl={Path.signUp()}
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
