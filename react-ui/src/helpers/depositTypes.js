export const depositTypes = ['普通', '当座'];

const selectDepositType = placeholder => {
  const depositTypeList = [];
  if (placeholder) {
    depositTypeList.push({
      key: -1,
      value: '',
      text: placeholder,
    });
  }

  return depositTypeList.concat(
    depositTypes.map((type, i) => ({
      key: i + 1,
      value: (i + 1).toString(),
      text: type,
    })),
  );
};

export default selectDepositType;
