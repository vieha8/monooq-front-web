// @flow

import React from 'react';
import styled from 'styled-components';
import { H1 } from 'components/atomic/LV1/Headline';
import InlineText from 'components/atomic/LV1/InlineText';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Page from '../Page';

const H1Container = styled.div`
  margin: ${Dimens.medium3}px 0;
  ${media.tablet`
    margin: ${Dimens.medium}px 0;
  `};
`;

const CaptionContainer = styled.div`
  margin: ${Dimens.medium2}px 0;
  ${media.tablet`
    margin: ${Dimens.medium}px 0;
  `};
`;

const Content = styled.div`
  margin: ${Dimens.medium3}px 0;
  ${media.tablet`
    margin: ${Dimens.medium}px 0;
  `};
`;

type PropTypes = {
  header: React.Element<*>,
  headline1: string,
  caption: string,
  searchResult: React.Element<*>,
  footer: React.Element<*>,
};

export default (props: PropTypes) => (
  <div>
    {props.header}
    <Page>
      <H1Container>
        <H1>{props.headline1}</H1>
      </H1Container>
      <CaptionContainer>
        <InlineText.Base>{props.caption}</InlineText.Base>
      </CaptionContainer>
      <Content>{props.searchResult}</Content>
    </Page>
    {props.footer}
  </div>
);
