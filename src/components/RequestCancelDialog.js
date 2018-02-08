import React from 'react';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Divider from 'material-ui/Divider';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class RequestCancelDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
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
          <Button raised onClick={this.sendRequest} color="secondary">
            キャンセルする
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
          <DialogTitle id="alert-dialog-slide-title">キャンセル確認</DialogTitle>
          <DialogContent>
            <Typography type="body4">
              預かり開始日:2018/02/09<br />
              預かり終了日:2018/03/09<br />
              料金:¥20,000<br />
            </Typography>
            <Typography type="caption" style={{ marginTop: 10, marginBottom: 20 }}>
              【注意事項】<br />
              ・キャンセルはホスト(もしくはユーザー)からの評価が下がる可能性があります。<br />
              ・みたいなことを色々と書く。
            </Typography>
            {this.showSendButton()}
          </DialogContent>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Button color="secondary" onClick={this.handleClickOpen}>
          キャンセル
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

export default withRouter(withStyles(styles)(RequestCancelDialog));
