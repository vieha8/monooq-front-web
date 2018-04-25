// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/atomic/LV3/Header';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import { withRouter } from 'react-router';
import Path from 'config/path';

type PropTypes = {
  dispatch: Function,
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
  constructor(props: PropTypes) {
    super(props);

    this.state = {
      showMenu: false,
      showSearchField: false,
      location: '',
    };
  }

  onClickSearch: Function;
  onClickSearch = () => {
    const { location, showSearchField } = this.state;

    if (showSearchField && location) {
      this.search();
    } else {
      this.setState({ showSearchField: true });
    }
  };

  onClickCloseSearch: Function;
  onClickCloseSearch = () => {
    this.setState({ location: '', showSearchField: false });
  };

  handleKeyDownSearch: Function;
  handleKeyDownSearch = e => {
    if (e && e.keyCode === 13 && e.target.value) {
      this.search();
    }
  };

  handleChangeSearchField: Function;
  handleChangeSearchField = (value: string) => {
    this.setState({ location: value });
  };

  search: Function;
  search = () => {
    const { history } = this.props;
    const { location } = this.state;
    history.push(`${Path.search()}?location=${location}`);
  };

  toggleMenu: Function;
  toggleMenu = () => {
    const { showMenu } = this.state;

    if (showMenu) {
      if (document && document.body) {
        document.body.style.overflowY = 'auto';
      }
    } else if (document && document.body) {
      document.body.style.overflowY = 'hidden';
    }

    this.setState({ showMenu: !showMenu });
  };

  closeMenu: Function;
  closeMenu = () => {
    if (document && document.body) {
      document.body.style.overflowY = 'auto';
    }

    this.setState({ showMenu: false });
  };

  render() {
    const { isLogin, isChecking, user, top, help } = this.props;

    if (isChecking) return null;

    const { showMenu, showSearchField } = this.state;

    return (
      <Header
        top={top}
        help={help}
        isCheckingLogin={isChecking}
        homeUri={Path.top()}
        searchUri={Path.search()}
        messageUri={Path.messages()}
        messageCount={0}
        user={
          isLogin && user.Name
            ? {
                image: user.ImageUrl,
              }
            : null
        }
        loginUri={Path.login()}
        signupUri={Path.signup()}
        onClickAvatar={this.toggleMenu}
        onClickSearchIcon={this.onClickSearch}
        onClickCloseSearch={this.onClickCloseSearch}
        showSearchField={showSearchField}
        onKeyDownSearch={this.handleKeyDownSearch}
        onChangeSearchField={this.handleChangeSearchField}
        onClickCloseMenu={this.closeMenu}
        showMenu={showMenu}
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
