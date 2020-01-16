import React from 'react';
import styled from 'styled-components';
import { mediaMin } from 'helpers/style/media-query';
import { Colors, Dimens } from 'variables';
import imageFacebook from 'images/icon-facebook.svg';
import { PrimaryButton } from './Primary';

const Facebook = styled(PrimaryButton)`
  background: ${Colors.facebook};
  color: ${Colors.white};

  ${props =>
    props.disabled
      ? `
      cursor: not-allowed;
      border-color: ${Colors.lightGray1};
      color: ${Colors.lightGray1};    
    `
      : `
      &:active {
        background: ${Colors.facebookHover};
      }
    `};

  ${mediaMin.tablet`
    ${props =>
      !props.disabled &&
      `
        &:hover {
          background: ${Colors.facebookHover};
        };
      `};
  `};
`;

const ImageWrap = styled.span`
  vertical-align: top;
`;

const Image = styled.img`
  width: ${Dimens.medium_20}px;
  position: relative;
  top: 1px;
`;

const getChildren = props => {
  const { children } = props;
  return children;
};

export default ({ loading, ...props }) => (
  <Facebook {...props} tabIndex={0}>
    {!loading && (
      <ImageWrap>
        <Image src={imageFacebook} alt="icon-facebook" />
        &nbsp;&nbsp;
      </ImageWrap>
    )}
    {getChildren(props)}
  </Facebook>
);
