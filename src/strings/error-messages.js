import numeral from 'numeral';

export default {
  PleaseInput: '入力してください',
  PleaseSelect: '選択してください',
  PriceMin: val => `登録できる料金目安は${numeral(val).format('0,0')}円以上です。`,
  EstimateMin: val => `作成できる見積もり料金は${numeral(val).format('0,0')}円以上です。`,
};
