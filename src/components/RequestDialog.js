import React from 'react';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      multiline: '',
      isSend: false,
      isSending: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.showDialogContents = this.showDialogContents.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.showSendButton = this.showSendButton.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false, isSend: false });
    // this.props.history.push('/search/東京都');
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendRequest() {
    this.setState({ isSending: true });
    setTimeout(() => {
      this.setState({ isSend: true, isSending: false, multiline: '' });
    }, 2000);
  }

  showSendButton() {
    if (this.state.isSending) {
      return (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: 'center' }}>
          <Button raised onClick={this.sendRequest} color="secondary">
            リクエストを送信
          </Button>
        </div>
      );
    }
  }

  showDialogContents() {
    const { classes } = this.props;

    if (this.state.isSend) {
      return (
        <div>
          <DialogTitle id="alert-dialog-slide-title">{'送信完了'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              リクエストありがとうございます。ホストからの連絡をしばらくお待ち下さい。
            </DialogContentText>
            <div style={{ textAlign: 'center' }}>
              <Button raised onClick={this.handleClose} color="primary">
                閉じる
              </Button>
            </div>
          </DialogContent>
        </div>
      );
    } else {
      return (
        <div>
          <DialogTitle id="alert-dialog-slide-title">{'どんなモノを預けたいですか?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              預けたい期間、預けるモノの内容・大きさなどなるべく具体的に伝えてみましょう。
            </DialogContentText>
            <TextField
              id="multiline-flexible"
              multiline
              rows="7"
              placeholder="はじめまして。日曜日夕方から月曜日昼まで、大型のキャリーケースとカメラの三脚（ケース入り、どちらも1畳分で余裕です）を預かっていただきたいのですが可能でしょうか？ご検討よろしくお願い致します。"
              value={this.state.multiline}
              onChange={this.handleChange('multiline')}
              className={classes.textField}
              margin="normal"
              disabled={this.state.isSending}
            />
            <br />
            {this.showSendButton()}
            <Typography type="caption" align="center" style={{ paddingTop: 5 }}>
              ※まだ請求は発生しません
            </Typography>
          </DialogContent>
        </div>
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button raised color="secondary" onClick={this.handleClickOpen}>
          リクエスト
        </Button>
        <Dialog
          open={this.state.open}
          transition={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {this.showDialogContents()}
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  textField: {
    width: '100%',
  },
});

export default withRouter(withStyles(styles)(AlertDialogSlide));
