import React from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

class Accept extends React.Component {
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
            注意事項に同意の上承諾する
          </Button>
        </div>
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.accept}>
        <Typography type="body2">
          預かり開始日:2018/02/09<br />
          預かり終了日:2018/03/09<br />
          料金:¥20,000<br />
        </Typography>
        <Typography type="caption" style={{ marginTop: 10, marginBottom: 20 }}>
          【注意事項】<br />
          ・承諾するとリクエスト成立となります。<br />
          ・承諾後にキャンセルする場合はホストのキャンセルポリシーに従う必要があります。<br />
          ・みたいなことを色々と書く。<br />
        </Typography>
        {this.showSendButton()}
      </div>
    );
  }
}

const styles = () => ({
  accept: {
    width: '300px',
    margin: '0 auto',
    textAlign: 'center',
  },
});

export default withStyles(styles)(Accept);
