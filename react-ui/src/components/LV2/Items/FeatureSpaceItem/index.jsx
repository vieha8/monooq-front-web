// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from 'helpers/style/media-query';
import LazyLoad from 'react-lazyload';
import Card from 'components/LV1/Card';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';
import ImageHero from 'components/LV1/Images/ImageHero';
import InlineText from 'components/LV1/Texts/InlineText';
import { Colors, Dimens } from 'variables';
import { formatName } from 'helpers/string';

const Container = styled(Link)`
  display: block;
  width: 100%;
  min-width: 260px;
  display: inline-block;
  cursor: pointer;
  box-shadow: none;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    transition: 0.3s;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 160px;
  overflow: hidden;
  ${media.tablet`
    height: 120px;
    ${props =>
      props.large &&
      `
      height: 160px;
    `};
  `};
`;

const UserContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 120px;
  top: ${(160 - 120) / 2}px;
  text-align: center;
  ${media.tablet`
    top: 14px;
    font-size: 12px;
  `};
`;

const DetailContainer = styled.div`
  height: 130px;
  text-align: center;
  padding: ${Dimens.medium2}px 0;
`;

const SpaceImageContainer = styled.div`
  position: relative;
`;

const SpaceImageFilter = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
`;

type PropTypes = {
  link: string,
  user: {
    image: string,
    name: string,
  },
  space: {
    image: string,
    price: string,
    area: string,
    description: string,
    color?: string,
  },
  large?: boolean,
};

export default ({ link, large, space, user }: PropTypes) => (
  <Container to={link} large={large}>
    <Card noPadding>
      <ImageContainer large={large}>
        <SpaceImageContainer>
          <SpaceImageFilter />
          <LazyLoad>
            <ImageHero src={space.image} />
          </LazyLoad>
        </SpaceImageContainer>
        <UserContainer>
          <LazyLoad>
            <ImageAvatar src={user.image} size={44} />
          </LazyLoad>
          <div>
            <InlineText.Base color={Colors.white}>{`${formatName(user.name)}さん`}</InlineText.Base>
          </div>
          <div>
            <InlineText.Small color={Colors.white}>{`${space.price}円から`}</InlineText.Small>
          </div>
        </UserContainer>
      </ImageContainer>
      <DetailContainer large={large}>
        <InlineText.Small>{space.area}</InlineText.Small>
        <br />
        <InlineText.Small color={space.color}>{space.description}</InlineText.Small>
      </DetailContainer>
    </Card>
  </Container>
);
