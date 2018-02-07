import React from 'react';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { defaultPageFactory } from '../components/PageLayouts';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.pageTitle = 'Masaya Kudoさんとのメッセージ';
    this.contents = this.contents.bind(this);
  }

  contents() {
    const { classes, history } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.myMessage}>
          <small style={{ color: 'gray' }}>02/07 18:11</small>
          <br />
          はじめまして。日曜日夕方から月曜日昼まで、大型のキャリーケースとカメラの三脚（ケース入り、どちらも1畳分で余裕です）を預かっていただきたいのですが可能でしょうか？ご検討よろしくお願い致します。
        </div>
        <div style={{ clear: 'both' }} />
        <div className={classes.myMessage}>
          <small style={{ color: 'gray' }}>02/07 18:12</small>
          <br />
          あ、すみません追加で冷蔵庫もお願いできますでしょうか。
        </div>
        <div style={{ clear: 'both' }} />
        <div style={{}}>
          <Avatar style={{ float: 'left', marginLeft: 20, marginTop: 50 }}>MK</Avatar>
          <div className={classes.message}>
            <small style={{ color: 'gray' }}>02/07 20:34</small>
            <br />
            田中さん初めまして！メッセージありがとうございます。ぜひお預かりさせてください。
            2/11(日)〜2/12(月)の1日で、金額は2000円でいかがでしょうか。もしよろしければ田中さんの都合の良い場所まで車で引き取りに伺います。
          </div>
        </div>
      </div>
    );
  }

  render() {
    const Page = defaultPageFactory(this.pageTitle, this.contents);
    return <Page />;
  }
}

const styles = theme => ({
  root: {
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
  },
  myMessage: {
    float: 'right',
    maxWidth: 250,
    borderRadius: 5,
    backgroundColor: red[100],
    padding: 10,
    marginLeft: 'auto',
    marginRight: 20,
    marginBottom: 10,
    fontSize: 14,
    wordWrap: 'break-word',
  },
  message: {
    float: 'left',
    maxWidth: 250,
    borderRadius: 5,
    backgroundColor: grey[100],
    padding: 10,
    marginRight: 'auto',
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 14,
    wordWrap: 'break-word',
  },
});

export default withRouter(withStyles(styles)(Message));
