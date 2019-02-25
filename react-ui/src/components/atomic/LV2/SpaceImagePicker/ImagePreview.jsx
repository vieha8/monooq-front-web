// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { CloseIcon } from 'components/atomic/LV1/ActionIcon';
import TextLink from 'components/atomic/LV1/TextLink';
import { Dimens, Colors, FontSizes } from 'variables';

const Container = styled.div`
  vertical-align: top;
  width: 100%;
  height: 258px;
  ${media.phone`
    height: 164px;
  `};
  border-radius: ${Dimens.xsmall}px;
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
  overflow: hidden;
  object-fit: cover;
`;

const Delete = styled.span`
  position: absolute;
  display: block;
  right: 0;
  top: 0;
  width: 36px;
  text-align: center;
  background-color: ${Colors.brandPrimary};
  border-radius: 18px;
  margin: ${Dimens.small}px ${Dimens.small2}px 0 0;
  padding: 0 0 2px 0;
  ${media.phone`
    width: 32px;
    margin: ${Dimens.small}px ${Dimens.small}px 0 0;
    padding: 5px 0;
    border-radius: ${Dimens.medium}px;
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
        <Delete>
          <CloseIcon fontSize={20} />
        </Delete>
      </TextLink>
    </ImageWrapper>
  </Container>
);
