// チェックボックスの選択済み市区町村かの判定
export const isDefaultCheckCity = (city, conditions) => {
  if (conditions.cities.filter(c => c.code === city.code).length > 0) {
    const checkedTowns = city.towns.filter(
      w => conditions.towns.filter(t => t.code === w.code).length > 0,
    ).length;
    if (checkedTowns === 0 || checkedTowns === city.towns.length) {
      return true;
    }
  }
  return false;
};

// 現在の検索条件リストの生成
export const makeCurrentSearchConditions = conditions => {
  const list = [
    {
      title: '都道府県',
      value: conditions.pref.name,
    },
    {
      title: '市区町村',
      value: conditions.cities.map(v => v.name).join('・'),
    },
    {
      title: '町域・エリア',
      value: conditions.towns.map(v => v.name).join('・'),
    },
  ];
  if (conditions.keyword) {
    list.push({
      title: 'キーワード',
      value: conditions.keyword,
    });
  }
  return list;
};

// jsonLdのパンくず生成
export const makeMetaBreadcrumbs = conditions => {
  const { pref, cities, towns } = conditions;

  let position = 1;
  const baseUrl = 'https://monooq.com';
  const itemList = [
    {
      '@type': 'ListItem',
      position,
      name: 'トップ',
      item: baseUrl,
    },
  ];

  if (pref && pref.name) {
    position += 1;
    itemList.push({
      '@type': 'ListItem',
      position,
      name: `${pref.name}のスペース`,
      item: `${baseUrl}/pref${pref.code}`,
    });
    if (cities.length === 1) {
      position += 1;
      const city = cities[0];
      itemList.push({
        '@type': 'ListItem',
        position,
        name: `${city.name}のスペース`,
        item: `${baseUrl}/pref${pref.code}/city${city.code}`,
      });
      if (towns.length === 1) {
        position += 1;
        const town = towns[0];
        itemList.push({
          '@type': 'ListItem',
          position,
          name: `${town.name}のスペース`,
          item: `${baseUrl}/pref${pref.code}/city${city.code}/town${town.code}`,
        });
      }
    }
  }

  if (itemList.length === 1) {
    position += 1;
    itemList.push({
      '@type': 'ListItem',
      position,
      name: `スペース検索結果`,
      item: `${baseUrl}/search`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemList,
  };
};

// this.props.conditions
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
