// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import ContainerClearfix from 'components/LV1/ContainerClearfix';
import { H1 } from 'components/LV1/Texts/Headline';
import Page from '../Page';

const Wrap = styled.div``;

const Content = styled.div`
  overflow: hidden;
  margin: auto;
  width: 100%;
`;

const LeftContent = styled.div`
  width: 100%;
  ${media.tablet`
    float: none;
    margin-left: 0;
    width: 100%;
    max-width: 100%;
    padding-top: ${Dimens.small_10}px;
  `};
`;

type PropTypes = {
  header: React.Element<*>,
  headline: string,
  leftContent: React.Element<*>,
  noMargin?: boolean,
};

export default ({ header, noMargin, headline, leftContent }: PropTypes) => (
  <Wrap>
    {header}
    <Page noMargin={noMargin}>
      <ContainerClearfix>
        <Content>
          <LeftContent>
            {headline && <H1 bold>{headline}</H1>}
            {leftContent}
          </LeftContent>
        </Content>
      </ContainerClearfix>
    </Page>
  </Wrap>
);
