import React from 'react';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PaymentDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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
  }

  sendRequest() {
    this.setState({ isSending: true });
    setTimeout(() => {
      this.setState({ isSend: true, isSending: false });
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
          <Button raised onClick={this.sendRequest} color="primary">
            送信
          </Button>
        </div>
      );
    }
  }

  showDialogContents() {
    const { classes } = this.props;

    if (this.state.isSend) {
      this.handleClose();
    } else {
      return (
        <div>
          <DialogTitle id="alert-dialog-slide-title">お支払い</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              VISA、Mastercard、JCB、Diners
              Club、AMEXのクレジットカードもしくはデビットカードがご利用いただけます。
            </DialogContentText>
            <TextField
              id="card-number"
              label="カード番号"
              type="text"
              placeholder="•••• •••• •••• ••••"
              className={classes.textField}
              disabled={this.state.isSending}
            />
            <TextField
              id="card-name"
              label="カード名義"
              type="text"
              placeholder="姓名"
              className={classes.textField}
              disabled={this.state.isSending}
            />
            <TextField
              id="card-limit"
              label="有効期限"
              type="text"
              placeholder="YY/MM"
              className={classes.textField}
              disabled={this.state.isSending}
            />
            <TextField
              id="card-security"
              label="セキュリティコード"
              type="text"
              placeholder="•••"
              className={classes.textField}
              disabled={this.state.isSending}
            />
            <br />
            <br />
            {this.showSendButton()}
          </DialogContent>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>
          お支払い
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
    marginTop: 10,
  },
});

export default withRouter(withStyles(styles)(PaymentDialog));
