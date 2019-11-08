import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  display: inline-block;
  cursor: pointer;
  width: 100%;
`;

const RADIO_SIZE = 27;
const RADIO_CHECK_SIZE = 15;
const Radio = styled.div`
  display: inline-block;
  position: relative;
  width: ${RADIO_SIZE}px;
  height: ${RADIO_SIZE}px;
  background: ${Colors.white};
  border: 2px solid ${Colors.brandPrimary};
  border-radius: 15px;
  ${props =>
    props.checked &&
    `
    &:after {
      content: "";
      display: block;
      margin-top: ${(RADIO_SIZE - RADIO_CHECK_SIZE) / 2 - 2}px;
      margin-left: ${(RADIO_SIZE - RADIO_CHECK_SIZE) / 2 - 2}px;
      width: ${RADIO_CHECK_SIZE}px;
      height: ${RADIO_CHECK_SIZE}px;
      border-radius: ${RADIO_CHECK_SIZE / 2}px;
      background: ${Colors.brandPrimary};
    }
  `};
`;

const Label = styled.div`
  width: calc(100% - 42px);
  display: inline-block;
  font-size: ${FontSizes.small_15}px;
  color: ${Colors.black};
  margin-left: 15px;
  vertical-align: top;
  line-height: ${RADIO_SIZE}px;
  ${media.phone`
    ${props =>
      props.border &&
      `
      width: calc(100% - 37px);
      margin-left: 10px;
    `};
  `};
`;

export default ({ onClick, checked, border, children }) => (
  <Container onClick={onClick}>
    <Radio checked={checked} />
    <Label border={border}>{children}</Label>
  </Container>
);
