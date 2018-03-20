import React from 'react';
import { authConnect } from "../../components/Auth";
import { messagesActions } from 'redux/modules/messages';
import { uiActions } from 'redux/modules/ui';
import Page from 'components/Page';
import Menu from 'containers/Menu';
import {ContentContainer} from 'components/Page';

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
      }),
    );
  }

  handleChange = event => {
    this.props.dispatch(
      uiActions.setUiState({
        message: event.target.value,
      }),
    );
  };

  handleChangeFile = event => {
    this.props.dispatch(
      uiActions.setUiState({
        messageImage: event.target.files.item(0)
      }),
    );
  };

  sendTextMessage = () => {
    const { ui } = this.props;
    if (ui.message === '') {
      return;
    }
    this.props.dispatch(
      messagesActions.sendMessage({
        roomId: this.roomId,
        userId: this.props.userId,
        text: ui.message,
        image: ui.messageImage
      }),
    );
    this.props.dispatch(
      uiActions.setUiState({
        message: '',
      }),
    );
  };

  render() {
    return (
      <Page title="メッセージ">
        <Menu />
        <ContentContainer>
          <MessageLog {...this.props} />

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
  messages: state.messages.messages,
  isLoading: state.messages.isLoading,
  userId: state.auth.user.ID,
  ui: state.ui,
});

export default authConnect(mapStateToProps)(Message);
