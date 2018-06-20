// @flow

import React from 'react';
import styled from 'styled-components';

import Card from 'components/atomic/LV1/Card';
import HeroImage from 'components/atomic/LV1/HeroImage';
import AvatarImage from 'components/atomic/LV1/AvatarImage';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors, Dimens } from 'variables';

const ImageContainer = styled.div`
  position: relative;
  height: 160px;
  overflow: hidden;
`;

const UserContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 120px;
  top: ${(160 - 120) / 2}px;
  text-align: center;
`;

const DetailContainer = styled.div`
  text-align: center;
  padding: ${Dimens.medium}px 0;
`;

type PropTypes = {
  user: {
    image: String,
    name: String,
  },
  space: {
    image: String,
    price: String,
    area: String,
    description: String,
    color?: String,
  },
};

export default (props: PropTypes) => (
  <Card>
    <ImageContainer>
      <HeroImage src={props.space.image} />
      <UserContainer>
        <div>
          <AvatarImage src={props.user.image} />
        </div>
        <div>
          <InlineText.Base color={Colors.white}>{props.user.name}さん</InlineText.Base>
        </div>
        <div>
          <InlineText.Small color={Colors.white}>{props.space.price}円〜</InlineText.Small>
        </div>
      </UserContainer>
    </ImageContainer>
    <DetailContainer>
      <div>
        <InlineText.Base>{props.space.area}</InlineText.Base>
      </div>
      <div>
        <InlineText.Base color={props.space.color}>{props.space.description}</InlineText.Base>
      </div>
    </DetailContainer>
  </Card>
);
