// ユーザー登録(メールアドレス)
import React from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../components/InputForm';
import Header from '../components/Header/';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const Signup = () => {
  return (
    <div>
      <Header />
      <div
        style={{
          textAlign: 'center',
          width: '300px',
          margin: '0 auto',
        }}
      >
        <Typography component="p">
          荷物を預けるために<br />モノオクに登録をしましょう！
        </Typography>
        <InputForm text="メールアドレス" />
        <br />
        <InputForm text="パスワード" />
        <br />
        <InputForm text="確認用パスワード" />
        <br />
        <Button raised color="primary" component={Link} to={'/edit/profile'}>
          次へ
        </Button>
      </div>
    </div>
  );
};

export default Signup;
