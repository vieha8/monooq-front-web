// @flow

import React from 'react';
import styled from 'styled-components';
import ManageButtons from 'components/LV2/ManageButtons';
import PlaceListVerticalItem from 'components/LV2/PlaceListVerticalItem';
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
  link: string,
  status: string,
  onClickEdit: Function,
};

export default ({
  image,
  address,
  content,
  furniture,
  prices,
  link,
  status,
  onClickEdit,
}: PropTypes) => (
  <Container>
    <Cell>
      <PlaceListVerticalItem
        image={image}
        address={address}
        content={content}
        furniture={furniture}
        prices={prices}
        href={link}
        status={status}
        manage
      />
      <ManageButtons onClickEdit={onClickEdit} fontBold />
    </Cell>
  </Container>
);
