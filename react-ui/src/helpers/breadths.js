export const breadths = [
  '12畳以上',
  '4畳以上12畳未満',
  '4畳未満',
  'クローゼット・収納',
  '物置き・屋外倉庫',
];

export const selectOptionBreadths = placeholder => {
  const list = [];
  if (placeholder) {
    list.push({
      key: -1,
      value: '',
      text: placeholder,
    });
  }
  return list.concat(
    breadths.map((item, i) => {
      const purpose = i + 1;
      return {
        key: purpose,
        value: purpose.toString(),
        text: item,
      };
    }),
  );
};
