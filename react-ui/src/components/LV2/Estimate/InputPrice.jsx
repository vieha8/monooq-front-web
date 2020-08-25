import React from 'react';
import styled from 'styled-components';
import { formatAddComma } from 'helpers/string';
import InputForm from 'components/LV2/Forms/InputForm';
import ErrorList from 'components/LV2/Lists/ErrorList';

const Wrap = styled.div`
  width: 100%;
`;

export default ({ price, onChange, errors }) => (
  <Wrap>
    <InputForm
      type="tel"
      label="料金"
      placeholder="0"
      unit="円で貸し出す(1ヶ月あたり)"
      widthWrap={90}
      value={formatAddComma(price)}
      onChange={e => onChange(e.target.value)}
    />
    <ErrorList keyName="price_errors" errors={errors} />
  </Wrap>
);
