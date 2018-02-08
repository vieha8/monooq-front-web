// ユーザー登録(メールアドレス)
import React from 'react';
import TextField from 'material-ui/TextField';

const InputForm = ({text}) => {
  return (
    <TextField
      id="location"
      placeholder={text}
      className="inputForm"
      margin="normal"
    />
  );
}

export default InputForm;
