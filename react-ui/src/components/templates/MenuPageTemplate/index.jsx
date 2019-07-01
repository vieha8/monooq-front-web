// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import ClearfixContainer from 'components/LV1/ClearfixContainer';
import { H1 } from 'components/LV1/Headline';
import InlineText from 'components/LV1/InlineText';
import Page from '../Page';

const Caption = styled.div`
  margin: ${Dimens.medium_20}px 0 ${Dimens.medium2}px;
  ${media.tablet`
    margin-bottom: ${Dimens.medium_20}px;
  `};
`;

const Content = styled.div`
  overflow: hidden;
  margin: auto;
  width: 844px;
  ${media.tablet`
    width: 100%;
  `};
`;

const LeftContent = styled.div`
  float: left;
  width: 65%;
  max-width: 540px;
  ${media.tablet`
    float: none;
    margin-left: 0;
    width: 100%;
    max-width: 100%;
    padding-top: ${Dimens.small_10}px;
  `};
`;

const RightContent = styled.div`
  float: left;
  width: 28%;
  min-width: 192px;
  margin-left: 67px;
  ${media.tablet`
    display: none;
    float: none;
  `};
`;

type PropTypes = {
  meta?: React.Element<*>,
  header: React.Element<*>,
  headline: string,
  caption: string,
  leftContent: React.Element<*>,
  rightContent: React.Element<*>,
  bottomButtonMargin?: string,
  noMargin?: boolean,
};

export default ({
  header,
  meta,
  bottomButtonMargin,
  noMargin,
  headline,
  caption,
  leftContent,
  rightContent,
}: PropTypes) => (
  <div>
    {header}
    {meta}
    <Page bottomButtonMargin={bottomButtonMargin} noMargin={noMargin}>
      <ClearfixContainer>
        <Content>
          <LeftContent>
            {headline && <H1 bold>{headline}</H1>}
            {caption && (
              <Caption>
                <InlineText.Base>{caption}</InlineText.Base>
              </Caption>
            )}
            {leftContent}
          </LeftContent>
          <RightContent>{rightContent}</RightContent>
        </Content>
      </ClearfixContainer>
    </Page>
  </div>
);
