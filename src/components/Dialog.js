import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    open: false,
    multiline: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button raised color="secondary" onClick={this.handleClickOpen}>リクエスト</Button>
        <Dialog
          open={this.state.open}
          transition={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"どんなモノを預けたいですか?"}
          </DialogTitle>
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
            />
            <br/>
            <div style={{textAlign: 'center'}}>
            <Button raised onClick={this.handleClose} color="secondary">
              リクエストを送信
            </Button>
            </div>
            <Typography type="caption" align="center" style={{paddingTop:5}}>※まだ請求は発生しません</Typography>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
  },
  menu: {
    width: 200,
  },
});

export default withStyles(styles)(AlertDialogSlide);