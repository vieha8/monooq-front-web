// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import Path from 'config/path';
import PlaceListVerticalItem from 'components/atomic/molecules/PlaceListVerticalItem';

const SpaceListContainer = styled.ul`
  overflow-x: auto;
  padding: ${Dimens.medium3}px 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Cell = styled.li`
  display: table-cell;
  &:not(:first-child) {
    padding-left: ${Dimens.medium}px;
  }
`;

export type PropTypes = {
  spaces: Array<{
    id: number,
    image: string,
    address: string,
    content: string,
    furniture?: boolean,
    prices: Array<number>,
  }>,
};

export default (props: PropTypes) => (
  <SpaceListContainer>
    {props.spaces.map((space, i) => (
      <Cell key={`space_list_item_${i}`}>
        <PlaceListVerticalItem
          image={{
            src: space.image,
            alt: '',
          }}
          address={space.address}
          content={space.content}
          furniture={space.furniture}
          prices={space.prices}
          href={Path.space(space.id)}
        />
      </Cell>
    ))}
  </SpaceListContainer>
);
