// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Content = styled.div`
  margin: 0;
  ${media.tablet`
    margin: ${Dimens.small2}px 0;
  `};
`;

type PropTypes = {
  sections: React.Element<*>,
};

export default ({ sections }: PropTypes) => <Content>{sections}</Content>;
