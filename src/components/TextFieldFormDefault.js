// ユーザー登録(メールアドレス) > プロフィール入力
import React from 'react';
import TextField from 'material-ui/TextField';

const TextFieldFormDefault = ({ text }) => {
  return <TextField multiline label={text} fullWidth />;
};

export default TextFieldFormDefault;
