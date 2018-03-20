// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Check from 'components/atomic/atoms/Check';

const CheckWrapper = styled.div`
  &:not(:first-child) {
    margin-top: 16px;
  }
`;

type PropTypes = {
  labels: Array<string>,
  checkedIndexes: Object,
  onClick: Function,
}

export default (props: PropTypes) => (
  <Fragment>
    {props.labels.map((label, i) => (
      <CheckWrapper key={`checklist_checkitem${i}`}>
        <Check onClick={() => props.onClick(i)} checked={props.checkedIndexes[`${i}`]}>{label}</Check>
      </CheckWrapper>
    ))}
  </Fragment>
);
