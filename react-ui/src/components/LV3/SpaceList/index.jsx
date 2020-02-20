import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors, FontSizes } from 'variables';
import { convertSpaceImgUrl } from 'helpers/imgix';
import dummySpaceImage from 'images/img-dummy-space.png';
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
  ${media.phone`
    margin-bottom: ${Dimens.small}px;
  `};
`;

const CaptionSub = styled.div`
  font-size: ${FontSizes.small}px;
  line-height: ${Dimens.small2_14}px;
  color: ${Colors.black2};
  margin-bottom: ${Dimens.medium2_32}px;
  ${media.phone`
    margin-bottom: 0px;
  `};
`;

export default ({ isTag, caption, captionSub, spaceList }) => (
  <Fragment>
    {spaceList && (
      <Wrapper>
        <WrapInner>
          <Caption>{caption}</Caption>
          <CaptionSub>{captionSub}</CaptionSub>
          <WrapList>
            <SearchResult
              isTag={isTag}
              isTop
              key=""
              spaces={spaceList.map(space => ({
                ...space,
                image:
                  space.images.length !== 0
                    ? convertSpaceImgUrl(space.images[0].imageUrl, 'w=600')
                    : dummySpaceImage,
              }))}
            />
          </WrapList>
        </WrapInner>
      </Wrapper>
    )}
  </Fragment>
);
