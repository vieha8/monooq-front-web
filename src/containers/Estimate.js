import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';

class Estimate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      price: 20000,
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
        <div className={classes.estimate}>
          <DialogTitle id="alert-dialog-slide-title">見積り</DialogTitle>
          <DialogContent>
            {/*<DialogContentText id="alert-dialog-slide-description">*/}
            {/*預けたい期間、預けるモノの内容・大きさなどなるべく具体的に伝えてみましょう。*/}
            {/*</DialogContentText>*/}
            <TextField
              id="date-start"
              label="預かり開始日"
              type="date"
              defaultValue="2018-02-09"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={this.state.isSending}
            />
            <TextField
              id="date-end"
              label="預かり終了日"
              type="date"
              defaultValue="2018-03-09"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={this.state.isSending}
            />
            <TextField
              id="number"
              label="料金"
              value={this.state.price}
              onChange={this.handleChange('price')}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              disabled={this.state.isSending}
            />
            <br />
            {this.showSendButton()}
          </DialogContent>
        </div>
      );
    }
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <div>{this.showDialogContents()}</div>
      </div>
    );
  }
}

const styles = theme => ({
  estimate: {
    width: '300px',
    margin: '0 auto',
  },
  textField: {
    width: '100%',
    marginTop: 10,
  },
});

export default withStyles(styles)(Estimate);
