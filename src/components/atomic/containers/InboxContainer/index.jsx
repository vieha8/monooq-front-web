// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { messagesActions } from 'redux/modules/messages';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import Footer from 'components/atomic/molecules/Footer';
import LoadingPage from 'components/atomic/organisms/LoadingPage';
import InboxList from 'components/atomic/organisms/InboxList';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  rooms: Array<{
    id: string,
    user: {
      ID: number,
      ImageUrl: string,
      Name: string,
    },
    lastMessageDt: string,
  }>,
  isLoading: boolean,
};

class InboxContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    checkLogin(this.props);

    const { dispatch } = this.props;
    dispatch(messagesActions.fetchRoomsStart());
  }

  render() {
    const { isLoading, rooms } = this.props;

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
        headline="メッセージ一覧"
        leftContent={<ServiceMenu />}
        rightContent={
          <InboxList
            messages={rooms.map(message => ({
              link: Path.message(message.id),
              image: (message.user || {}).ImageUrl,
              name: (message.user || {}).Name,
              recevedAt: message.lastMessageDt,
            }))}
          />
        }
        footer={<Footer />}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    rooms: state.messages.rooms,
    isLoading: state.messages.isLoading,
  });

export default connect(InboxContainer, mapStateToProps);
