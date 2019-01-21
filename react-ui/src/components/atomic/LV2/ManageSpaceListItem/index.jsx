// @flow

import React from 'react';
import styled from 'styled-components';
import ManageButtons from 'components/atomic/LV2/ManageButtons';
import PlaceListVerticalItem from 'components/atomic/LV2/PlaceListVerticalItem';
import { Dimens } from 'variables';

const Container = styled.div`
  display: table;
  width: 100%;
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
  onClickEdit: Function,
  link: string,
  status: string,
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
        href={props.link}
        status={props.status}
        manage
      />
      <ManageButtons onClickEdit={props.onClickEdit} fontBold />
    </Cell>
  </Container>
);
