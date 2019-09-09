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
  ${props =>
    props.sp &&
    `
      display: none;
    `};

  ${media.tablet`
    display: none;
    ${props =>
      props.sp &&
      `
        display: flex;
      `};
  `};
`;

const WrapInner = styled.div`
  width: 50%;
  text-align: ${props => (props.right ? 'right' : 'left')};
  ${props =>
    props.sp &&
    `
      margin-top: ${Dimens.xxsmall_4}px;
    `};
`;

const WrapLogo = styled(Link)`
  width: 107px;
  display: inline-flex;
  ${media.tablet`
    width: 112px;
  `};
`;

const WrapCaption = styled.div`
  margin: ${Dimens.medium_22}px auto ${Dimens.small2_14}px;
  font-size: ${FontSizes.medium}px;
  line-height: ${Dimens.medium_18}px;
  color: ${Colors.white};
  ${props =>
    props.sp &&
    `
      margin-top: 0px;
    `};
`;

const WrapList = styled.div`
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
        <ImageLogo.HeaderFill />
      </WrapLogo>
      <WrapCaption>モノオク株式会社</WrapCaption>
      <WrapList>
        東京都渋谷区渋谷2-6-6
        <br />
        Goodmorning building
        <br />
        <br />
        Monooq inc. &copy;2019
      </WrapList>
    </Wrapper>
    <Wrapper sp>
      <WrapInner>
        <WrapCaption sp>モノオク株式会社</WrapCaption>
        <WrapList>
          東京都渋谷区渋谷2-6-6
          <br />
          Goodmorning building
        </WrapList>
      </WrapInner>
      <WrapInner right>
        <WrapLogo to={Path.top()}>
          <ImageLogo.HeaderFill />
        </WrapLogo>
        <WrapList sp>Monooq inc. &copy;2019</WrapList>
      </WrapInner>
    </Wrapper>
  </Fragment>
);
