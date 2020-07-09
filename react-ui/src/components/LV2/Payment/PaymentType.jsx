import React from 'react';
import { formatAddComma } from 'helpers/string';
import RadioList from 'components/LV2/Forms/RadioList';

const getList = (isUndecided, pricePlusFee, pricePlusFeeMonthly) => {
  const returnList = [`月々払い（${formatAddComma(pricePlusFeeMonthly)}円/月での自動引落）`];
  if (!isUndecided) {
    returnList.push(`一括払い（${formatAddComma(pricePlusFee)}円の一括支払）`);
  }
  return returnList;
};

export default ({ isUndecided, pricePlusFee, pricePlusFeeMonthly, checkedIndex, onClick }) => (
  <div>
    <RadioList
      labelTitle="決済方法"
      labels={getList(isUndecided, pricePlusFee, pricePlusFeeMonthly)}
      checkedIndex={isUndecided ? 0 : checkedIndex}
      onClick={onClick}
    />
  </div>
);
