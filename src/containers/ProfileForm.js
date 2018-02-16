// ユーザー登録(メールアドレス) > プロフィール入力
import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import InputForm from '../components/InputForm';
import SelectFormDefault from '../components/SelectFormDefault';
import TextFieldFormDefault from '../components/TextFieldFormDefault';

import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

class ProfileForm extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="title" component="h1">
          プロフィール編集
        </Typography>
        <hr color="#eee" />
        <div className={classes.profileForm}>
          <Avatar src="https://picsum.photos/300?image=65" className={classes.avatar} />
          <br />
          <Button raised>写真を変更する</Button>
        </div>

        <div className={classes.form}>
          <InputForm text="名前" />
          <br />
          <InputForm text="メールアドレス" />
          <br />
          <InputForm text="電話番号" />
          <br />
          <SelectFormDefault />
          <TextFieldFormDefault text="あなたの紹介文" />
        </div>

        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Button raised color="primary" component={Link} to={'/profile/1'}>
            プロフィール登録
          </Button>
        </div>
      </div>
    );
  }
}

const styles = () => ({
  root: {
    width: '50vw',
    margin: '0 auto',
  },
  profileForm: {
    textAlign: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    margin: 'auto',
  },
  form: {
    width: '300px',
    margin: '0 auto',
  },
});

export default withStyles(styles)(ProfileForm);
