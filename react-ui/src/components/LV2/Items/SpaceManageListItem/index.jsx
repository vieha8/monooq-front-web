// @flow

import React from 'react';
import styled from 'styled-components';
import ButtonManage from 'components/LV2/Forms/ButtonManage';
import PlaceListVerticalItem from 'components/LV2/Items/PlaceListVerticalItem';
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
      <ButtonManage onClickEdit={onClickEdit} fontBold />
    </Cell>
  </Container>
);
