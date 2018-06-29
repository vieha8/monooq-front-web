// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

import { H2 } from 'components/atomic/LV1/Headline';
import TextButton from 'components/atomic/LV1/TextButton';
import FeatureSpaceCard from 'components/atomic/LV2/FeatureSpaceCard';

const Container = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  ${media.tablet`
    max-width: 100%;
  `};
`;

const TitleContainer = styled.div`
  ${media.tablet`
    padding: 0 ${Dimens.medium}px;
  `};
`;

const ListContainer = styled.div`
  margin-top: ${Dimens.medium}px;
  ${media.tablet`
    text-align: center;
  `};
`;

const CardWrapper = styled.div`
  display: inline-block;
  &:not(:first-child) {
    margin-left: ${Dimens.medium}px;
  }
  ${media.tablet`
    &:not(:first-child) {
      margin-left: ${Dimens.xsmall}px;
    }
    margin: ${Dimens.xsmall}px;
  `};
`;

const MoreViewContainer = styled.div`
  text-align: center;
  padding: ${Dimens.medium}px 0;
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

type PropTypes = {
  title: string,
  spaceList: Array<{
    link: string,
    user: {
      image: string,
      name: string,
    },
    space: {
      image: string,
      price: string,
      area: string,
      description: string,
      color: string,
    },
  }>,
  onClickMoreView: Function,
  noMore: boolean,
};

export default (props: PropTypes) => (
  <Container>
    <TitleContainer>
      <H2>{props.title}</H2>
    </TitleContainer>
    <ListContainer>
      {props.spaceList.map((space, i) => (
        <CardWrapper key={`space_list_${i}`}>
          <FeatureSpaceCard {...space} />
        </CardWrapper>
      ))}
    </ListContainer>
    {!props.noMore && (
      <MoreViewContainer>
        <TextButton onClick={props.onClickMoreView}>もっと見る</TextButton>
      </MoreViewContainer>
    )}
  </Container>
);
