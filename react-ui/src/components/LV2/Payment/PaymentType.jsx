import React from 'react';
import { formatAddComma } from 'helpers/string';
import RadioList from 'components/LV2/Forms/RadioList';

export default ({ checkedIndex, onClick }) => (
  <div>
    <RadioList
      labelTitle="決済方法"
      labels={[
        `月々払い（${formatAddComma(19800)}円/月での自動引落）`,
        `一括払い（${formatAddComma(39600)}円の一括支払）`,
      ]}
      checkedIndex={checkedIndex}
      onClick={onClick}
    />
  </div>
);
