import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

export const CustomButton = styled(Button)`
  max-width: ${props => props.maxWidth}px;
  color: ${props => props.fontColor || Colors.white} !important;
  background: ${props => props.bgColor || Colors.pink} !important;
  font-size: ${props => props.fontSize || Colors.white}px !important;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')} !important;
`;

export default props => (
  <CustomButton
    {...props}
  >
    {props.children}
  </CustomButton>
);
