// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { messagesActions } from 'redux/modules/messages';

import ServiceMenu from 'components/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import Header from 'components/containers/Header';
import Loading from 'components/LV1/Loading';
import InboxList from 'components/LV3/InboxList';
import NoDataView from 'components/LV3/NoDataView';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

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

    const { dispatch } = this.props;
    dispatch(messagesActions.fetchRoomsStart());
  }

  leftContent = () => {
    const { isLoading, rooms, history } = this.props;

    if (isLoading) {
      return <Loading size="large" />;
    }

    return Array.isArray(rooms) && rooms.length > 0 ? (
      <InboxList
        messages={rooms
          .filter(room => room.user)
          .map(message => ({
            link: Path.message(message.id),
            image: (message.user || {}).ImageUrl,
            name: (message.user || {}).Name,
            receivedAt: message.lastMessageDt,
            lastMessage: message.lastMessage,
            isRead: message.isRead,
          }))}
      />
    ) : (
      <NoDataView
        captionHead="メッセージのやり取りがありません"
        caption="メッセージがありません。ご希望のスペースを見つけて連絡を取ってみましょう。"
        buttonText="ホームへ戻る"
        onClick={() => history.push(Path.home())}
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
