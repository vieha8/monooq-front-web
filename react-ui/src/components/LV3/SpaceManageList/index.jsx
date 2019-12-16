import React, { Fragment } from 'react';
import styled from 'styled-components';
import SpaceManageListItem from 'components/LV2/Items/SpaceManageListItem';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
`;

const ListItem = styled.div`
  width: calc(50% - ${Dimens.small2}px);
  margin: ${Dimens.small2}px auto;
  padding: ${Dimens.medium1}px ${Dimens.medium1}px 0 ${Dimens.medium1}px;
  background-color: ${Colors.white};
  &:nth-child(2n) {
    margin-left: ${Dimens.medium1}px;
  }
  ${media.tablet`
    width: 100%;
    &:nth-child(2n) {
      margin-left: 0;
    }
  `};
`;

export default ({ spaces }) => (
  <Wrap>
    {spaces.map((space, i) => (
      <Fragment key={`manage_space_list_item_${i}`.toString()}>
        <ListItem index={i}>
          <SpaceManageListItem {...space} />
        </ListItem>
      </Fragment>
    ))}
  </Wrap>
);
