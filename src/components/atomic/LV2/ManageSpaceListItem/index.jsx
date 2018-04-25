// @flow

import React from 'react';
import styled from 'styled-components';
import ManageButtons from 'components/atomic/LV2/ManageButtons';
import PlaceListVerticalItem from 'components/atomic/LV2/PlaceListVerticalItem';
import { Dimens } from 'variables';

const Container = styled.div`
  display: table;
`;

const Cell = styled.div`
  display: table-cell;
  vertical-align: top;
  &:not(:first-child) {
    padding-left: ${Dimens.small}px;
  }
`;

type PropTypes = {
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
};

export default (props: PropTypes) => (
  <Container>
    <Cell>
      <PlaceListVerticalItem
        image={props.image}
        address={props.address}
        content={props.content}
        furniture={props.furniture}
        prices={props.prices}
        onClick={props.onClickSpace}
      />
    </Cell>
    <Cell>
      <ManageButtons
        removable
        onClickEdit={props.onClickEdit}
        onClickRemove={props.onClickRemove}
      />
    </Cell>
  </Container>
);
