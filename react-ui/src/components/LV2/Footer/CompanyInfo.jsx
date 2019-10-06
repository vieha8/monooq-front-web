// @flow

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';
import ImageLogo from 'components/LV1/Images/ImageLogo';

const Wrapper = styled.div`
  width: 100%;
  ${media.tablet`
    text-align: right;
  `};
`;

const WrapLogo = styled(Link)`
  width: 112px;
  display: inline-flex;
`;

const WrapList = styled.div`
  margin-top: ${Dimens.xsmall}px;
  font-size: ${FontSizes.small_12}px;
  line-height: ${Dimens.medium_18}px;
  color: ${Colors.white};
  ${props =>
    props.sp &&
    `
      margin-top: ${Dimens.medium_18}px;
    `};
`;

export default () => (
  <Fragment>
    <Wrapper>
      <WrapLogo to={Path.top()}>
        <ImageLogo.Header width={112} />
      </WrapLogo>
      <WrapList>&copy; MonooQ inc.</WrapList>
    </Wrapper>
  </Fragment>
);
