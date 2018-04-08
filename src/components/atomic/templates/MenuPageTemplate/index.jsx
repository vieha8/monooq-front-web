// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import ClearfixContainer from 'components/atomic/atoms/ClearfixContainer';
import { H1 } from 'components/atomic/atoms/Headline';
import InlineText from 'components/atomic/atoms/InlineText';
import Page from '../Page';

const HeadlineContainer = styled.div`
  margin-top: 40px;
  ${media.tablet`
    margin-top: 20px;
  `};
`;

const Caption = styled.div`
  margin: 0 0 40px;
  ${media.tablet`
    margin-bottom: 20px;
  `};
`;

const LeftContent = styled.div`
  float: left;
  width: 30%;
  ${media.tablet`
    display: none;
    float: none;
  `};
`;

const RightContent = styled.div`
  float: left;
  margin-left: 32px;
  width: 60%;
  ${media.tablet`
    float: none;
    margin-left: 0;
    width: 100%;
  `};
`;

type PropTypes = {
  header: React.Element<*>,
  headline: string,
  caption: string,
  leftContent: React.Element<*>,
  rightContent: React.Element<*>,
  footer: React.Element<*>,
};

export default (props: PropTypes) => (
  <div>
    {props.header}
    <Page>
      <HeadlineContainer>
        <H1>{props.headline}</H1>
      </HeadlineContainer>
      {props.caption && (
        <Caption>
          <InlineText.Base>{props.caption}</InlineText.Base>
        </Caption>
      )}
      <ClearfixContainer>
        <LeftContent>{props.leftContent}</LeftContent>
        <RightContent>{props.rightContent}</RightContent>
      </ClearfixContainer>
    </Page>
    {props.footer}
  </div>
);
