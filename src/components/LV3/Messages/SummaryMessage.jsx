import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Path from 'config/path';
import { Dimens, Colors } from 'variables';
import ImageHero from 'components/LV1/Images/ImageHero';
import InlineText from 'components/LV1/Texts/InlineText';
import InfoHost from 'components/LV2/Space/InfoHost';
import InfoUser from 'components/LV2/Space/InfoUser';

const Wrap = styled.div`
  margin-bottom: ${Dimens.medium1_25}px;
  padding-bottom: ${Dimens.small2_15}px;
  border-bottom: 1px solid ${Colors.borderGray};
`;

const Row = styled(Link)`
  display: table;
  cursor: pointer;
`;

const Item = styled.div`
  display: table-cell;
  vertical-align: middle;
  ${props =>
    props.image &&
    `
    width: 100px;
    padding-right: ${Dimens.medium}px;
  `};
`;

const TitleSpace = styled(InlineText.Small)`
  display: block;
`;

const SummaryMessage = ({ isHost, room }) => {
  return (
    room && (
      <Wrap>
        {isHost ? (
          <InfoUser
            id={room.user.id}
            name={(room.user || {}).name}
            imageUrl={room.user.imageUrl}
            infoHost
            message
            lastLoginAt={room.user.lastLoginAt}
          />
        ) : (
          <InfoHost
            id={room.space.user.id}
            name={(room.space.user || {}).name}
            imageUrl={room.space.user.imageUrl}
            infoHost
            message
            lastLoginAt={room.space.user.lastLoginAt}
          />
        )}
        <Row to={Path.space(room.space.id)}>
          <Item image>
            <ImageHero small src={room.space.images[0].imageUrl} />
          </Item>
          <Item>
            <InlineText.Base color={Colors.brandPrimary}>
              {room.space.addressPref}
              {room.space.addressCity}
              {room.space.addressTown}
            </InlineText.Base>
            <TitleSpace fontSizeSp={12}>{room.space.title}</TitleSpace>
          </Item>
        </Row>
      </Wrap>
    )
  );
};

export default SummaryMessage;
