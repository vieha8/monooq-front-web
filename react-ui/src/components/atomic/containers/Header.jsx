// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/atomic/LV3/Header';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import { withRouter } from 'react-router';
import Path from 'config/path';
import ReactGA from 'react-ga';

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

    ReactGA.event({
      category: 'Search',
      action: 'Push Header Search Button',
    });

    history.push(Path.searchCondition());
  };

  render() {
    const { isLogin, isChecking, user, top, help } = this.props;

    return (
      <Header
        top={top}
        help={help}
        isCheckingLogin={isChecking}
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
        spMenu={<ServiceMenu userName={user.Name} userImage={user.ImageUrl} isPhone />}
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
