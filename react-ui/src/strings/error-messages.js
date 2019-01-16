import numeral from 'numeral';

export default {
  PleaseInput: '入力してください。',
  PleaseSelect: '選択してください。',
  PriceMin: val => `登録できる料金目安は${numeral(val).format('0,0')}円以上です。`,
  PriceMax: val => `登録できる料金目安は${numeral(val).format('0,0')}円以下です。`,
  LengthMax: (name, len) => `${name}は全角${len}字が上限です。文字数を減らしてください。`,
  EstimateMin: val => `作成できる見積もり料金は${numeral(val).format('0,0')}円以上です。`,
  AlphaOnly: name => `${name}は半角ローマ字で入力してください。`,
  CreditCardNumber: 'クレジットカード番号は16桁の半角数字で入力してください。',
  Cvc: 'セキュリティコードは3桁の半角数字で入力してください。',
  InvalidEmail: 'これは正しいメールアドレスではないようです。',
  InvalidPassword: 'パスワードは8桁以上の半角英数字で登録してください。',
  NotMatchPassword:
    '異なるパスワードが入力されています。同じ8桁以上の半角英数字を入力してください。',
  FailedSignUp: 'このメールアドレスはすでに登録済みです。',
  FailedResetPassword: 'このメールアドレスは未登録です。',
  InvalidAddress:
    '所在地には都道府県、市区町村、番地、建物名等を含めた正式な住所を入力してください。番地は半角数字でご登録ください。',
};
