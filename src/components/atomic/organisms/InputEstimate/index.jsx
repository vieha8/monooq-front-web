// @flow

import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import { H1, H2 } from 'components/atomic/atoms/Headline';
import Button from 'components/atomic/atoms/Button';
import InputSchedule from 'components/atomic/molecules/Estimate/InputSchedule';
import InputPrice from 'components/atomic/molecules/Estimate/InputPrice';

const HeadlineContainer = styled.div`
  margin-top: 80px;
  ${media.tablet`
    margin-top: 20px;
  `};
`;

const Section = styled.div`
  margin-top: ${Dimens.medium3}px;
  ${media.tablet`
    margin-top: ${Dimens.medium}px;
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
    error: string,
    onChange: Function,
    value: string,
  },
  buttonLoading: boolean,
  buttonDisabled: boolean,
  onClickSend: Function,
};

export default (props: PropTypes) => (
  <div>
    <HeadlineContainer>
      <H1>見積もりを送る</H1>
    </HeadlineContainer>
    <Section>
      <H2>スケジュール</H2>
      <InputSchedule {...props.schedule} />
    </Section>
    <Section>
      <H2>料金を入力</H2>
      <InputPrice {...props.price} />
    </Section>
    <Section>
      <Button
        primary
        fill={1}
        loading={props.buttonLoading}
        disabled={props.buttonDisabled}
        onClick={props.buttonLoading ? null : props.onClickSend}
      >
        この見積もりを送る
      </Button>
    </Section>
  </div>
);
