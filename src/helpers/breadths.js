export const breadths = [
  '12畳以上',
  '4畳以上12畳未満',
  '4畳未満',
  'クローゼット・収納',
  '物置き・屋外倉庫',
];
export const breadthsDetailRoom = ['1畳', '2畳', '3畳', '4畳', '5畳', '6畳', '7畳', '8畳以上'];
export const breadthsDetailOther = ['一部', 'すべて'];
const excludeWishBreadthOption = ['クローゼット・収納', '物置き・屋外倉庫'];

export const getBreadths = type => {
  if (type === 0) return '';
  return breadths[type - 1];
};

export const getBreadthsDetailRoom = type => {
  if (type === 0) return '';
  return breadthsDetailRoom[type - 1];
};

export const getBreadthsDetailOther = type => {
  if (type === 0) return '';
  return breadthsDetailOther[type - 1];
};

const getList = placeholder => {
  const list = [];
  if (placeholder) {
    list.push({
      key: -1,
      value: '',
      text: placeholder,
    });
  }
  return list;
};

export const selectOptionBreadths = (targetList, placeholder) => {
  let returnList;

  switch (targetList) {
    case 'room':
      returnList = breadthsDetailRoom;
      break;
    case 'other':
      returnList = breadthsDetailOther;
      break;
    default:
      returnList = breadths;
      break;
  }

  return getList(placeholder).concat(
    returnList.map((item, i) => {
      const index = i + 1;
      return {
        key: index,
        value: index.toString(),
        text: item,
      };
    }),
  );
};

export const wishSelectOptionBreadths = (targetList, placeholder) => {
  const returnList = selectOptionBreadths(targetList, placeholder);
  return returnList.filter(obj => !excludeWishBreadthOption.includes(obj.text));
};
