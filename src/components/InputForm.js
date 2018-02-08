// ユーザー登録(メールアドレス)
import React from 'react';
import TextField from 'material-ui/TextField';

<<<<<<< HEAD
const InputForm = ({text}) => {
  return (
    <TextField
      id="location"
      label={text}
      className="inputForm"
      margin="normal"
    />
  );
}
=======
const InputForm = ({ text }) => {
  return <TextField id="location" placeholder={text} className="inputForm" margin="normal" />;
};
>>>>>>> c3cb94201d312dafee2d5d5cd48b21f80f836c23

export default InputForm;
