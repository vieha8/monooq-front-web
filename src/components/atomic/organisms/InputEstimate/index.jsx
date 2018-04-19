// @flow

import React from 'react';
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

type PropTypes = {};

export default (props: PropTypes) => (
  <div>
    <HeadlineContainer>
      <H1>見積もりを送る</H1>
    </HeadlineContainer>
    <Section>
      <H2>スケジュール</H2>
      <InputSchedule />
    </Section>
    <Section>
      <H2>料金を入力</H2>
      <InputPrice />
    </Section>
    <Section>
      <Button primary fill={1}>
        この見積もりを送る
      </Button>
    </Section>
  </div>
);
