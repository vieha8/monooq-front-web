import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import { createDialog } from '../../components/Dialog';

const openButtonComponent = props => <Button {...props}>ログイン</Button>;

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
            ログイン
          </Button>
        </div>
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          id="email"
          label="メールアドレス"
          type="email"
          placeholder="xxx@xxx.com"
          className={classes.textField}
          disabled={this.state.isSending}
        />
        <TextField
          id="password"
          label="パスワード"
          type="password"
          placeholder="••••••••"
          className={classes.textField}
          disabled={this.state.isSending}
        />
        <br />
        <br />
        {this.showSendButton()}
        <br />
        <Typography type="caption">
          メールアドレス・パスワードを忘れた方は<Link to="">こちら</Link>
        </Typography>
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

export default createDialog('ログイン', openButtonComponent, withStyles(styles)(ContentsComponent));
