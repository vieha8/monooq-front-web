import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import Image from 'components/LV2/Space/Image';

const Wrap = styled.div`
  margin: auto;
  padding: 0;
  ${media.tablet`
    ${props =>
      props.confirm &&
      `
      padding: 0 0 140px;
    `};
  `};
`;

const SpaceDetailWrap = styled.div`
  display: flex;
  max-width: 1000px;
  margin: auto;
  padding: ${Dimens.medium2_36}px ${Dimens.medium}px 0;
  ${media.tablet`
    padding: ${Dimens.medium}px ${Dimens.medium}px 0;
  `};
`;

export default ({ confirm, images, children }) => (
  <Wrap confirm={confirm}>
    <Image images={images} />
    <SpaceDetailWrap>{children}</SpaceDetailWrap>
  </Wrap>
);
