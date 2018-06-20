// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';

import Card from 'components/atomic/LV1/Card';
import HeroImage from 'components/atomic/LV1/HeroImage';
import AvatarImage from 'components/atomic/LV1/AvatarImage';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors, Dimens } from 'variables';

const Container = styled.div`
  width: 260px;
  display: inline-block;
  ${media.phone`
    width: 160px;
  `};
`;

const ImageContainer = styled.div`
  position: relative;
  height: 160px;
  overflow: hidden;
  ${media.phone`
    height: 120px;
  `};
`;

const UserContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 120px;
  top: ${(160 - 120) / 2}px;
  text-align: center;
  ${media.phone`
    top: 0;
  `};
`;

const DetailContainer = styled.div`
  text-align: center;
  padding: ${Dimens.medium2}px 0;
  ${media.phone`
    padding: ${Dimens.small}px 0;
  `};
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
  <Container>
    <Card noPadding>
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
          <InlineText.Small>{props.space.area}</InlineText.Small>
        </div>
        <div>
          <InlineText.Small color={props.space.color}>{props.space.description}</InlineText.Small>
        </div>
      </DetailContainer>
    </Card>
  </Container>
);
