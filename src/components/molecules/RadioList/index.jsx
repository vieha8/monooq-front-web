// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Radio from 'components/atoms/Radio';

const Wrapper = styled.div`
  &:not(:first-child) {
    margin-top: 16px;
  }
`;

type PropTypes = {
  labels: Array<string>,
  checkedIndex: number,
  onClick: Function,
}

export default (props: PropTypes) => (
  <Fragment>
    {props.labels.map((label, i) => (
      <Wrapper key={`checklist_checkitem${i}`}>
        <Radio onClick={() => props.onClick(i)} checked={props.checkedIndex === i}>{label}</Radio>
      </Wrapper>
    ))}
  </Fragment>
);
