// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import { H2 } from 'components/LV1/Texts/Headline';
import FeatureSpaceItem from 'components/LV2/Items/FeatureSpaceItem';

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
  width: calc(25% - ${Dimens.small2_14}px);
  &:not(:first-child) {
    margin-left: ${Dimens.small_10}px;
  }
  ${media.tablet`
    &:not(:first-child) {
      margin-left: ${Dimens.xsmall}px;
    }
    margin: ${Dimens.xsmall}px;
    ${props =>
      props.large &&
      `
      display: table-cell;
      &:first-child {
        padding-left: ${Dimens.medium}px;
      }
      padding-right: ${Dimens.medium}px;
    `}
  `};
  margin: ${Dimens.xxsmall_4}px;
`;

const HorizontalScroll = styled.ul`
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
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
    large: boolean,
  }>,
};

const PickupSpaceList = ({ title, spaceList }: PropTypes) => (
  <Container>
    <TitleContainer>
      <H2>{title}</H2>
    </TitleContainer>
    <ListContainer>
      <HorizontalScroll>
        {spaceList.map((space, i) => (
          <CardWrapper key={`space_list_${i}`.toString()} large={space.large ? 1 : 0}>
            <FeatureSpaceItem {...space} />
          </CardWrapper>
        ))}
      </HorizontalScroll>
    </ListContainer>
  </Container>
);

// export default React.memo(PickupSpaceList, (prevProps, nextProps) => prevProps.spaceList === nextProps.spaceList);
export default React.memo(PickupSpaceList, () => true);
