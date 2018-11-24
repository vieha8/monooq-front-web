// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Content = styled.div`
  margin: ${Dimens.medium2}px 0;
  ${media.tablet`
    margin: ${Dimens.medium}px 0;
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
};

export default ({ meta, searchResult, noTopMargin }: PropTypes) => (
  <div>
    {meta}
    <Content noTopMargin={noTopMargin}>{searchResult}</Content>
  </div>
);
