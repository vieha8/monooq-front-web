// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import TextLink from 'components/LV1/TextLink';
import { Dimens, Colors, FontSizes } from 'variables';

const Container = styled.div`
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

type PropTypes = {
  imageUri: string,
  onClickDelete: Function,
};

export default (props: PropTypes) => (
  <Container>
    <ImageWrapper>
      <Image src={props.imageUri} alt="" />
      <TextLink
        onClick={e => {
          e.preventDefault();
          props.onClickDelete();
        }}
        fontSize={FontSizes.medium2}
      >
        <Delete>削除</Delete>
      </TextLink>
    </ImageWrapper>
  </Container>
);
