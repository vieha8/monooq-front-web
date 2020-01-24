import React, { Component } from 'react';
import Path from 'config/path';

import { messagesActions } from 'redux/modules/messages';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import LoadingPage from 'components/LV3/LoadingPage';
import MessageList from 'components/LV3/MessageList';
import SpaceDataNone from 'components/LV3/SpaceDataNone';
import { iskeyDownEnter } from 'helpers/keydown';

import { connect } from 'react-redux';
import withAuthRequire from 'components/hooks/withAuthRequire';

class MessageListPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(messagesActions.fetchRoomsStart());
  }

  historyToTop = () => {
    const { history } = this.props;
    history.push(Path.top());
  };

  onKeyDownButtonTop = e => {
    if (iskeyDownEnter(e)) {
      this.historyToTop();
    }
  };

  render() {
    const { isLoading, rooms } = this.props;
    if (isLoading) {
      return <LoadingPage size="large" />;
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
        buttonText="トップに戻る"
        onClick={this.historyToTop}
        onKeyDown={this.onKeyDownButtonTop}
      />
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.messages.rooms,
  isLoading: state.messages.isLoading,
});

export default withAuthRequire(
  ContentPageMenu(connect(mapStateToProps)(MessageListPage), {
    headline: 'メッセージ一覧',
  }),
);
