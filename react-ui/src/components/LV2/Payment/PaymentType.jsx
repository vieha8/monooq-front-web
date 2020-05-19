import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { formatAddComma } from 'helpers/string';
import RadioList from 'components/LV2/Forms/RadioList';

const Wrap = styled.div``;

export default ({ checkedIndex, onClick }) => (
  <Wrap>
    <RadioList
      labelTitle="決済方法"
      labels={[
        `月々払い（${formatAddComma(19800)}円/月での自動引落）`,
        `一括払い（${formatAddComma(39600)}円の一括支払）`,
      ]}
      checkedIndex={checkedIndex}
      onClick={onClick}
    />
  </Wrap>
);
