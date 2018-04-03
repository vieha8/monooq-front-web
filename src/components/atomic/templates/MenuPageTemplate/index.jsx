// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import ClearfixContainer from 'components/atomic/atoms/ClearfixContainer';
import { H1 } from 'components/atomic/atoms/Headline';
import { Height as HeaderHeight } from 'components/atomic/organisms/Header';

const Page = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: ${HeaderHeight}px 0 80px;
  ${media.phone`
    padding: ${HeaderHeight}px 20px 40px;
  `}
`;

const HeadlineContainer = styled.div`
  margin: 40px 0 80px;
  ${media.tablet`
    margin: 40px 0;
  `}
`;

const LeftContent = styled.div`
  float: left;
  width: 30%;
  ${media.tablet`
    display: none;
    float: none;
  `}
`;

const RightContent = styled.div`
  float: left;
  margin-left: 32px;
  width: 60%;
  ${media.tablet`
    float: none;
    margin-left: 0;
    width: 100%;
  `}
`;

type PropTypes = {
  header: React.Element<*>,
  headline: string,
  leftContent: React.Element <*>,
  rightContent: React.Element <*>,
  footer: React.Element <*>,
}

export default (props: PropTypes) => (
  <div>
    {props.header}
    <Page>
      <HeadlineContainer><H1>{props.headline}</H1></HeadlineContainer>
      <ClearfixContainer>
        <LeftContent>{props.leftContent}</LeftContent>
        <RightContent>{props.rightContent}</RightContent>
      </ClearfixContainer>
    </Page>
    {props.footer}
  </div>
);
