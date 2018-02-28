import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';
import green from 'material-ui/colors/green';
import { defaultPageFactory } from '../../components/PageLayouts';
import authRequired from '../../components/Auth';
import { messagesActions } from '../../redux/modules/messages';

import styled from 'styled-components';
import { isMobileWindow, media } from '../../helpers/style/media-query';
import { Colors, Dimens } from '../../variables';

const MessagePage = styled.div`
  background: #fff;
  font-family: sans-serif;
`;

const MessageContainer = styled.div`
  width: 1048px;
  margin: 0 auto;
`;

const PageTitle = styled.div`
  font-size: 34px;
  line-height: 51px;
  letter-spacing: -0.5px;
  margin-bottom: 52px;
`;

const Information = props => {
  const Title = styled.div`
    font-size: 18px;
    line-height: 32px;
    margin-bottom: 15px;
  `;
  const Wrapper = styled.div`
    display: flex;
  `;
  const Image = styled.img`
    width: 104px;
    height: 79px;
    object-fit: cover;
    margin-right: 20px;
  `;

  const Area = styled.div`
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 5px;
    color: #e85258;
  `;

  const Description = styled.div`
    font-size: 12px;
    line-height: 18px;
  `;

  return (
    <div className={props.className}>
      <Title>ホストは YUKI HASHIDA さん</Title>
      <Wrapper>
        <Image src="https://picsum.photos/150?image=42" />
        <div>
          <Area>東京都 港区 六本木</Area>
          <Description>
            東京タワーに近くて便利！大きい荷物も何人分でもOK何人分で荷物も何人分でもOK何人分で…
          </Description>
        </div>
      </Wrapper>
    </div>
  );
};

const InformationContainer = styled.div`
  width: 328px;
  font-weiht: 100;
`;

const RecordsContainer = styled.div`
  width: 688px;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Record = props => {
  return <div className={props.className}>{props.text}</div>;
};

const StyledRecord = styled(Record)`
  float: left;
  max-width: 584px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #d6d6d6;
  padding: 20px;
  margin-right: auto;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 28px;
  font-weight: 100;
  word-wrap: break-word;
  ${props =>
    props.myMessage
      ? `
        float: right;
        background-color: #feebeb;
        margin-left: auto;
        border: 0;
    `
      : ''};
  ${props =>
    props.specialMessage
      ? `
        width: 300px;
        background-color: #d9ffe5;
        margin: auto;
        border: 0;
    `
      : ''};
`;

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      isSend: false,
      isSending: false,
    };

    this.pageTitle = 'Masaya Kudoさんとのメッセージ'; // TODO ルーム情報を取得する
    this.roomId = props.match.params.room_id; // TODO roomId書き換えで関係ないルームのデータを取得できないようにする
    this.props.dispatch(messagesActions.fetchMessagesStart(this.roomId));
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendTextMessage = () => {
    if (this.state.message === '') {
      return;
    }
    this.props.dispatch(
      messagesActions.sendMessage({
        roomId: this.roomId,
        userId: this.props.userId,
        text: this.state.message,
      }),
    );
    this.setState({ message: '' });
  };

  contents = () => {
    const { classes, messages, userId } = this.props;
    return (
      <div className={classes.root}>
        {messages.map(message => {
          const date = message.createDt.toLocaleDateString('ja-JP', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });

          const StyledDate = styled.div`
            font-size: 12px;
            line-height: 14px;
            color: #b4b4b4;
            float: right;
            margin-bottom: 20px;
          `;

          let RecordComponent = () => <StyledRecord myMessage date={date} text={message.text} />;

          let className = classes.myMessage;
          if (message.userId !== userId) {
            RecordComponent = () => <StyledRecord date={date} text={message.text} />;
          }

          return (
            <div key={message.id}>
              <RecordComponent />
              <div style={{ clear: 'both' }} />
              <StyledDate>{date}</StyledDate>
              <div style={{ clear: 'both' }} />
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    //TODO contents内にTextFieldいれるとonChangeの挙動がおかしくなるので仮でこの形に
    return (
      <MessagePage>
        <MessageContainer>
          <PageTitle>{this.pageTitle}</PageTitle>
          <FlexWrapper>
            <InformationContainer>
              <Information />
            </InformationContainer>

            <RecordsContainer>
              <this.contents />
              <Divider style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }} />
              <div style={{ padding: 20 }}>
                <TextField
                  id="message-text"
                  multiline
                  rows="4"
                  placeholder="メッセージを送る"
                  value={this.state.message}
                  onChange={this.handleChange('message')}
                  className={classes.textField}
                  margin="normal"
                  disabled={this.state.isSending}
                />
                <Button raised color="primary" fullWidth onClick={this.sendTextMessage}>
                  送信
                </Button>
                <Button
                  fullWidth
                  raised
                  color="secondary"
                  onClick={() => this.props.history.push('/estimate/1')}
                >
                  見積もりを送る
                </Button>
              </div>
            </RecordsContainer>
          </FlexWrapper>
        </MessageContainer>
      </MessagePage>
    );
  }
}

const styles = theme => ({
  textField: {
    width: '100%',
  },
});

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    isLoading: state.messages.isLoading,
    userId: state.auth.user.id,
  };
};

export default compose(withRouter, withStyles(styles), authRequired, connect(mapStateToProps))(
  Message,
);
