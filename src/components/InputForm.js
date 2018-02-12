// ユーザー登録(メールアドレス)
import React from 'react';
import TextField from 'material-ui/TextField';

const InputForm = ({ text }) => {
  return <TextField label={text} className="inputForm" margin="normal" fullWidth />;
};

export default InputForm;
