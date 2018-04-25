// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import HostEntry from 'components/atomic/LV1/HostEntry';
import ManageSpaceListItem from 'components/atomic/LV2/ManageSpaceListItem';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const ListItem = styled.div`
  display: inline-block;
  margin-bottom: ${Dimens.medium}px;
  ${props =>
    props.index % 2 === 1 &&
    `
      margin-left: ${Dimens.medium}px;
    `};
  ${media.tablet`
    width: 240px;
    display: block;
    margin 0 auto ${Dimens.medium}px;
  `};
`;

const HostEntryWrapper = styled.div`
  position: fixed;
  right: ${Dimens.medium3}px;
  bottom: ${Dimens.medium3}px;
  ${media.phone`
    display: none;
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
    onClickSpace: Function,
    onClickEdit: Function,
    onClickRemove: Function,
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
    <HostEntryWrapper>
      <HostEntry onClick={props.onClickHostEntry} />
    </HostEntryWrapper>
  </div>
);
