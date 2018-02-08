// ユーザー登録(メールアドレス) > プロフィール入力
import React from 'react';
import TextField from 'material-ui/TextField';

const TextFieldFormDefault = () => {
  return (
    <TextField
      multiline
      label="あなたの紹介文"
    />
  );
}

export default TextFieldFormDefault;
