// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import ClearfixContainer from 'components/atomic/LV1/ClearfixContainer';
import { H1 } from 'components/atomic/LV1/Headline';
import InlineText from 'components/atomic/LV1/InlineText';
import Page from '../Page';

const Caption = styled.div`
  margin: 0 0 40px;
  ${media.tablet`
    margin-bottom: 20px;
  `};
`;

const Content = styled.div`
  margin-top: ${Dimens.huge}px;
  ${media.tablet`
    margin-top: ${Dimens.medium3}px;
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
      <H1>{props.headline}</H1>
      {props.caption && (
        <Caption>
          <InlineText.Base>{props.caption}</InlineText.Base>
        </Caption>
      )}
      <ClearfixContainer>
        <Content>
          <LeftContent>{props.leftContent}</LeftContent>
          <RightContent>{props.rightContent}</RightContent>
        </Content>
      </ClearfixContainer>
    </Page>
    {props.footer}
  </div>
);
