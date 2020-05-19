import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import InputForm from 'components/LV2/Forms/InputForm';
import ErrorList from 'components/LV2/Lists/ErrorList';

const Wrap = styled.div`
  width: 100%;
`;

const CheckBoxStyled = styled(InputForm)`
  margin-top: ${Dimens.small}px;
`;

export default ({
  valueUsagePeriod,
  onChangeUsagePeriod,
  isUndecided,
  onChangeUndecided,
  errors,
}) => (
  <Wrap>
    <InputForm
      type="tel"
      label="利用期間"
      placeholder="00"
      unit="ヶ月利用する"
      widthWrap={55}
      disabled={isUndecided}
      value={valueUsagePeriod}
      onChange={e => onChangeUsagePeriod(e.target.value)}
    />
    <CheckBoxStyled
      checkbox
      labelCheckBox="利用期間は未定"
      checked={isUndecided}
      onClickCheck={() => onChangeUndecided(!isUndecided)}
    />
    <ErrorList keyName="usage_period_errors" errors={errors} />
  </Wrap>
);
