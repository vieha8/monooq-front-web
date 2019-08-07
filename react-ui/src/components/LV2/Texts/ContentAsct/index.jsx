// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import Text from 'components/LV1/Texts/StaticText';

const ContentContainer = styled.div`
  width: 100%;
  padding: ${Dimens.medium_20}px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  font-size: ${FontSizes.small_15}px;
  border-bottom: 1px solid #dbdbdb;
`;

const Header = styled(Text)`
  width: 150px;
  font-weight: bold;
  margin-right: ${Dimens.medium_20}px;
  ${media.phone`
    width: 100%;
  `};
`;

const Data = styled(Text)`
  ${media.phone`
    margin-top: ${Dimens.small}px;
    line-height: ${Dimens.medium2}px;
  `};
`;

export type PropTypes = {
  asctList: Array<{
    header: string,
    data: string,
  }>,
};

export default ({ asctList }: PropTypes) => (
  <Fragment>
    {asctList.map((item, i) => (
      <ContentContainer key={i.toString()}>
        <Header>{item.header}</Header>
        <Data>{item.data}</Data>
      </ContentContainer>
    ))}
  </Fragment>
);
