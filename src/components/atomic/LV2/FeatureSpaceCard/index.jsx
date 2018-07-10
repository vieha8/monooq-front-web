// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from 'helpers/style/media-query';

import Card from 'components/atomic/LV1/Card';
import HeroImage from 'components/atomic/LV1/HeroImage';
import AvatarImage from 'components/atomic/LV1/AvatarImage';
import InlineText from 'components/atomic/LV1/InlineText';
import { Colors, Dimens } from 'variables';

const Container = styled(Link)`
  display: block;
  width: 260px;
  display: inline-block;
  cursor: pointer;
  box-shadow: none;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    transition: 0.3s;
  }
  ${media.tablet`
    width: 160px;
    ${props =>
      props.large &&
      `
      width: 320px;
    `};
  `};
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
    top: 0;
  `};
`;

const DetailContainer = styled.div`
  text-align: center;
  padding: ${Dimens.medium2}px 0;
  ${media.tablet`
    padding: ${Dimens.small}px 0;
    ${props =>
      props.large &&
      `
      padding: ${Dimens.medium2}px 0;
    `};
  `};
`;

const ImageOpacity = styled.div`
  opacity: 0.8;
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

export default (props: PropTypes) => (
  <Container to={props.link} large={props.large}>
    <Card noPadding>
      <ImageContainer large={props.large}>
        <ImageOpacity>
          <HeroImage src={props.space.image} />
        </ImageOpacity>
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
      <DetailContainer large={props.large}>
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
