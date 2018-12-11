// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ConciergeContents from 'components/atomic/LV2/ConciergeIntroduction';

const Content = styled.div`
  margin: ${Dimens.medium2}px 0;
  ${media.tablet`
    margin: ${Dimens.small2}px 0;
  `};
  ${props =>
    props.noTopMargin &&
    `
    margin: 0;
  `};
`;

type PropTypes = {
  meta: React.Element<*>,
  searchResult: React.Element<*>,
  noTopMargin?: boolean,
  history: {
    push: Function,
  },
};

export default ({ meta, searchResult, noTopMargin }: PropTypes) => (
  <div>
    {meta}
    <Content noTopMargin={noTopMargin}>{searchResult}</Content>
    <ConciergeContents />
  </div>
);
