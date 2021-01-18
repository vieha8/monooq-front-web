import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Colors, Dimens } from 'variables';
import Card from 'components/LV1/Card';
import ImageHero from 'components/LV1/Images/ImageHero';
import InlineText from 'components/LV1/Texts/InlineText';
import Availability from 'components/LV1/Texts/Availability';

const Wrap = styled.div`
  ${props =>
    !props.manage &&
    `
      width: 240px;
  `};
`;

const CardStyled = styled(Card)`
  display: flex;
`;

const ImageWrapper = styled.div`
  max-width: 180px;
`;

const ContentWrapper = styled.div`
  max-width: 300px;
  padding-left: ${Dimens.medium}px;
`;

const TopWrap = styled.div`
  display: inline-flex;
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

const ContentTextWrap = styled(InlineText.Base)`
  display: block;
  height: 6rem;
  margin: 5px auto;
  ${props =>
    !props.manage &&
    `
      height: auto;
      max-height: 1.5em;
      overflow: hidden;
      text-overflow: ellipsis;
  `};
`;

const ContentText = styled.span`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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
  margin-top: ${Dimens.xxsmall_5}px;
  font-weight: bold;
  ${props =>
    !props.manage &&
    `
      max-height: 1.5em;
      overflow: hidden;
      text-overflow: ellipsis;
  `};
`;

export default ({ href, onClick, image, manage, address, content, prices, status, furniture }) =>
  manage ? (
    <Wrap manage>
      <Link href={href || ''}>
        <a>
          <CardStyled noBorder noPadding pointer onClick={onClick}>
            <ImageWrapper>
              <ImageHero large src={image.src} alt={image.alt} />
            </ImageWrapper>
            <ContentWrapper>
              <TopWrap>
                <Availability status={status} />
              </TopWrap>
              <ContentTextWrap manage={manage}>
                <ContentText>{content || ''}</ContentText>
                <PriceText manage={manage}>{`${prices.join('円/')}円`}</PriceText>
              </ContentTextWrap>
            </ContentWrapper>
          </CardStyled>
        </a>
      </Link>
    </Wrap>
  ) : (
    <Wrap>
      <Link href={href || ''}>
        <a>
          <Card noPadding pointer onClick={onClick}>
            <ImageWrapper>
              <ImageHero height={150} medium src={image.src} alt={image.alt} />
            </ImageWrapper>
            <ContentWrapper>
              <AddressText>{address || ''}</AddressText>
              <ContentTextWrap>{content || ''}</ContentTextWrap>
              <HomeApplianceText>{furniture ? '家具・家電OK' : ' '}</HomeApplianceText>
              <PriceLabel>料金目安（30日間）</PriceLabel>
              <PriceText>{prices.join(' / ')}</PriceText>
            </ContentWrapper>
          </Card>
        </a>
      </Link>
    </Wrap>
  );
