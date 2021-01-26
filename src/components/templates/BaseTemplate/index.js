import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import PageClearfix from 'components/LV1/PageClearfix';
import Page from '../Page';

const Wrap = styled.div`
  overflow: hidden;
  margin: auto;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  max-width: ${props => (props.maxWidth ? props.maxWidth : 768)}px;
  margin: ${props => (props.setMargin ? `${props.setMargin}px` : 'auto')};
  ${media.tablet`
    float: none;
    margin-left: 0;
    width: 100%;
    max-width: 100%;
  `};
`;

export default function BaseTemplate({ maxWidth, noMargin, setMargin, children }) {
  return (
    <Page noMargin={noMargin}>
      <PageClearfix>
        <Wrap>
          <Content maxWidth={maxWidth} setMargin={setMargin}>
            {children}
          </Content>
        </Wrap>
      </PageClearfix>
    </Page>
  );
}
