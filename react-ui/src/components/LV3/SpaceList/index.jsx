// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors, FontSizes } from 'variables';
import { convertImgixUrl } from 'helpers/imgix';
import dummySpaceImage from 'images/dummy_space.png';
import SearchResult from 'components/LV3/SearchResult';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: ${Dimens.small2}px auto 0;
`;

const WrapInner = styled.div`
  margin: 0 ${Dimens.medium}px;
`;

const WrapList = styled.div`
  width: 100%;
  display: flex;
  background-color: white;
`;

const Caption = styled.div`
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  line-height: ${Dimens.medium1}px;
  color: ${Colors.black2};
  margin-bottom: ${Dimens.small2}px;
`;

const CaptionSub = styled.div`
  font-size: ${FontSizes.medium}px;
  line-height: ${Dimens.medium}px;
  color: ${Colors.black2};
  margin-bottom: ${Dimens.medium2_32}px;
  ${media.phone`
    margin-bottom: 0px;
  `};
`;

type PropTypes = {
  isTag?: boolean,
  caption: string,
  captionSub: string,
  spaceList: Array<string>,
};

export default ({ isTag, caption, captionSub, spaceList }: PropTypes) => (
  <Wrapper>
    <WrapInner>
      <Caption>{caption}</Caption>
      <CaptionSub>{captionSub}</CaptionSub>
      <WrapList>
        <SearchResult
          isTag={isTag}
          isHome
          key=""
          spaces={spaceList.map(({ Space }) => ({
            id: Space.ID,
            image:
              Space.Images.length !== 0
                ? convertImgixUrl(
                    Space.Images[0].ImageUrl,
                    'fit=fillmax&fill-color=DBDBDB&w=340&h=240&auto=format',
                  )
                : dummySpaceImage,
            title: Space.Title,
            address: `${Space.AddressPref}${Space.AddressCity}`,
            isFurniture: Space.IsFurniture,
            priceFull: Space.PriceFull,
            priceHalf: Space.PriceHalf,
            priceQuarter: Space.PriceQuarter,
          }))}
        />
      </WrapList>
    </WrapInner>
  </Wrapper>
);
