// @flow

import React, { Component } from 'react';
import Path from 'config/path';

import { messagesActions } from 'redux/modules/messages';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Messages from 'components/atomic/organisms/Messages';
import Header from 'components/atomic/containers/Header';
import Footer from 'components/atomic/molecules/Footer';
import LoadingPage from 'components/atomic/organisms/LoadingPage';

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
    };
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
    const { history, room } = this.props;
    history.push(Path.estimate(room.ID));
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
              recevedAt: message.createDt,
            },
          };
        case MessageType.Estimate: {
          const { startDate, endDate, price, requestId } = message;
          return {
            estimate: {
              name: room.user.Name,
              beginAt: startDate,
              endAt: endDate,
              price,
              link: Path.payment(match.params.message_room_id, requestId),
              receivedAt: message.createDt,
            },
          };
        }
        case MessageType.Completed:
          return {
            admin: {
              message: '決済が完了しました。スペース取引成立です！',
              receivedAt: message.createDt,
            },
          };
        default:
          break;
      }
      return {};
    });
  };

  render() {
    const { isLoading, user, room } = this.props;

    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    if (isLoading) {
      return <LoadingPage />;
    }

    const { text, image } = this.state;

    const messageList = this.createMessageList();

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="メッセージ一覧"
        leftContent={<ServiceMenu />}
        rightContent={
          <Messages
            onClickEstimate={this.transitionToEstimate}
            hostUser={room.space.Host.ID === user.ID}
            messages={messageList}
            onPickImage={this.handlePickImage}
            onChangeText={this.handleChangeText}
            text={text}
            pickedImage={(image || {}).preview}
            buttonDisabled={text === ''}
            onClickSend={this.sendMessage}
          />
        }
        footer={<Footer />}
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

export default connect(InboxContainer, mapStateToProps);
