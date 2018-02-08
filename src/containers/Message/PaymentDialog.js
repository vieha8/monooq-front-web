import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { DialogContentText } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';

import { createDialog } from '../../components/Dialog';

const openButtonComponent = props => {
  return (
    <Button color="primary" {...props}>
      お支払い
    </Button>
  );
};

class ContentsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSending: false,
    };
  }

  sendRequest = () => {
    this.setState({ isSending: true });
    setTimeout(() => {
      this.setState({ isSending: false });
      this.props.handleClose();
    }, 2000);
  };

  showSendButton = () => {
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
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
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
      </div>
    );
  }
}

const styles = () => ({
  textField: {
    width: '100%',
    marginTop: 10,
  },
});

export default createDialog('お支払い', openButtonComponent, withStyles(styles)(ContentsComponent));
