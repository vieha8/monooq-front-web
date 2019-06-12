// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes } from 'variables';
import StyledDefaultContainer from 'components/LV1/DefaultContainer/StyledDefaultContainer';

const ServiceContainer = styled(StyledDefaultContainer)`
  display: flex;
`;

const ServiceWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ItemWrap = styled.div`
  &:nth-of-type(n + 2) {
    margin-top: 80px;
  }
  ${media.phone`
    &:nth-of-type(n + 2) {
      margin-top: ${Dimens.medium4_50}px;
    }
  `};
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: ${Dimens.medium2_35}px;
  font-size: ${FontSizes.medium1}px;
  ${media.phone`
    text-align: left;
    margin-bottom: 0px;
  `};
`;

const LeftSection = styled.div`
  width: 35%;};
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  ${media.phone`
    width: 100%;
    margin: ${Dimens.medium2}px auto;
    ${props =>
      props.noMarginBottom &&
      `
      margin: ${Dimens.medium_20}px auto 0px;
    `};
  `};
`;

const DescriptionLogoWrap = styled.div`
  margin-top: ${Dimens.small_10}px;
  line-height: normal;
  ${media.phone`
    font-size: ${FontSizes.small_15}px;
  `};
  ${media.phoneSmall`
    font-size: ${FontSizes.small_12}px;
  `};
`;

const RightSection = styled.div`
  display: inline-block;
  width: calc(65% - ${Dimens.medium2}px);
  margin-left: ${Dimens.medium2}px;
  text-align: center;
  vertical-align: middle;
  ${media.phone`
    width: 100%;
    margin-left: 0px;
    text-align: left;
  `};
`;

const LinkToPickGo = styled.a`
  display: block;
  &:hover {
    opacity: 0.8;
  }
`;

const ImageLogo = styled.img`
  height: ${Dimens.large_60}px;
  ${media.phone`
    height: ${Dimens.medium4_50}px;
  `};
  ${props =>
    props.type_70 &&
    `
      height: ${Dimens.large2_70}px;
      ${media.phone`
        height: ${Dimens.large_60}px;
      `};
  `};
`;

const CatchPhrase = styled.div`
  margin-bottom: ${Dimens.small_10}px;
  font-size: ${FontSizes.large_32}px;
  font-weight: bold;
  ${media.phone`
    font-size: ${FontSizes.medium2_26}px;
  `};
`;

const SubCatchPhrase = styled.div`
  font-size: ${FontSizes.medium2}px;
  ${media.phone`
    font-size: ${FontSizes.small_15}px;
  `};
`;

type PropTypes = {
  serviceList: Array<{
    title: string,
    noMarginBottom?: boolean,
    serviceUrl: string,
    serviceLogo: Array<{
      type_70?: boolean,
      src: string,
      alt: string,
    }>,
    descriptionLogo?: React.Element<*>,
    catchPhrase: React.Element<*>,
    description?: React.Element<*>,
  }>,
};

export default ({ serviceList }: PropTypes) => (
  <ServiceContainer>
    <ServiceWrapper>
      {serviceList.map((item, i) => (
        <ItemWrap key={i.toString()}>
          <Title>{item.title}</Title>
          <LeftSection noMarginBottom={item.noMarginBottom}>
            <LinkToPickGo
              component={Link}
              href={item.serviceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImageLogo
                type_70={item.serviceLogo.type_70}
                src={item.serviceLogo.src}
                alt={item.serviceLogo.alt}
              />
            </LinkToPickGo>
            <DescriptionLogoWrap>{item.descriptionLogo}</DescriptionLogoWrap>
          </LeftSection>
          <RightSection>
            <CatchPhrase>{item.catchPhrase}</CatchPhrase>
            <SubCatchPhrase>{item.description}</SubCatchPhrase>
          </RightSection>
        </ItemWrap>
      ))}
    </ServiceWrapper>
  </ServiceContainer>
);
