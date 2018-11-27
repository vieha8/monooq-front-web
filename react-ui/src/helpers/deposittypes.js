// @flow

export const deposittypes = ['普通', '当座'];

export function selectDepositType(placeholder: string) {
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
}
