// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Link } from 'react-router-dom';
import { Colors, Dimens } from 'variables';
import Card from 'components/atomic/LV1/Card';
import InlineText from 'components/atomic/LV1/InlineText';
import HeroImage from 'components/atomic/LV1/HeroImage';

const Container = styled.div`
  ${props =>
    !props.manage &&
    `
      width: 240px;
  `};
`;

const ImageWrapper = styled.div``;

const ContentWrapper = styled.div`
  padding: ${Dimens.small_10}px ${Dimens.medium}px;
  ${props =>
    props.manage &&
    `
    padding: ${Dimens.medium_20}px ${Dimens.xsmall}px ${Dimens.xsmall}px;
  `};
  ${media.phone`
    ${props =>
      props.manage &&
      `
        padding: ${Dimens.small_10}px ${Dimens.xsmall}px ${Dimens.xsmall}px;
    `};
  `};
`;

const AddressText = styled(InlineText.Base)`
  display: block;
  color: ${Colors.brandPrimary};
  ${props =>
    !props.manage &&
    `
      max-height: 1.5em;
      overflow: hidden;
      text-overflow: ellipsis;
  `};
`;

const ContentText = styled(InlineText.Base)`
  display: block;
  margin: 5px auto;
  ${props =>
    !props.manage &&
    `
      max-height: 1.5em;
      overflow: hidden;
      text-overflow: ellipsis;
  `};
`;

const StatusText = styled(InlineText.Tiny)`
  display: block;
  margin: 5px auto;
  color: ${Colors.brandPrimary};
  ${props =>
    !props.manage &&
    `
      max-height: 1.5em;
      overflow: hidden;
      text-overflow: ellipsis;
  `};
  ${props =>
    props.draft &&
    `
      color: ${Colors.lightGray1};
  `};
`;

const HomeApplianceText = styled(InlineText.Tiny)`
  display: block;
  font-weight: bold;
`;

const PriceLabel = styled(InlineText.Tiny)`
  display: block;
`;

const PriceText = styled(InlineText.Base)`
  display: block;
  font-weight: bold;
  ${props =>
    !props.manage &&
    `
      max-height: 1.5em;
      overflow: hidden;
      text-overflow: ellipsis;
  `};
`;

const CardShadowStyle = `
  box-shadow: none;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.4);
    transition: 0.3s; 
    border-radius:6px;
  }
  width: 100%;
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
  href?: string,
  onClick?: Function,
};

export default (props: PropTypes) =>
  props.manage ? (
    <Container manage>
      <Link to={props.href || ''}>
        <Card noBorder noPadding pointer onClick={props.onClick} customStyle={CardShadowStyle}>
          <ImageWrapper>
            <HeroImage height={290} heightSp={180} large {...props.image} />
          </ImageWrapper>
          <ContentWrapper>
            <AddressText manage={props.manage}>{props.address ? props.address : ''}</AddressText>
            <ContentText manage={props.manage}>{props.content ? props.content : ''}</ContentText>
            <PriceText manage={props.manage}>
              {props.prices.join('円/')}
              円〜
            </PriceText>
            {props.status === 'public' ? (
              <StatusText manage={props.manage}>●公開中</StatusText>
            ) : (
              <StatusText manage={props.manage} draft>
                ○下書き
              </StatusText>
            )}
          </ContentWrapper>
        </Card>
      </Link>
    </Container>
  ) : (
    <Container>
      <Link to={props.href || ''}>
        <Card noPadding pointer onClick={props.onClick} customStyle={CardShadowStyle}>
          <ImageWrapper>
            <HeroImage height={150} medium {...props.image} />
          </ImageWrapper>
          <ContentWrapper>
            <AddressText>{props.address ? props.address : ''}</AddressText>
            <ContentText>{props.content ? props.content : ''}</ContentText>
            <HomeApplianceText>{props.furniture ? '家具・家電OK' : ''}</HomeApplianceText>
            <PriceLabel>料金目安（30日間）</PriceLabel>
            <PriceText>{props.prices.join(' / ')}</PriceText>
          </ContentWrapper>
        </Card>
      </Link>
    </Container>
  );
