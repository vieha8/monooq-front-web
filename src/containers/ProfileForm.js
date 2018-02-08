// ユーザー登録(メールアドレス) > プロフィール入力
import React from 'react';
import Header from '../components/Header';
import Avator from '../components/Avator'
import InputForm from '../components/InputForm';
import SelectFormDefault from '../components/SelectFormDefault';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const ProfileForm = () => {
  return (
    <div style={{
      width: "90vw",
      margin: "0 auto",
    }}>
      <Header />
      <Typography type="title" component="h1">
        プロフィール編集
      </Typography>
      <hr color="#eee" />
      <div style={{textAlign:"center"}}>
        <Avator url="https://picsum.photos/300?image=65"/><br />
        <Button raised>写真を変更する</Button>
      </div>

      <div style={{textAlign:"center"}}>
        <InputForm text="名前" /><br />
        <InputForm text="メールアドレス" /><br />
        <InputForm text="電話番号" /><br />
        <SelectFormDefault />
      </div>

    </div>
  );
}

export default ProfileForm;
