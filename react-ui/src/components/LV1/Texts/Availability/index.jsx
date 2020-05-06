import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';

const STATUS_FULL = 'full';
const STATUS_CONSULTATION = 'consultation';
const STATUS_DRAFT = 'draft';

const Availability = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: ${Dimens.small}px;
  font-size: ${FontSizes.small}px;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: normal;
  color: ${Colors.white};
  background-color: ${props => (props.bgColor ? props.bgColor : Colors.green)};
  border-radius: 2px;
  ${media.phone`
    padding: ${Dimens.xxsmall_4}px ${Dimens.small}px;
  `}
`;

const getComponent = status => {
  let returnVal = <Availability bgColor={Colors.green}>空室</Availability>;
  if (status === STATUS_FULL) {
    returnVal = <Availability bgColor={Colors.brandPrimary}>満室</Availability>;
  } else if (status === STATUS_CONSULTATION) {
    returnVal = <Availability bgColor={Colors.lightGray3}>要相談</Availability>;
  } else if (status === STATUS_DRAFT) {
    returnVal = <Availability bgColor={Colors.lightGray3}>下書き</Availability>;
  }
  return returnVal;
};

export default ({ status }) => <Fragment>{getComponent(status)}</Fragment>;
