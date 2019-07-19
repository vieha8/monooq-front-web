// @flow

export const purposes = ['荷物を預けたい', '荷物を預かりたい'];

export const deposittypes = ['普通', '当座'];

export const prefectures = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
];

export const getPrefecture = (prefCode: string | number) => {
  return prefectures[parseInt(prefCode, 10) - 1];
};

export const selectOptionPrefectures = (placeholder: string) => {
  const prefs = [];
  if (placeholder) {
    prefs.push({
      key: -1,
      value: '',
      text: placeholder,
    });
  }
  return prefs.concat(
    prefectures.map((pref, i) => {
      const prefCode = i + 1;
      return {
        key: prefCode,
        value: prefCode.toString(),
        text: pref,
      };
    }),
  );
};

export const selectOptionPurpose = (placeholder: string) => {
  const purposesList = [];
  if (placeholder) {
    purposesList.push({
      key: -1,
      value: '',
      text: placeholder,
    });
  }
  return purposesList.concat(
    purposes.map((pur, i) => {
      const purpose = i + 1;
      return {
        key: purpose,
        value: purpose.toString(),
        text: pur,
      };
    }),
  );
};

export const selectDepositType = (placeholder: string) => {
  const depositTypeList = [];
  if (placeholder) {
    depositTypeList.push({
      key: -1,
      value: '',
      text: placeholder,
    });
  }
  return depositTypeList.concat(
    deposittypes.map((depo, i) => {
      const deposittype = i + 1;
      return {
        key: deposittype,
        value: deposittype.toString(),
        text: depo,
      };
    }),
  );
};
