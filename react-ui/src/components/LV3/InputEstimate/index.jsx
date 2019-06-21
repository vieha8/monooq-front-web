// @flow

import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import { H2 } from 'components/LV1/Headline';
import Button from 'components/LV1/Button';
import InputSchedule from 'components/LV2/Estimate/InputSchedule';
import InputPrice from 'components/LV2/Estimate/InputPrice';

const Section = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.phone`
    max-width: 100%;
  `};
`;

type PropTypes = {
  schedule: {
    beginDate: moment,
    endDate: moment,
    beginDateFocused: boolean,
    onDateChangeBegin: Function,
    onFocusChangeBegin: Function,
    endDateFocused: boolean,
    onDateChangeEnd: Function,
    onFocusChangeEnd: Function,
  },
  price: {
    errors: Array<string>,
    onChange: Function,
    value: string,
  },
  buttonLoading: boolean,
  buttonDisabled: boolean,
  onClickSend: Function,
  onKeyDownSend: Function,
};

export default ({
  schedule,
  price,
  buttonLoading,
  buttonDisabled,
  onClickSend,
  onKeyDownSend,
}: PropTypes) => (
  <div>
    <Section>
      <H2>スケジュール</H2>
      <InputSchedule {...schedule} />
    </Section>
    <Section>
      <H2>料金を入力</H2>
      <InputPrice {...price} />
    </Section>
    <Section>
      <ButtonWrap>
        <Button
          primary
          fill={1}
          fontbold
          loading={buttonLoading}
          disabled={buttonDisabled}
          onClick={buttonLoading ? null : onClickSend}
          onKeyDown={onKeyDownSend}
        >
          この見積もりを送る
        </Button>
      </ButtonWrap>
    </Section>
  </div>
);
