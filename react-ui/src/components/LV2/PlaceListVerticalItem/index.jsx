// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Link } from 'react-router-dom';
import { Colors, Dimens } from 'variables';
import Card from 'components/LV1/Card';
import HeroImage from 'components/LV1/Images/HeroImage';
import InlineText from 'components/LV1/Texts/InlineText';

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

const NoCardShadowStyle = `
  box-shadow: none;
  transition: 0.3s;
  border: 1px solid rgba(0,0,0,0);
  &:hover {
    border: 1px solid rgba(0,0,0,0.4);
    transition: 0.3s; 
    border-radius:6px;
  }
  width: 100%;
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
  href?: string,
  onClick?: Function,
  image: {
    src: string,
    alt: string,
  },
  manage?: boolean,
  address: string,
  content: string,
  prices: Array<number>,
  status?: string,
  furniture?: boolean,
};

export default ({
  href,
  onClick,
  image,
  manage,
  address,
  content,
  prices,
  status,
  furniture,
}: PropTypes) =>
  manage ? (
    <Container manage>
      <Link to={href || ''}>
        <Card noBorder noPadding pointer onClick={onClick} customStyle={NoCardShadowStyle}>
          <ImageWrapper>
            <HeroImage height={290} heightSp={180} large src={image.src} alt={image.alt} />
          </ImageWrapper>
          <ContentWrapper>
            <AddressText manage={manage}>{address || ''}</AddressText>
            <ContentText manage={manage}>{content || ''}</ContentText>
            <PriceText manage={manage}>{`${prices.join('円/')}円`}</PriceText>
            {status === 'public' ? (
              <StatusText manage={manage}>●公開中</StatusText>
            ) : (
              <StatusText manage={manage} draft>
                ○下書き
              </StatusText>
            )}
          </ContentWrapper>
        </Card>
      </Link>
    </Container>
  ) : (
    <Container>
      <Link to={href || ''}>
        <Card noPadding pointer onClick={onClick} customStyle={CardShadowStyle}>
          <ImageWrapper>
            <HeroImage height={150} medium src={image.src} alt={image.alt} />
          </ImageWrapper>
          <ContentWrapper>
            <AddressText>{address || ''}</AddressText>
            <ContentText>{content || ''}</ContentText>
            <HomeApplianceText>{furniture ? '家具・家電OK' : ' '}</HomeApplianceText>
            <PriceLabel>料金目安（30日間）</PriceLabel>
            <PriceText>{prices.join(' / ')}</PriceText>
          </ContentWrapper>
        </Card>
      </Link>
    </Container>
  );
