import React from 'react';
import styled, { css } from 'styled-components';
import { Card } from 'semantic-ui-react';
import { media, isMobileWindow } from 'helpers/style/media-query';
import { Colors, Dimens } from 'variables';

const MobileContainer = styled.div`
  padding: 0 ${Dimens.medium}px;
  background: ${Colors.white};
`;

const CardContent = styled.div`
  padding: ${Dimens.medium2}px;
  ${media.phone`
    padding: 0;
    ${props => css`${props.customStyle}`}
    background: ${Colors.white};
  `}
  ${props => css`${props.customStyle}`}
`;

export default (props) => {
  const Container = isMobileWindow() ? MobileContainer : Card;
  return (
    <Container fluid>
      <CardContent customStyle={props.customStyle}>
        {props.children}
      </CardContent>
    </Container>
  );
};
