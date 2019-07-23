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
  top: boolean,
};

class HeaderContainer extends Component<PropTypes> {
  componentWillUnmount() {
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }
  }

  render() {
    const { isLogin, isChecking, noHeaderButton, user, top, unreadRooms } = this.props;
    return (
      <Header
        top={top}
        isCheckingLogin={isChecking}
        noHeaderButton={noHeaderButton}
        topUri={Path.top()}
        homeUri={Path.home()}
        editProfileUri={Path.editProfile()}
        searchUri={Path.search()}
        searchConditionUri={Path.searchCondition()}
        scheduleUri={Path.schedule()}
        createSpaceInfoUri={Path.createSpaceInfo()}
        spacesUri={Path.spaces()}
        salesUri={Path.sales()}
        helpUri="https://help.monooq.com/"
        inquiryUri={Path.inquiry()}
        howToUseUri={Path.howToUse()}
        serviceUri={Path.service()}
        tidyUri="https://tidy.monooq.com/"
        messageUri={Path.messages()}
        messageCount={unreadRooms}
        user={
          isLogin
            ? {
                name: user.name,
                image: user.imageUrl,
              }
            : null
        }
        loginUri={Path.login()}
        signupUri={Path.signUp()}
        spMenu={<ServiceMenu userName={user.name} userImage={user.imageUrl} isPhone />}
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
