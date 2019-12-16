export const receiptTypes = [
  '配送・対面の受け取り両方に対応する',
  '配送サービスでの受け取りのみ対応する',
  '対面での受け取りのみ対応する',
];

export const selectOptionReceiptTypes = placeholder => {
  const list = [];
  if (placeholder) {
    list.push({
      key: -1,
      value: '',
      text: placeholder,
    });
  }
  return list.concat(
    receiptTypes.map((item, i) => {
      const purpose = i + 1;
      return {
        key: purpose,
        value: purpose,
        text: item,
      };
    }),
  );
};
