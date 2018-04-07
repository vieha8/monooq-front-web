// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/atoms/InlineText';
import SlideImage from 'components/atomic/atoms/SlideImage';
import { Dimens } from 'variables';

const Desc = styled.div`
  margin-top: ${Dimens.medium}px;
`;

type PropTypes = {
  images: Array<{
    original: string,
    thumbnail: string,
  }>,
  description: string,
};

export default (props: PropTypes) => (
  <div>
    <SlideImage
      images={props.images}
    />
    <Desc>
      <InlineText.Base>{props.description}</InlineText.Base>
    </Desc>
  </div>
);
