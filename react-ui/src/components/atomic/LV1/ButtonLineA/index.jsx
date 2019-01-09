// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import ReactGA from 'react-ga';

const imageUrl = 'https://scdn.line-apps.com/n/line_add_friends/btn/ja.png';
const imageAlt = '友だち追加';

const ButtonLineWrap = styled.a`
  :hover {
    img {
      opacity: 0.7;
    }
  }
`;

const ButtonLineImage = styled.img`
  display: block;
  height: ${Dimens.medium4}px;
  border: none;
`;

type PropTypes = {
  reactGACategory: string,
  reactGAAction: string,
  story?: boolean,
};

export default (props: PropTypes) => (
  <ButtonLineWrap
    href="https://line.me/R/ti/p/%40wna0649g"
    target="_blank"
    rel="noopener noreferrer"
  >
    {props.story ? (
      <ButtonLineImage src={imageUrl} alt="imageAlt" />
    ) : (
      <ButtonLineImage
        src={imageUrl}
        alt={imageAlt}
        onClick={() =>
          ReactGA.event({ category: '`props.reactGACategory`', action: '`props.reactGAAction`' })
        }
      />
    )}
  </ButtonLineWrap>
);
