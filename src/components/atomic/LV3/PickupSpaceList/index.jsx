// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

import { H2 } from 'components/atomic/LV1/Headline';
import FeatureSpaceCard from 'components/atomic/LV2/FeatureSpaceCard';

const ListContainer = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const CardWrapper = styled.div`
  display: inline-block;
  &:not(:first-child) {
    margin-left: ${Dimens.medium}px;
  }
  ${media.phone`
    &:not(:first-child) {
      margin-left: ${Dimens.xsmall}px;
    }
    margin: ${Dimens.xsmall}px;
  `};
`;

const testProps = {
  user: {
    image: 'http://placehold.jp/500x500.png',
    name: 'hogehoge',
  },
  space: {
    image: 'http://placehold.jp/500x500.png',
    price: '3,000',
    area: '東京都渋谷区',
    description: '素敵なスペース',
    color: '#FF0000',
  },
};

type PropTypes = {
  title: String,
};

export default (props: PropTypes) => (
  <Fragment>
    <H2>{props.title}</H2>
    <ListContainer>
      <CardWrapper>
        <FeatureSpaceCard {...testProps} />
      </CardWrapper>
      <CardWrapper>
        <FeatureSpaceCard {...testProps} />
      </CardWrapper>
      <CardWrapper>
        <FeatureSpaceCard {...testProps} />
      </CardWrapper>
      <CardWrapper>
        <FeatureSpaceCard {...testProps} />
      </CardWrapper>
    </ListContainer>
  </Fragment>
);
