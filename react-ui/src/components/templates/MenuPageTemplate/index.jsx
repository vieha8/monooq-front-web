import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import PageClearfix from 'components/LV1/PageClearfix';
import { H1 } from 'components/LV1/Texts/Headline';
import Page from '../Page';

const Wrap = styled.div`
  overflow: hidden;
  margin: auto;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  max-width: ${props => (props.maxWidth ? props.maxWidth : 768)}px;
  margin: auto;
  ${media.tablet`
    float: none;
    margin-left: 0;
    width: 100%;
    max-width: 100%;
  `};
`;

export default ({ maxWidth, noMargin, headline, children }) => (
  <Page noMargin={noMargin}>
    <PageClearfix>
      <Wrap>
        <Content maxWidth={maxWidth}>
          {headline && <H1 bold>{headline}</H1>}
          {children}
        </Content>
      </Wrap>
    </PageClearfix>
  </Page>
);
