// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import HostEntry from 'components/atomic/LV1/HostEntry';
import ManageSpaceListItem from 'components/atomic/LV2/ManageSpaceListItem';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const ListItem = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 540px;
  margin: 20px auto ${Dimens.medium2}px;
  ${media.tablet`
    display: block;
    margin 10px auto ${Dimens.medium3}px;
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
    <HostEntryWrapper>
      <HostEntry onClick={props.onClickHostEntry} />
    </HostEntryWrapper>
  </div>
);
