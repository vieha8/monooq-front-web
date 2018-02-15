// ユーザー登録(メールアドレス)
import React from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../components/InputForm';
import Header from '../components/Header/';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

class Signup extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <div className={classes.signup}>
          <Typography component="p">
            荷物を預けるために<br />モノオクに登録をしましょう！
          </Typography>
          <InputForm text="メールアドレス" />
          <br />
          <InputForm text="パスワード" />
          <br />
          <InputForm text="確認用パスワード" />
          <br />
          <Button raised color="primary" component={Link} to={'/edit/profile/1'}>
            次へ
          </Button>
        </div>
      </div>
    );
  }
}

const styles = () => ({
  signup: {
    width: '300px',
    margin: '0 auto',
    textAlign: 'center',
  },
});

export default withStyles(styles)(Signup);
