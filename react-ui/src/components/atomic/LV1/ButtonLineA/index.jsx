// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import ReactGA from 'react-ga';
import Button from 'components/atomic/LV1/Button';

const imageUrl = 'https://scdn.line-apps.com/n/line_add_friends/btn/ja.png';

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
  <Fragment>
    {props.story ? (
      <ButtonLineImage src={imageUrl} alt="imageAlt" />
    ) : (
      <Button
        line
        center
        fill={1}
        link
        blank
        href="https://line.me/R/ti/p/%40wna0649g"
        onClick={() =>
          ReactGA.event({ category: props.reactGACategory, action: props.reactGAAction })
        }
      >
        友だち追加
      </Button>
    )}
  </Fragment>
);
