export const usages = [
  '引越し',
  '建て替え',
  'リフォーム',
  '出張・転勤',
  '留学',
  '収納・保管(生活用品)',
  '収納・保管(趣味用品)',
  '収納・保管(ビジネス利用)',
  'その他',
];

export const getUsages = type => {
  if (type === 0) {
    return '';
  }
  return usages[type - 1];
};

export const selectOptionUsages = placeholder => {
  const list = [];
  if (placeholder) {
    list.push({
      key: -1,
      value: '',
      text: placeholder,
    });
  }
  return list.concat(
    usages.map((item, i) => {
      const index = i + 1;
      return {
        key: index,
        value: index.toString(),
        text: item,
      };
    }),
  );
};
