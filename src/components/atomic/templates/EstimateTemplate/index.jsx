// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ClearfixContainer from 'components/atomic/atoms/ClearfixContainer';
import { H1, H2 } from 'components/atomic/atoms/Headline';
import Page from '../Page';

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

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const LeftContent = styled.div`
  float: left;
  width: 60%;
  ${media.tablet`
    float: none;
    width: 100%;
  `};
`;

const RightContent = styled.div`
  float: left;
  margin-left: 32px;
  width: 30%;
  margin-top: 80px;
  ${media.tablet`
    float: none;
    display: none;
  `};
`;

type PropTypes = {
  header: React.Element<*>,
  schedule: React.Element<*>,
  price: React.Element<*>,
  hint: React.Element<*>,
  button: React.Element<*>,
};

export default (props: PropTypes) => (
  <div>
    {props.header}
    <Page>
      <ClearfixContainer>
        <LeftContent>
          <HeadlineContainer>
            <H1>見積もりを送る</H1>
          </HeadlineContainer>
          <Section>
            <H2>スケジュール</H2>
            {props.schedule}
          </Section>
          <Section>
            <H2>料金を入力</H2>
            {props.price}
          </Section>
          <ButtonWrapper>{props.button}</ButtonWrapper>
        </LeftContent>
        <RightContent>{props.hint}</RightContent>
      </ClearfixContainer>
    </Page>
  </div>
);
