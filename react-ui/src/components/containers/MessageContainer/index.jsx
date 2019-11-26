import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'semantic-ui-react';
import Path from 'config/path';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import handleBeforeUnload from 'components/hocs/HandleBeforeUnload';
import { Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/LV1/Texts/InlineText';
import Messages from 'components/LV3/Messages';
import LoadingPage from 'components/LV3/LoadingPage';
import ImageHero from 'components/LV1/Images/ImageHero';
import InfoHost from 'components/LV2/Space/InfoHost';
import InfoUser from 'components/LV2/Space/InfoUser';
import { convertImgixUrl } from 'helpers/imgix';
import { messagesActions } from 'redux/modules/messages';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { uiActions } from '../../../redux/modules/ui';

const TopWrap = styled.div`
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${Colors.borderGray};
`;

const Row = styled(Link)`
  display: table;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 100px;
`;

const ContentWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding-left: 16px;
`;

const AddressText = styled(InlineText.Base)`
  display: block;
  color: ${Colors.brandPrimary};
`;

const TitleText = styled(InlineText.Small)`
  display: block;
  ${media.phone`
    font-size: ${FontSizes.small_12}px;
  `};
`;

const MessageType = {
  Text: 1,
  Estimate: 2,
  Completed: 3,
};

class MessageContainer extends Component {
  constructor(props) {
    super(props);
    const { dispatch, match } = this.props;
    const roomId = match.params.message_room_id;
    dispatch(messagesActions.fetchMessagesStart(roomId));

    this.state = {
      text: '',
      image: null,
      errorModal: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.user.email || !nextProps.user.phoneNumber) {
      return { errorModal: true };
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

  handlePickImage = image => {
    image.preview = URL.createObjectURL(image);
    this.setState({ image });
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

  createMessageList = () => {
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
            return {
              admin: {
                message: `お見積もりID:${request.id}\n決済が完了しました。スペース取引成立です！\nスペース所在地:${request.space.address}`,
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

  close = () => this.setState({ errorModal: false });

  onClickProfileEdit = () => {
    const { history, dispatch, location } = this.props;
    dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
    history.push(Path.profileEdit());
  };

  render() {
    const { isLoading, user, room } = this.props;
    const { text, image, errorModal } = this.state;

    if (isLoading || !room) {
      return <LoadingPage size="large" />;
    }

    const isHost = room.space.user.id === user.id;
    const otherUserId = room.userId1 === user.id ? room.userId2 : room.userId1;

    const messageList = this.createMessageList();

    let lastReadDt = new Date(1990, 0, 1, 0, 0);
    if (room[`user${otherUserId}LastReadDt`]) {
      lastReadDt = room[`user${otherUserId}LastReadDt`].toDate();
    }

    const isRegisterEmailPhoneNumber = !!user.email && !!user.phoneNumber;

    return (
      <Fragment>
        <TopWrap>
          {isHost ? (
            <InfoUser
              id={room.user.id}
              name={(room.user || {}).name}
              imageUrl={room.user.imageUrl}
              infoHost
              message
            />
          ) : (
            <InfoHost
              id={room.space.user.id}
              name={(room.space.user || {}).name}
              imageUrl={room.space.user.imageUrl}
              infoHost
              message
            />
          )}
          <Row to={Path.space(room.space.id)}>
            <ImageWrapper>
              <ImageHero small src={room.space.images[0].imageUrl} />
            </ImageWrapper>
            <ContentWrapper>
              <AddressText>
                {room.space.addressPref}
                {room.space.addressCity}
                {room.space.addressTown}
              </AddressText>
              <TitleText>{room.space.title}</TitleText>
            </ContentWrapper>
          </Row>
        </TopWrap>
        <Messages
          onClickEstimate={this.transitionToEstimate}
          hostUser={isHost}
          messages={messageList}
          onPickImage={this.handlePickImage}
          onChangeText={this.handleChangeText}
          text={text}
          pickedImage={(image || {}).preview}
          buttonDisabled={(text === '' && !image) || !isRegisterEmailPhoneNumber}
          onClickSend={this.sendMessage}
          lastReadDt={lastReadDt}
        />
        <Modal size="large" open={errorModal} onClose={this.close}>
          <Modal.Header>メールアドレス及び電話番号をご登録ください</Modal.Header>
          <Modal.Content>
            <p>
              メッセージのやり取りにはメールアドレス及び電話番号の登録が必要です。
              <br />
              <br />
              取引時の保険適用の条件となります。
              <br />
              また、緊急時のご連絡先として利用させて頂く場合がございます。
              <br />
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button className="brandPrimary" onClick={this.onClickProfileEdit}>
              登録画面へ進む
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  room: state.messages.room,
  messages: state.messages.messages,
  user: state.auth.user,
  isLoading: state.messages.isLoading,
});

export default authRequired(ContentPageMenu(connect(mapStateToProps)(MessageContainer), {}));
