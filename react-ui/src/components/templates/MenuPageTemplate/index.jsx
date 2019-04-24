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

const Content = styled.div``;

const LeftContent = styled.div`
  float: left;
  width: 65%;
  ${media.tablet`
    float: none;
    margin-left: 0;
    width: 100%;
    padding-top: ${Dimens.small_10}px;
  `};
`;

const RightContent = styled.div`
  float: left;
  width: 22%;
  margin-left: 90px;
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

export default (props: PropTypes) => (
  <div>
    {props.header}
    {props.meta}
    <Page bottomButtonMargin={props.bottomButtonMargin} noMargin={props.noMargin}>
      <ClearfixContainer>
        <Content>
          <LeftContent>
            {props.headline && <H1 bold>{props.headline}</H1>}
            {props.caption && (
              <Caption>
                <InlineText.Base>{props.caption}</InlineText.Base>
              </Caption>
            )}
            {props.leftContent}
          </LeftContent>
          <RightContent>{props.rightContent}</RightContent>
        </Content>
      </ClearfixContainer>
    </Page>
  </div>
);
