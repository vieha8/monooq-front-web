import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';

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
`;

const getComponent = (isFull, isConsultation) => {
  let returnVal = <Availability bgColor={Colors.green}>空室</Availability>;
  if (isFull) {
    returnVal = <Availability bgColor={Colors.brandPrimary}>満室</Availability>;
  } else if (isConsultation) {
    returnVal = <Availability bgColor={Colors.lightGray3}>要相談</Availability>;
  }
  return returnVal;
};

export default ({ isFull, isConsultation }) => (
  <Fragment>{getComponent(isFull, isConsultation)}</Fragment>
);
