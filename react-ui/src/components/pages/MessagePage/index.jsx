import React, { Component } from 'react';
import { connect } from 'react-redux';
import Path from 'config/path';
import { convertImgixUrl } from 'helpers/imgix';
import { messagesActions } from 'redux/modules/messages';
import withAuthRequire from 'components/hooks/withAuthRequire';
import BaseTemplate from 'components/templates/BaseTemplate';
import Paid from 'components/LV2/Message/Paid';
import Messages from 'components/LV3/Messages';
import LoadingPage from 'components/LV3/LoadingPage';
import SummaryMessage from 'components/LV3/Messages/SummaryMessage';
import ModalToProfileEdit from 'components/LV3/ModalToProfileEdit';

const MessageType = {
  Text: 1,
  Estimate: 2,
  Completed: 3,
};

class MessagePage extends Component {
  constructor(props) {
    super(props);
    const { dispatch, match } = this.props;
    const roomId = match.params.message_room_id;
    dispatch(messagesActions.fetchMessagesStart(roomId));

    this.state = {
      text: '',
      image: null,
      isErrorPickImage: false,
      isOpenModalError: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const isEstimated = nextProps.messages.filter(v => v.messageType === 2).length > 0;
    if (isEstimated && (!nextProps.user.email || !nextProps.user.phoneNumber)) {
      return { isOpenModalError: true };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const messagesCount = this.props.messages.length;
    if (messagesCount > 0 && prevProps.isLoading && !this.props.isLoading) {
      const last = messagesCount + 1;
      const id = `message_item_${last}`;
      if (document.getElementById(id)) {
        const target = document.getElementById(id);
        target.scrollIntoView({
          inline: 'center',
          behavior: 'instant',
          block: 'center',
        });
      }
    }
    if (prevState.text.length === 0 && this.state.text.length > 0) {
      window.addEventListener('beforeunload', this.handleBeforeUnload);
    }
    if (prevState.text.length > 0 && this.state.text.length === 0) {
      window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  handleBeforeUnload = e => {
    e.preventDefault();
    e.returnValue = '未送信のメッセージが取り消されますが、よろしいですか?';
  };

  setStatucPickImage = () => {
    this.setState({ isErrorPickImage: true });
  };

  handlePickImage = image => {
    image.preview = URL.createObjectURL(image);
    this.setState({ image, isErrorPickImage: false });
  };

  handleChangeText = text => {
    this.setState({ text });
  };

  sendMessage = () => {
    const { match, room, user, dispatch } = this.props;
    const { text, image } = this.state;

    if (text === '' && !image) {
      return;
    }

    dispatch(
      messagesActions.sendMessage({
        roomId: match.params.message_room_id,
        userId: user.id,
        text,
        image,
        toUserId: room.user.id,
      }),
    );

    this.setState({ text: '', image: null });
  };

  transitionToEstimate = () => {
    const { history, match } = this.props;
    history.push(Path.estimate(match.params.message_room_id));
  };

  createMessageList = isHost => {
    const { messages, match, user, room } = this.props;

    if (!messages) return false;

    return messages.map(message => {
      switch (message.messageType) {
        case MessageType.Text: {
          const imageUrl = message.image
            ? convertImgixUrl(message.image, 'fit=crop&auto=format')
            : '';

          if (message.userId === user.id) {
            return {
              self: {
                message: message.text,
                image: imageUrl,
                sentAt: message.createDt,
              },
            };
          }
          return {
            other: {
              id: message.userId,
              userImage: convertImgixUrl(room.user.imageUrl, 'fit=crop&auto=format'),
              message: message.text,
              image: imageUrl,
              receivedAt: message.createDt,
            },
          };
        }
        case MessageType.Estimate:
          {
            const { startDate, endDate, price, requestId, request } = message;
            if (request) {
              return {
                estimate: {
                  id: requestId,
                  name: (room.space.user || {}).name,
                  beginAt: startDate.toDate(),
                  endAt: endDate.toDate(),
                  price,
                  link: Path.payment(match.params.message_room_id, requestId),
                  receivedAt: message.createDt,
                  status: request.status,
                  payType: request.payType,
                  econtextUrl: request.paymentUrl,
                },
              };
            }
          }
          break;
        case MessageType.Completed: {
          const { request } = message;
          if (request) {
            if (isHost) {
              return {
                admin: {
                  message: `【決済が完了しました】\n見積もりID:${request.id}\nスペース取引成立です！下記住所をゲストにお伝えしました。\n\nスペース所在地:${request.space.address}`,
                  receivedAt: message.createDt,
                },
              };
            }

            return {
              admin: {
                message: <Paid request={request} />,
                receivedAt: message.createDt,
              },
            };
          }
          break;
        }
        default:
          break;
      }
      return {};
    });
  };

  getModalText = () => {
    return (
      <p>
        ご契約を進めるにはメールアドレス及び電話番号の登録が必要です。
        <br />
        <br />
        取引時の保険適用の条件となります。
        <br />
        また、緊急時のご連絡先として利用させて頂く場合がございます。
        <br />
      </p>
    );
  };

  render() {
    const { isLoading, user, room, messages } = this.props;
    const { text, image, isErrorPickImage, isOpenModalError } = this.state;

    if (isLoading || !room) {
      return <LoadingPage size="large" />;
    }

    const isHost = room.space.user.id === user.id;
    const otherUserId = room.userId1 === user.id ? room.userId2 : room.userId1;

    const messageList = this.createMessageList(isHost);

    let lastReadDt = new Date(1990, 0, 1, 0, 0);
    if (room[`user${otherUserId}LastReadDt`]) {
      lastReadDt = room[`user${otherUserId}LastReadDt`].toDate();
    }

    const isEstimated = messages.filter(v => v.messageType === 2).length > 0;
    const isRegisterEmailPhoneNumber =
      !isEstimated || (isEstimated && !!user.email && !!user.phoneNumber);

    return (
      <BaseTemplate>
        <SummaryMessage isHost={isHost} room={room} />
        <Messages
          onClickEstimate={this.transitionToEstimate}
          hostUser={isHost}
          messages={messageList}
          setStatucPickImage={this.setStatucPickImage}
          onPickImage={this.handlePickImage}
          onChangeText={this.handleChangeText}
          text={text}
          pickedImage={(image || {}).preview}
          isErrorPickImage={isErrorPickImage}
          buttonDisabled={
            isOpenModalError ||
            (text.trim().length === 0 && !image) ||
            isErrorPickImage ||
            !isRegisterEmailPhoneNumber
          }
          onClickSend={this.sendMessage}
          lastReadDt={lastReadDt}
          isOpenModalError={isOpenModalError}
        />
        {isOpenModalError && (
          <ModalToProfileEdit
            header="メールアドレス及び電話番号をご登録ください"
            content={this.getModalText()}
          />
        )}
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => ({
  room: state.messages.room,
  messages: state.messages.messages,
  user: state.auth.user,
  isLoading: state.messages.isLoading,
});

export default withAuthRequire(connect(mapStateToProps)(MessagePage));
