// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

const LineupList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`;

const LineupItem = styled.li`
  height: ${Dimens.medium1_26}px;
  margin-bottom: ${Dimens.medium_20}px;
  margin-right: ${Dimens.medium3_40}px;
  ${media.phone`
    height: ${Dimens.medium}px;
    margin-right: ${Dimens.small_10}px;
  `};
`;

const LineupImage = styled.img`
  height: 100%;
`;

type PropTypes = {
  list: Array<{
    link: string,
    image: string,
    alt: string,
  }>,
};

export default ({ list }: PropTypes) => (
  <LineupList>
    {list.map((item, i) => (
      <LineupItem key={i.toString()}>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          <LineupImage src={item.image} alt={item.alt} />
        </a>
      </LineupItem>
    ))}
  </LineupList>
);
