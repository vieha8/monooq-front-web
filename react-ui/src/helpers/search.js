export const makeConditionTitle = ({ keyword, pref, cities, towns }) => {
  if (keyword && keyword !== '') {
    return keyword;
  }

  let condition = '';

  if (pref && pref.name && pref.name !== '') {
    condition += pref.name;
  }

  if (cities && cities.length > 0) {
    condition += `/${cities.map(v => v.name).join('・')}`;
  }

  if (towns && towns.length > 0) {
    condition += `/${towns.map(v => v.name).join('・')}`;
  }

  if (condition === '') {
    condition = 'すべて';
  }

  return condition;
};
