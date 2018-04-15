// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import Footer from 'components/atomic/molecules/Footer';
import LoadingPage from 'components/atomic/organisms/LoadingPage';
import EditProfile from 'components/atomic/organisms/EditProfile';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

type PropTypes = {
  ui: {
    name: string,
    email: string,
    prefCode: string,
    profile: string,
    image: string,
  },
};

type State = {
  name: string,
  email: string,
  prefCode: string,
  profile: string,
  image: string,
};

class ProfileContainer extends Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);

    checkLogin(this.props);

    this.state = {
      ...props.ui,
    };
  }

  render() {
    const { isLoading } = this.props;

    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    if (isLoading) {
      return <LoadingPage />;
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="プロフィールを編集する"
        leftContent={<ServiceMenu />}
        rightContent={<EditProfile />}
        footer={<Footer />}
      />
    );
  }
}

const mapStateToProps = state => {
  let initialUI = {};

  if (!state.ui.editProfile && state.auth.user.Name) {
    const user = state.auth.user;
    initialUI = {
      name: user.Name,
      email: user.Email,
      prefCode: user.PrefCode,
      profile: user.Profile,
      image: user.ImageUrl,
    };
  }

  return mergeAuthProps(state, {
    ui: initialUI,
    user: state.auth.user,
    error: state.error,
    updateSuccess: state.user.updateSuccess,
    isLoading: state.user.isLoading,
  });
};

export default connect(ProfileContainer, mapStateToProps);
