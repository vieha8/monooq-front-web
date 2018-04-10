import numeral from 'numeral';

export default {
  PleaseInput: '入力してください',
  PleaseSelect: '選択してください',
  PriceMin: val => `登録できる料金目安は${numeral(val).format('0,0')}円以上です。`,
  PriceMax: val => `登録できる料金目安は${numeral(val).format('0,0')}円以下です。`,
  LengthMax: (name, len) => `${name}は全角${len}文字まで登録できます。文字数を減らしください。`,
  EstimateMin: val => `作成できる見積もり料金は${numeral(val).format('0,0')}円以上です。`,
  AlphaOnly: name => `${name}は半角ローマ字で入力してください。`,
  CreditCardNumber: 'クレジットカード番号は16ケタの半角数字で入力してください。',
  Cvc: 'セキュリティコードは3ケタの半角数字で入力してください。',
  InvalidEmail: 'これは正しいメールアドレスではないようです。',
  InvalidPassword: 'パスワードは8ケタ以上の半角英数字で登録してください。',
  NotMatchPassword:
    '異なるパスワードが入力されています。同じ8ケタ以上の半角英数字を入力してください。',
  FailedSignUp: 'このメールアドレスはすでに登録済みです。',
  InvalidAddress:
    '所在地には都道府県、市区町村、番地、建物名等を含めた正式な住所を入力してください。',
};
