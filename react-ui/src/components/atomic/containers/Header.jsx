// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/atomic/LV3/Header';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import { withRouter } from 'react-router';
import Path from 'config/path';

type PropTypes = {
  isChecking: boolean,
  isLogin: boolean,
  user: {
    ID: string,
    Name: string,
    ImageUrl: string,
  },
  top: boolean,
  help: boolean,
};

class HeaderContainer extends Component<PropTypes> {
  componentWillUnmount() {
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }
  }

  onClickSearch: Function;

  onClickSearch = () => {
    const { history } = this.props;
    history.push(Path.searchCondition());
  };

  render() {
    const { isLogin, isChecking, user, top, help } = this.props;

    return (
      <Header
        top={top}
        help={help}
        isCheckingLogin={isChecking}
        homeUri={Path.top()}
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
        otherUri={Path.other()}
        tidyUri="https://tidy.monooq.com/"
        messageUri={Path.messages()}
        messageCount={0}
        user={
          isLogin
            ? {
                name: user.Name,
                image: user.ImageUrl,
              }
            : null
        }
        loginUri={Path.login()}
        signupUri={Path.signUp()}
        menu={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  isChecking: state.auth.isChecking,
  isLogin: state.auth.isLogin,
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps)(HeaderContainer));
