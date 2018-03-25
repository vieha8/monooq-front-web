import React from 'react';
import { authConnect } from 'components/Auth';
import { messagesActions } from 'redux/modules/messages';
import { uiActions } from 'redux/modules/ui';
import Page, { ContentContainer } from 'components/Page';
import Menu from 'containers/Menu';

import Form from './Form';
import MessageLog from './MessageLog';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.roomId = props.match.params.message_room_id; // TODO roomId書き換えで関係ないルームのデータを取得できないようにする
    this.props.dispatch(messagesActions.fetchMessagesStart(this.roomId));
    this.props.dispatch(
      uiActions.setUiState({
        message: '',
        isSend: false,
        isSending: false,
        roomId: this.roomId,
      }),
    );
  }

  onClickEstimate = (estimate) => {
    const { dispatch, history } = this.props;
    dispatch(uiActions.setUiState({
      estimate: {
        ...estimate.estimate,
        linkUrl: estimate.linkUrl,
        space: estimate.space,
      },
    }));
    history.push(estimate.linkUrl);
  }

  handleChange = (event) => {
    this.props.dispatch(
      uiActions.setUiState({
        message: event.target.value,
      }),
    );
  };

  handleChangeFile = (image) => {
    this.props.dispatch(
      uiActions.setUiState({
        messageImage: image,
      }),
    );
  };

  sendTextMessage = () => {
    const { ui } = this.props;
    if (ui.message === '' && !ui.messageImage) {
      return;
    }
    this.props.dispatch(
      messagesActions.sendMessage({
        roomId: this.roomId,
        userId: this.props.userId,
        text: ui.message,
        image: ui.messageImage,
        toUserId: this.props.room.user.ID,
      }),
    );
    this.props.dispatch(
      uiActions.setUiState({
        message: '',
        messageImage: null,
      }),
    );
  };

  render() {
    if (this.props.isLoading || !this.props.room) {
      return null;
    }

    return (
      <Page title={`${this.props.room.user.Name}さんとのメッセージ`}>
        <Menu />
        <ContentContainer>
          <MessageLog
            {...this.props}
            onClickEstimate={this.onClickEstimate}
          />
          <Form
            {...this.props}
            handleChange={this.handleChange}
            handleChangeFile={this.handleChangeFile}
            sendTextMessage={this.sendTextMessage}
          />
        </ContentContainer>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  room: state.messages.room,
  messages: state.messages.messages,
  isLoading: state.messages.isLoading,
  userId: state.auth.user.ID,
  ui: state.ui,
});

export default authConnect(mapStateToProps)(Message);
