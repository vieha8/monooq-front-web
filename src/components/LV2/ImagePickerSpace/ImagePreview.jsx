import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import TextLink from 'components/LV1/Texts/TextLink';
import { Dimens, Colors, FontSizes } from 'variables';

const Wrap = styled.div`
  vertical-align: top;
  width: 100%;
  height: 117px;
  ${media.phone`
    height: 77px;
  `};
  border-radius: 7px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${Dimens.xsmall}px;
  border: 1px solid ${Colors.lightGray2};
  overflow: hidden;
  object-fit: cover;
`;

const Delete = styled.span`
  position: absolute;
  display: block;
  bottom: 0;
  width: 100%;
  height: auto;
  font-size: ${FontSizes.small_12}px;
  font-weight: bold;
  line-height: ${Dimens.small_10}px;
  color: ${Colors.white};
  text-align: center;
  background-color: rgba(0, 0, 0, 0.48);
  padding: ${Dimens.small}px 0;
  border-radius: 0 0 6px 6px;
  border: 1px solid ${Colors.lightGray2};
  border-top: none;
  ${media.phone`
    font-size: ${FontSizes.xsmall_8}px;
    padding: ${Dimens.xxsmall}px 0;
  `};
`;

export default ({ imageUrl, onClickDelete }) => (
  <Wrap>
    <ImageWrapper>
      <Image src={imageUrl} alt="" />
      <TextLink
        onClick={e => {
          e.preventDefault();
          onClickDelete();
        }}
        fontSize={FontSizes.medium2}
      >
        <Delete>削除</Delete>
      </TextLink>
    </ImageWrapper>
  </Wrap>
);
