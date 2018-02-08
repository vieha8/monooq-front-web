// ユーザー登録(メールアドレス) > プロフィール入力
// 汎用的なアバター
import React from 'react';

const Avator = ({url}) => {
  return (
    <img
      src={url}
      style={{
        width: "150px",
        borderRadius: "75px",
      }}
    />
  );
}

export default Avator;
