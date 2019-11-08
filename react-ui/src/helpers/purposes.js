export const purposes = ['荷物を預けたい', '荷物を預かりたい'];

const selectOptionPurpose = (placeholder: string) => {
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

export default selectOptionPurpose;
