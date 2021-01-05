import Path from 'config/path';

export const makeBreadCrumbs = ({
  addressPref,
  prefCode,
  addressCity,
  cityCode,
  addressTown,
  townCode,
}) => {
  const breadcrumbs = [];

  breadcrumbs.push({
    text: addressPref,
    link: Path.spacesByPrefecture(prefCode),
  });

  breadcrumbs.push({
    text: addressCity,
    link: Path.spacesByCity(prefCode, cityCode),
  });

  breadcrumbs.push({
    text: addressTown,
    link: Path.spacesByTown(prefCode, cityCode, townCode),
  });

  return breadcrumbs;
};

export default makeBreadCrumbs;
