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

export const areaPrefectures = [
  {
    region: '北海道・東北',
    prefectureList: [
      { name: '北海道', id: 1 },
      { name: '青森', id: 2 },
      { name: '岩手', id: 3 },
      { name: '宮城', id: 4 },
      { name: '秋田', id: 5 },
      { name: '山形', id: 6 },
      { name: '福島', id: 7 },
    ],
  },
  {
    region: '関東',
    prefectureList: [
      { name: '東京', id: 13 },
      { name: '神奈川', id: 14 },
      { name: '埼玉', id: 11 },
      { name: '千葉', id: 12 },
      { name: '茨城', id: 8 },
      { name: '群馬', id: 10 },
      { name: '栃木', id: 9 },
    ],
  },
  {
    region: '甲信越・北陸',
    prefectureList: [
      { name: '山梨', id: 19 },
      { name: '新潟', id: 15 },
      { name: '長野', id: 20 },
      { name: '富山', id: 16 },
      { name: '石川', id: 17 },
      { name: '福井', id: 18 },
    ],
  },
  {
    region: '東海',
    prefectureList: [
      { name: '愛知', id: 23 },
      { name: '岐阜', id: 21 },
      { name: '静岡', id: 22 },
      { name: '三重', id: 24 },
    ],
  },
  {
    region: '関西',
    prefectureList: [
      { name: '大阪', id: 27 },
      { name: '兵庫', id: 28 },
      { name: '京都', id: 26 },
      { name: '滋賀', id: 25 },
      { name: '奈良', id: 29 },
      { name: '和歌山', id: 30 },
    ],
  },
  {
    region: '四国',
    prefectureList: [
      { name: '徳島', id: 36 },
      { name: '香川', id: 37 },
      { name: '愛媛', id: 38 },
      { name: '高知', id: 39 },
    ],
  },
  {
    region: '中国',
    prefectureList: [
      { name: '鳥取', id: 31 },
      { name: '島根', id: 32 },
      { name: '岡山', id: 33 },
      { name: '広島', id: 34 },
      { name: '山口', id: 35 },
    ],
  },
  {
    region: '九州・沖縄',
    prefectureList: [
      { name: '福岡', id: 40 },
      { name: '佐賀', id: 41 },
      { name: '長崎', id: 42 },
      { name: '熊本', id: 43 },
      { name: '大分', id: 44 },
      { name: '宮崎', id: 45 },
      { name: '鹿児島', id: 46 },
      { name: '沖縄', id: 47 },
    ],
  },
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
