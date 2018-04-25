// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { messagesActions } from 'redux/modules/messages';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import InlineText from 'components/atomic/LV1/InlineText';
import Footer from 'components/atomic/LV2/Footer';
import LoadingPage from 'components/atomic/LV3/LoadingPage';
import InboxList from 'components/atomic/LV3/InboxList';

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
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { isLoading, rooms } = this.props;

    if (isLoading) {
      return <LoadingPage />;
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="メッセージ一覧"
        leftContent={<ServiceMenu />}
        rightContent={
          Array.isArray(rooms) && rooms.length > 0 ? (
            <InboxList
              messages={rooms.filter(room => room.user).map(message => ({
                link: Path.message(message.id),
                image: (message.user || {}).ImageUrl,
                name: (message.user || {}).Name,
                receivedAt: message.lastMessageDt,
              }))}
            />
          ) : (
            <InlineText.Base>メッセージはありません。</InlineText.Base>
          )
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
