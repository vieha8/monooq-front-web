// @flow

import React from 'react';
import styled from 'styled-components';
import { H1 } from 'components/atomic/atoms/Headline';
import InlineText from 'components/atomic/atoms/InlineText';
import { Height as HeaderHeight } from 'components/atomic/organisms/Header';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Page = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  ${media.tablet`
    padding: ${HeaderHeight}px 20px 40px;
  `}
`;

const H1Container = styled.div`
  margin: ${Dimens.medium3}px 0;
  ${media.tablet`
    margin: ${Dimens.medium}px 0;
  `}
`;

const CaptionContainer = styled.div`
  margin: ${Dimens.medium2}px 0;
  ${media.tablet`
    margin: ${Dimens.medium}px 0;
  `}
`;

const Content = styled.div`
  margin: ${Dimens.medium3}px 0;
  ${media.tablet`
    margin: ${Dimens.medium}px 0;
  `}
`;

type PropTypes = {
  header: React.Element<*>,
  headline1: string,
  caption: string,
  searchResult: React.Element<*>,
  footer: React.Element<*>,
}

export default (props: PropTypes) => (
  <div>
    {props.header}
    <Page>
      <H1Container><H1>{props.headline1}</H1></H1Container>
      <CaptionContainer>
        <InlineText.Base>
          {props.caption}
        </InlineText.Base>
      </CaptionContainer>
      <Content>
        {props.searchResult}
      </Content>
    </Page>
    {props.footer}
  </div>
);
