import React from 'react';
import styled from 'styled-components';
import InputForm from 'components/LV2/Forms/InputForm';
import ErrorList from 'components/LV2/Lists/ErrorList';

const Wrap = styled.div`
  width: 100%;
`;

export default ({ onChange, value, errors }) => (
  <Wrap>
    <InputForm
      type="tel"
      label="利用期間"
      placeholder="00"
      unit="ヶ月利用する"
      widthWrap={55}
      onChange={e => onChange(e.target.value)}
      value={value}
    />
    <ErrorList keyName="usage_period_errors" errors={errors} />
  </Wrap>
);
