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
  Admin: 4,
};

class MessagePage extends Component {
  constructor(props) {
    super(props);
    const { dispatch, match } = this.props;
    const roomId = match.params.message_room_id;
    dispatch(messagesActions.fetchMessagesStart(roomId));

    this.state = {
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

  componentDidUpdate() {
    const { messages, isLoading } = this.props;
    const messagesCount = messages.length;
    if (messagesCount > 0 && !isLoading) {
      const id = `message_item_${messagesCount}`;
      if (document.getElementById(id)) {
        const target = document.getElementById(id);
        target.scrollIntoView({
          inline: 'center',
          behavior: 'instant',
          block: 'center',
        });
      }
    }
  }

  createMessageList = isHost => {
    const { messages, match, user, room } = this.props;

    if (!messages) return false;

    return messages.map(message => {
      switch (message.messageType) {
        case MessageType.Text: {
          const imageUrl = message.image
            ? convertImgixUrl(message.image, 'fit=crop&auto=format&auto=compress')
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
              userImage: convertImgixUrl(room.user.imageUrl, 'fit=crop&auto=format&auto=compress'),
              message: message.text,
              image: imageUrl,
              receivedAt: message.createDt,
            },
          };
        }
        case MessageType.Estimate:
          {
            const { startDate, requestId, request } = message;
            if (request) {
              return {
                estimate: {
                  id: requestId,
                  name: (room.space.user || {}).name,
                  beginAt: startDate.toDate(),
                  price: request.price,
                  fee: request.fee,
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
        case MessageType.Completed:
          {
            const { request } = message;
            if (request) {
              return {
                admin: {
                  message: <Paid request={request} isHost={isHost} />,
                  receivedAt: message.createDt,
                },
              };
            }
          }
          break;
        case MessageType.Admin: {
          return {
            admin: {
              message: message.text,
              receivedAt: message.createDt,
            },
          };
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
    const { isLoading, user, room } = this.props;
    const { isOpenModalError } = this.state;

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

    return (
      <BaseTemplate>
        <SummaryMessage isHost={isHost} room={room} />
        <Messages
          messages={messageList}
          lastReadDt={lastReadDt}
          userIdFrom={user.id}
          userIdTo={room.user.id}
          hostUser={isHost}
          guest={isHost ? room.user : user}
          host={isHost ? user : room.user}
          space={room.space}
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
