export const receiptTypes = ['対面・配送の両方に対応する', '対面', '配送'];

export const selectOptionreceiptTypes = placeholder => {
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
        value: purpose.toString(),
        text: item,
      };
    }),
  );
};
