import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';
import green from 'material-ui/colors/green';
import { defaultPageFactory } from '../../components/PageLayouts';
import authRequired from '../../components/Auth';
import { messagesActions } from '../../modules/messages';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      isSend: false,
      isSending: false,
    };

    this.pageTitle = 'Masaya Kudoさんとのメッセージ'; //TODO ルーム情報を取得する

    const roomId = props.match.params.room_id; //TODO roomId書き換えで関係ないルームのデータを取得できないようにする
    this.props.dispatch(messagesActions.fetchMessagesStart(roomId));
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  contents = () => {
    const { classes, messages } = this.props;
    const userId = '1'; //TODO auth reducerから取る
    return (
      <div className={classes.root}>
        {messages.map(message => {
          let className = classes.myMessage;
          if (message.userId !== userId) {
            className = classes.message;
          }

          const date = message.createDt.toLocaleDateString('ja-JP', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div key={message.id}>
              <div className={className}>
                <small style={{ color: 'gray' }}>{date}</small>
                <br />
                {message.text}
              </div>
              <div style={{ clear: 'both' }} />
            </div>
          );
        })}
        <Divider style={{ marginTop: 20, marginRight: 20, marginLeft: 20 }} />
        <div style={{ padding: 20 }}>
          <TextField
            id="message"
            multiline
            rows="4"
            placeholder="メッセージを送る"
            value={this.state.message}
            onChange={this.handleChange('message')}
            className={classes.textField}
            margin="normal"
            disabled={this.state.isSending}
          />
          <Button raised color="primary" fullWidth>
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
      </div>
    );
  };

  render() {
    const Page = defaultPageFactory(this.pageTitle, this.contents);
    return <Page />;
  }
}

const styles = theme => ({
  root: {
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
  },
  myMessage: {
    float: 'right',
    maxWidth: 200,
    borderRadius: 5,
    backgroundColor: red[100],
    padding: 10,
    marginLeft: 'auto',
    marginRight: 20,
    marginBottom: 10,
    fontSize: 14,
    wordWrap: 'break-word',
  },
  message: {
    float: 'left',
    maxWidth: 200,
    borderRadius: 5,
    backgroundColor: grey[100],
    padding: 10,
    marginRight: 'auto',
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 14,
    wordWrap: 'break-word',
  },
  specialMessage: {
    width: 300,
    borderRadius: 5,
    backgroundColor: green[100],
    padding: 10,
    margin: 'auto',
    marginBottom: 10,
    fontSize: 14,
    wordWrap: 'break-word',
  },
  textField: {
    width: '100%',
  },
});

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    isLoading: state.messages.isLoading,
  };
};

export default compose(withRouter, withStyles(styles), authRequired, connect(mapStateToProps))(
  Message,
);
