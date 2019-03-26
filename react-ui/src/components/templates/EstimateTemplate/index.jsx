// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import ClearfixContainer from 'components/LV1/ClearfixContainer';
import Page from '../Page';

const LeftContent = styled.div`
  float: left;
  width: 60%;
  ${media.tablet`
    float: none;
    width: 100%;
  `};
`;

const RightContent = styled.div`
  float: left;
  margin-left: 32px;
  width: 30%;
  margin-top: 80px;
  ${media.tablet`
    float: none;
    display: none;
  `};
`;

type PropTypes = {
  header: React.Element<*>,
  form: React.Element<*>,
  hint: React.Element<*>,
};

export default (props: PropTypes) => (
  <div>
    {props.header}
    <Page>
      <ClearfixContainer>
        <LeftContent>{props.form}</LeftContent>
        <RightContent>{props.hint}</RightContent>
      </ClearfixContainer>
    </Page>
  </div>
);
