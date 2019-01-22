// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Path from 'config/path';
import { Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/atomic/LV1/InlineText';

import { messagesActions } from 'redux/modules/messages';

import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Messages from 'components/atomic/LV3/Messages';
import Header from 'components/atomic/containers/Header';
import Loading from 'components/atomic/LV1/Loading';
import HeroImage from 'components/atomic/LV1/HeroImage';
import HostInfo from 'components/atomic/LV2/Space/HostInfo';
import UserInfo from 'components/atomic/LV2/Space/UserInfo';

import { convertImgixUrl } from 'helpers/imgix';
import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

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

class MessageContainer extends Component<PropTypes, State> {
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

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handlePickImage: Function;
  handlePickImage = (image: File) => {
    image.preview = URL.createObjectURL(image);
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
          let imageUrl = message.image;
          if (imageUrl) {
            imageUrl = convertImgixUrl(message.image, 'fit=crop&format=auto');
          }

          if (message.userId === user.ID) {
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
              userImage: convertImgixUrl(room.user.ImageUrl, 'fit=crop&format=auto'),
              message: message.text,
              image: imageUrl,
              receivedAt: message.createDt,
            },
          };
        case MessageType.Estimate: {
          const { startDate, endDate, price, requestId, request } = message;
          return {
            estimate: {
              id: requestId,
              name: room.space.Host.Name,
              beginAt: startDate.toDate(),
              endAt: endDate.toDate(),
              price,
              link: Path.payment(match.params.message_room_id, requestId),
              receivedAt: message.createDt,
              status: request.Status,
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

  leftContent = () => {
    const { isLoading, user, room } = this.props;
    const { text, image } = this.state;

    if (isLoading || !room) {
      return <Loading size="large" />;
    }

    const isHost = room.space.Host.ID === user.ID;
    const otherUserId = room.userId1 === user.ID ? room.userId2 : room.userId1;

    const messageList = this.createMessageList();

    let lastReadDt = new Date(1990, 0, 1, 0, 0);
    if (room[`user${otherUserId}LastReadDt`]) {
      lastReadDt = room[`user${otherUserId}LastReadDt`].toDate();
    }

    return (
      <Fragment>
        <TopWrap>
          {isHost ? (
            <UserInfo
              id={room.user.ID}
              name={room.user.Name}
              imageUrl={room.user.ImageUrl}
              hostinfo
              message
            />
          ) : (
            <HostInfo
              id={room.space.Host.ID}
              name={room.space.Host.Name}
              imageUrl={room.space.Host.ImageUrl}
              hostinfo
              message
            />
          )}
          <Row to={Path.space(room.space.ID)}>
            <ImageWrapper>
              <HeroImage small src={room.space.Images[0].ImageUrl} />
            </ImageWrapper>
            <ContentWrapper>
              <AddressText>
                {room.space.AddressPref}
                {room.space.AddressCity}
                {room.space.AddressTown}
              </AddressText>
              <TitleText>{room.space.Title}</TitleText>
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
          buttonDisabled={text === '' && !image}
          onClickSend={this.sendMessage}
          lastReadDt={lastReadDt}
        />
      </Fragment>
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
        leftContent={this.leftContent()}
        rightContent={<ServiceMenu />}
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
  MessageContainer,
  mapStateToProps,
);
