import React from 'react';
import styled from 'styled-components';
import ButtonManage from 'components/LV2/Forms/ButtonManage';
import PlaceListVerticalItem from 'components/LV2/Items/PlaceListVerticalItem';

const Wrap = styled.div``;

export default ({
  image,
  address,
  content,
  furniture,
  prices,
  link,
  status,
  onClickRemove,
  onClickEdit,
}) => (
  <Wrap>
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
    <ButtonManage onClickRemove={onClickRemove} onClickEdit={onClickEdit} />
  </Wrap>
);
