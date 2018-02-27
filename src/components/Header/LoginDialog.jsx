import React from 'react';
import { connect } from 'redux';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { uiActions } from '../../redux/modules/ui';
import { createDialog } from 'components/Dialog';

const openButtonComponent = props => <Button {...props}>ログイン</Button>;

class ContentsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(uiActions.setUiState({
      isSending: false,
    }));
  }

  sendRequest = () => {
    this.props.dispatch(uiActions.setUiState({
      isSending: true,
    }));

    setTimeout(() => {
      this.props.dispatch(uiActions.setUiState({
        isSending: false,
      }));
      this.props.handleClose();
    }, 2000);
  };

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
        <Button raised onClick={this.sendRequest} color="primary">
          ログイン
        </Button>
      </div>
    );
  };

  render() {
    const { classes, ui } = this.props;
    return (
      <div>
        <TextField
          id="email"
          label="メールアドレス"
          type="email"
          placeholder="xxx@xxx.com"
          className={classes.textField}
          disabled={ui.isSending}
        />
        <TextField
          id="password"
          label="パスワード"
          type="password"
          placeholder="••••••••"
          className={classes.textField}
          disabled={ui.isSending}
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

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(createDialog('ログイン', openButtonComponent, withStyles(styles)(ContentsComponent)));
