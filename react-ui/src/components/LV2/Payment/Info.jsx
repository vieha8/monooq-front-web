import React, { Fragment } from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import ImageHero from 'components/LV1/Images/ImageHero';
import InlineText from 'components/LV1/Texts/InlineText';
import InfoHost from 'components/LV2/Space/InfoHost';
import dummySpaceImage from 'images/img-dummy-space.png';

const Row = styled.div`
  padding-bottom: ${Dimens.small2_15}px;
  border-bottom: 1px solid ${Colors.borderGray};
`;

const ImageWrap = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 100px;
`;

const ContentWrap = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding-left: 16px;
`;

const AddressText = styled(InlineText.Base)`
  display: block;
  color: ${Colors.brandPrimary};
`;

const TitleText = styled(InlineText.Small)`
  display: block;
  ${media.phone`
    font-size: ${FontSizes.small_12}px;
  `};
`;

export default ({ space }) => (
  <Fragment>
    <InfoHost
      id={space.user.id}
      name={space.user.name}
      imageUrl={space.user.imageUrl}
      lastLoginAt={space.user.lastLoginAt}
      message
    />
    <Row to={Path.space(space.id)} borderBottom>
      <ImageWrap>
        <ImageHero
          small
          src={space.images && space.images.length > 0 ? space.images[0].imageUrl : dummySpaceImage}
        />
      </ImageWrap>
      <ContentWrap>
        <AddressText>
          {space.addressPref}
          {space.addressCity}
          {space.addressTown}
        </AddressText>
        <TitleText>{space.title}</TitleText>
      </ContentWrap>
    </Row>
  </Fragment>
);
