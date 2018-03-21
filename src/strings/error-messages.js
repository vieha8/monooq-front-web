import numeral from 'numeral';

export default {
  PleaseInput: '入力してください',
  PleaseSelect: '選択してください',
  PriceMin: val => `登録できる料金目安は${numeral(val).format('0,0')}円以上です。`,
  EstimateMin: val => `作成できる見積もり料金は${numeral(val).format('0,0')}円以上です。`,
  AlphaOnly: name => `${name}は半角ローマ字で入力してください。`,
  CreditCardNumber: 'クレジットカード番号は16ケタの半角数字で入力してください。',
  Cvc: 'セキュリティコードは3ケタの半角数字で入力してください。',
};
