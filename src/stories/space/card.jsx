import React from 'react';
import styled, { css } from 'styled-components';
import { Card } from 'semantic-ui-react';
import { media } from '../../helpers/style/media-query';
import { Colors, Dimens } from '../../variables';

const CardContent = styled.div`
  padding: ${Dimens.medium2}px;
  ${media.phone`
    padding: 0;
    ${props => css`${props.customStyle}`}
    background: ${Colors.white};
  `}
  ${props => css`${props.customStyle}`}
`;

export default props => (
  <Card fluid>
    <CardContent customStyle={props.customStyle}>
      {props.children}
    </CardContent>
  </Card>
);
