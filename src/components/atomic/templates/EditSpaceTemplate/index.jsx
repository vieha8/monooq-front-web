// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import ClearfixContainer from 'components/atomic/atoms/ClearfixContainer';
import Page from '../Page';

const LeftContent = styled.div`
  float: left;
  width: 60%;
  ${media.tablet`
    float: none;
    margin-left: 0;
    width: 100%;
  `};
`;

const RightContent = styled.div`
  float: left;
  margin-top: 100px;
  margin-left: 32px;
  width: 30%;
  ${media.tablet`
    display: none;
    float: none;
  `};
`;

type PropTypes = {
  header: React.Element<*>,
  leftContent: React.Element<*>,
  rightContent: React.Element<*>,
};

export default (props: PropTypes) => (
  <div>
    {props.header}
    <Page>
      <ClearfixContainer>
        <LeftContent>{props.leftContent}</LeftContent>
        <RightContent>{props.rightContent}</RightContent>
      </ClearfixContainer>
    </Page>
  </div>
);
