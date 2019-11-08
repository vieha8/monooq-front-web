import React, { Fragment } from 'react';
import styled from 'styled-components';
import SpaceManageListItem from 'components/LV2/Items/SpaceManageListItem';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const ListWrap = styled.div`
  max-width: 600px;
  margin: auto;
`;

const ListItem = styled.div`
  display: inline-block;
  width: 100%;
  margin: 27px auto ${Dimens.small}px;
  ${media.tablet`
    display: block;
    margin 27px auto ${Dimens.small}px;
  `};
`;

export default ({ spaces }) => (
  <ListWrap>
    {spaces.map((space, i) => (
      <Fragment key={`manage_space_list_item_${i}`.toString()}>
        <ListItem index={i}>
          <SpaceManageListItem {...space} />
        </ListItem>
        {i % 2 === 1 && <br />}
      </Fragment>
    ))}
  </ListWrap>
);
