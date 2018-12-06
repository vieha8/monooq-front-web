// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ClearfixContainer from 'components/atomic/LV1/ClearfixContainer';
import Page from '../Page';

const LeftContent = styled.div`
  float: left;
  width: 60%;
  vertical-align: top;
  ${media.tablet`
    float: none;
    width: 100%;
  `};
`;

const RightContent = styled.div`
  float: left;
  width: 30%;
  margin-left: ${Dimens.large}px;
  ${media.tablet`
    float: none;
    display: none;
  `};
`;

type PropTypes = {
  header: React.Element<*>,
  left: React.Element<*>,
  right: React.Element<*>,
};

export default (props: PropTypes) => (
  <div>
    {props.header}
    <Page>
      <ClearfixContainer>
        <LeftContent>{props.left}</LeftContent>
        <RightContent>{props.right}</RightContent>
      </ClearfixContainer>
    </Page>
  </div>
);
