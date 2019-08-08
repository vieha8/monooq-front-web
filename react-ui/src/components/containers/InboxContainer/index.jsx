// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { messagesActions } from 'redux/modules/messages';

import ServiceMenu from 'components/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import Header from 'components/containers/Header';
import Loading from 'components/LV1/Loading';
import MessageList from 'components/LV3/MessageList';
import SpaceDataNone from 'components/LV3/SpaceDataNone';
import { iskeyDownEnter } from 'helpers/keydown';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

type PropTypes = {
  dispatch: Function,
  rooms: Array<{
    id: string,
    user: {
      id: number,
      imageUrl: string,
      name: string,
    },
    lastMessageDt: string,
  }>,
  isLoading: boolean,
};

class InboxContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    const { dispatch } = this.props;
    dispatch(messagesActions.fetchRoomsStart());
  }

  historyToHome = () => {
    const { history } = this.props;
    history.push(Path.home());
  };

  onKeyDownButtonHome = e => {
    if (iskeyDownEnter(e)) {
      this.historyToHome();
    }
  };

  leftContent = () => {
    const { isLoading, rooms } = this.props;

    if (isLoading) {
      return <Loading size="large" />;
    }

    return Array.isArray(rooms) && rooms.length > 0 ? (
      <MessageList
        messages={rooms
          .filter(room => room.user)
          .map(message => ({
            link: Path.message(message.id),
            image: (message.user || {}).imageUrl,
            name: (message.user || {}).name,
            receivedAt: message.lastMessageDt,
            lastMessage: message.lastMessage,
            isRead: message.isRead,
          }))}
      />
    ) : (
      <SpaceDataNone
        captionHead="メッセージのやり取りがありません"
        caption="メッセージがありません。ご希望のスペースを見つけて連絡を取ってみましょう。"
        buttonText="ホームへ戻る"
        onClick={this.historyToHome}
        onKeyDown={this.onKeyDownButtonHome}
      />
    );
  };

  render() {
    return (
      <MenuPageTemplate
        header={<Header />}
        headline="メッセージ一覧"
        leftContent={this.leftContent()}
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.messages.rooms,
  isLoading: state.messages.isLoading,
});

export default authRequired(connect(mapStateToProps)(InboxContainer));
