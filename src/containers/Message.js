import React from 'react';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';
import green from 'material-ui/colors/green';
import { defaultPageFactory } from '../components/PageLayouts';
import EstimateDialog from '../components/EstimateDialog';
import AcceptDialog from '../components/AcceptDialog';
import PaymentDialog from '../components/PaymentDialog';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      isSend: false,
      isSending: false,
    };

    this.pageTitle = 'Masaya Kudoさんとのメッセージ';
    this.contents = this.contents.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  contents() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.myMessage}>
          <small style={{ color: 'gray' }}>02/07 18:11</small>
          <br />
          はじめまして。日曜日夕方から月曜日昼まで、大型のキャリーケースとカメラの三脚（ケース入り、どちらも1畳分で余裕です）を預かっていただきたいのですが可能でしょうか？ご検討よろしくお願い致します。
        </div>
        <div style={{ clear: 'both' }} />
        <div className={classes.myMessage}>
          <small style={{ color: 'gray' }}>02/07 18:12</small>
          <br />
          あ、すみません追加で冷蔵庫もお願いできますでしょうか。
        </div>
        <div style={{ clear: 'both' }} />
        <div>
          <Avatar style={{ float: 'left', marginLeft: 20, marginTop: 50 }}>MK</Avatar>
          <div className={classes.message}>
            <small style={{ color: 'gray' }}>02/07 20:34</small>
            <br />
            田中さん初めまして！メッセージありがとうございます。ぜひお預かりさせてください。
            2/11(日)〜2/12(月)の1日で、金額は2000円でいかがでしょうか。もしよろしければ田中さんの都合の良い場所まで車で引き取りに伺います。
          </div>
        </div>
        <div style={{ clear: 'both' }} />
        <div className={classes.specialMessage}>
          <small style={{ color: 'gray' }}>02/07 18:12</small>
          <br />
          Masaya Kudoさんからの見積り<br />
          預かり開始日:2018/02/09<br />
          預かり終了日:2018/03/09<br />
          料金:¥20,000<br />
          <div style={{ textAlign: 'right' }}>
            <AcceptDialog />
          </div>
        </div>
        <div className={classes.specialMessage}>
          <small style={{ color: 'gray' }}>02/07 18:12</small>
          <br />
          リクエストが成立しました!<br />
          預かり開始日の前日までに、お支払いをお願いします。<br />
          <div style={{ textAlign: 'right' }}>
            <PaymentDialog />
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button color="secondary">キャンセル</Button>
          </div>
        </div>
        <div className={classes.specialMessage}>
          <small style={{ color: 'gray' }}>02/07 18:12</small>
          <br />
          お支払いが完了しました。<br />
        </div>
        <div style={{ clear: 'both' }} />
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
        </div>
        <EstimateDialog />
      </div>
    );
  }

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

export default withRouter(withStyles(styles)(Message));
