import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

class RequestCancel extends React.Component {
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
          <Button raised onClick={this.sendRequest} color="secondary">
            キャンセルする
          </Button>
        </div>
      );
    }
  }

  showDialogContents() {
    if (this.state.isSend) {
      this.handleClose();
    } else {
      return (
        <div>
          <DialogTitle id="alert-dialog-slide-title">キャンセル確認</DialogTitle>
          <DialogContent>
            <Typography type="body2">
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
    const { classes } = this.props;
    return <div className={classes.cancel}>{this.showDialogContents()}</div>;
  }
}

const styles = theme => ({
  cancel: {
    width: '300px',
    margin: '0 auto',
    textAlign: 'center',
  },
  textField: {
    width: '100%',
    marginTop: 10,
  },
});

export default withStyles(styles)(RequestCancel);
