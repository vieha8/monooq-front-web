import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import ErrorList from 'components/LV2/Lists/ErrorList';
import RadioList from 'components/LV2/Forms/RadioList';
import InputForm from 'components/LV2/Forms/InputForm';

const Wrap = styled.div``;

const Row = styled.div`
  margin-left: ${Dimens.medium3}px;
`;

export default ({ tatami, onChangeTatami, indexTatami, onClickTatamiMethod, errors }) => (
  <Wrap>
    <RadioList
      labels={['一畳から利用する', '全体を利用する（18,000円/月）']}
      contents={[
        <Row>
          <InputForm
            type="tel"
            placeholder="0"
            unit="畳 (6,000円/月)"
            widthWrap={60}
            value={tatami}
            onChange={onChangeTatami}
          />
        </Row>,
        '',
      ]}
      checkedIndex={indexTatami}
      onClick={onClickTatamiMethod}
    />
    <ErrorList keyName="tatami_errors" errors={errors} />
  </Wrap>
);
