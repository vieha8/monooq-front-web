// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import ManageSpaceListItem from 'components/atomic/LV2/ManageSpaceListItem';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const ListItem = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 540px;
  margin: 27px auto ${Dimens.small}px;
  ${media.tablet`
    display: block;
    margin 27px auto ${Dimens.small}px;
  `};
`;

type PropTypes = {
  spaces: Array<{
    image: {
      src: string,
      alt: string,
    },
    address: string,
    content: string,
    furniture?: boolean,
    prices: Array<number>,
    onClickEdit: Function,
    onClickRemove: Function,
    link: string,
  }>,
  onClickHostEntry: Function,
};

export default (props: PropTypes) => (
  <div>
    {props.spaces.map((space, i) => (
      <Fragment key={`manage_space_list_item_${i}`}>
        <ListItem index={i}>
          <ManageSpaceListItem {...space} />
        </ListItem>
        {i % 2 === 1 && <br />}
      </Fragment>
    ))}
  </div>
);
