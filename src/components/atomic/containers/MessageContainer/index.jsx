// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { messagesActions } from 'redux/modules/messages';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Messages from 'components/atomic/LV3/Messages';
import Header from 'components/atomic/containers/Header';
import Loading from 'components/atomic/LV1/Loading';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  match: {
    params: {
      message_room_id: string,
    },
  },
  room: Array<{
    id: string,
    space: {
      Host: {
        ID: number,
        Name: string,
      },
    },
    user: {
      ID: number,
      ImageUrl: string,
      Name: string,
    },
    lastMessageDt: string,
  }>,
  isLoading: boolean,
};

type State = {
  text: string,
};

const MessageType = {
  Text: 1,
  Estimate: 2,
  Completed: 3,
};

class InboxContainer extends Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);

    checkLogin(this.props);

    const { dispatch, match } = this.props;
    const roomId = match.params.message_room_id;
    dispatch(messagesActions.fetchMessagesStart(roomId));

    this.state = {
      text: '',
      image: null,
      roomTitle: '',
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handlePickImage: Function;
  handlePickImage = (image: File) => {
    this.setState({ image });
  };

  handleChangeText: Function;
  handleChangeText = (text: string) => {
    this.setState({ text });
  };

  sendMessage: Function;
  sendMessage = () => {
    const { match, room, user, dispatch } = this.props;
    const { text, image } = this.state;

    if (text === '' && !image) {
      return;
    }

    dispatch(
      messagesActions.sendMessage({
        roomId: match.params.message_room_id,
        userId: user.ID,
        text,
        image,
        toUserId: room.user.ID,
      }),
    );

    this.setState({ text: '', image: null });
  };

  transitionToEstimate: Function;
  transitionToEstimate = () => {
    const { history, match } = this.props;
    history.push(Path.estimate(match.params.message_room_id));
  };

  createMessageList: Function;
  createMessageList = () => {
    const { messages, match, user, room } = this.props;
    return messages.map(message => {
      switch (message.messageType) {
        case MessageType.Text:
          if (message.userId === user.ID) {
            return {
              self: {
                message: message.text,
                image: message.image,
                sentAt: message.createDt,
              },
            };
          }
          return {
            other: {
              id: message.userId,
              userImage: room.user.ImageUrl,
              message: message.text,
              image: message.image,
              receivedAt: message.createDt,
            },
          };
        case MessageType.Estimate: {
          const { startDate, endDate, price, requestId } = message;
          return {
            estimate: {
              id: requestId,
              name: room.space.Host.Name,
              beginAt: startDate.toDate(),
              endAt: endDate.toDate(),
              price,
              link: Path.payment(match.params.message_room_id, requestId),
              receivedAt: message.createDt,
            },
          };
        }
        case MessageType.Completed:
          const { requestId } = message;
          return {
            admin: {
              message: `お見積りID:${requestId}\n決済が完了しました。スペース取引成立です！\nスペース所在地:${
                room.space.Address
              }`,
              receivedAt: message.createDt,
            },
          };
        default:
          break;
      }
      return {};
    });
  };

  rightContent = () => {
    const { isLoading, user, room } = this.props;
    const { text, image } = this.state;

    if (isLoading || !room) {
      return <Loading size="large" />;
    }

    const isHost = room.space.Host.ID === user.ID;
    const otherUserId = room.userId1 === user.ID ? room.userId2 : room.userId1;
    let roomTitle = `${room.space.Host.Name}さんと相談しましょう`;
    if (isHost) {
      roomTitle = `${room.user.Name}さんと相談しましょう`;
    }

    const firstMessage = {
      admin: {
        message: `スペース「${room.space.Title}」の利用について、${roomTitle}! \n`,
        link: {
          text: 'スペース詳細をみる',
          url: `/space/${room.space.ID}`,
        },
      },
    };

    const messageList = this.createMessageList();
    messageList.unshift(firstMessage);

    let lastReadDt = new Date(1990, 0, 1, 0, 0);
    if (room[`user${otherUserId}LastReadDt`]) {
      lastReadDt = room[`user${otherUserId}LastReadDt`].toDate();
    }

    return (
      <Messages
        onClickEstimate={this.transitionToEstimate}
        hostUser={isHost}
        messages={messageList}
        onPickImage={this.handlePickImage}
        onChangeText={this.handleChangeText}
        text={text}
        pickedImage={(image || {}).preview}
        buttonDisabled={text === '' && !image}
        onClickSend={this.sendMessage}
        lastReadDt={lastReadDt}
      />
    );
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="メッセージ"
        leftContent={<ServiceMenu />}
        rightContent={this.rightContent()}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    room: state.messages.room,
    messages: state.messages.messages,
    user: state.auth.user,
    isLoading: state.messages.isLoading,
  });

export default connect(
  InboxContainer,
  mapStateToProps,
);
