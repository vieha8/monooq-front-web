import React from 'react';
import { formatAddComma } from 'helpers/string';
import RadioList from 'components/LV2/Forms/RadioList';

export default ({ pricePlusFee, pricePlusFeeMonthly, checkedIndex, onClick }) => (
  <div>
    <RadioList
      labelTitle="決済方法"
      labels={[
        `月々払い（${formatAddComma(pricePlusFee)}円/月での自動引落）`,
        `一括払い（${formatAddComma(pricePlusFeeMonthly)}円の一括支払）`,
      ]}
      checkedIndex={checkedIndex}
      onClick={onClick}
    />
  </div>
);
