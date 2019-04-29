// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Content = styled.div`
  margin: 0;
  ${media.tablet`
    margin: ${Dimens.small2}px 0;
    ${props =>
      props.margin &&
      `
        margin: ${props.margin};
      `};
  `};
`;

type PropTypes = {
  sections: React.Element<*>,
  margin?: string,
};

export default ({ margin, sections }: PropTypes) => <Content margin={margin}>{sections}</Content>;
