import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import { uiActions } from 'redux/modules/ui';

class Estimate extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(uiActions.setUiState({
      open: false,
      price: 20000,
      isSend: false,
      isSending: false,
    }));
  }

  handleClickOpen = () => {
    this.props.dispatch(uiActions.setUiState({
      open: true,
    }));
  };

  handleClose = () => {
    this.props.dispatch(uiActions.setUiState({
      open: false,
      isSend: false,
    }));
    // this.props.history.push('/search/東京都');
  }

  handleChange = (event) => {
    this.props.dispatch(uiActions.setUiState({
      price: event.target.value,
    }));
  };

  sendRequest = () => {
    this.props.dispatch(uiActions.setUiState({
      isSending: true,
    }));
    setTimeout(() => {
      this.props.dispatch(uiActions.setUiState({
        isSend: true, isSending: false, multiline: '',
      }));
    }, 2000);
  }

  showSendButton = () => {
    const { ui } = this.props;
    if (ui.isSending) {
      return (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Button raised onClick={this.sendRequest} color="secondary">
          送信
        </Button>
      </div>
    );
  }

  showDialogContents = () => {
    const { classes, ui } = this.props;

    if (ui.isSend) {
      this.handleClose();
    }
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
            disabled={ui.isSending}
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
            disabled={ui.isSending}
          />
          <TextField
            id="number"
            label="料金"
            value={ui.price}
            onChange={this.handleChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            disabled={ui.isSending}
          />
          <br />
          {this.showSendButton()}
        </DialogContent>
      </div>
    );
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

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(withStyles(styles)(Estimate));
