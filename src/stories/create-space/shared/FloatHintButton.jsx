import React from 'react';
import styled from 'styled-components';
import Icon from '../../shared/Icon';
import { Colors, Dimens, ZIndexes } from '../../../variables';
import { media } from '../../../helpers/style/media-query';

const BUTTON_SIZE = 64;

const Container = styled.div`
  display: none;
  position: fixed;
  right: ${Dimens.medium2}px;
  bottom: 100px;
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
  border-radius: ${BUTTON_SIZE / 2}px;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.4);
  background-color: ${Colors.white};
  transition: 500ms;
  &:hover {
    transition: 500ms;
    background-color: ${Colors.lightGray};
  }
  z-index: ${ZIndexes.float};
  ${media.phone`
    display: block;
  `}
`;

export default () => (
  <Container>
    <Icon name="lightbulb" size={64} fontSize={32} />
  </Container>
);
