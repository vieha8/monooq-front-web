// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Radio from 'components/LV1/Radio';
import { H3 } from 'components/LV1/Headline';
import { Colors } from 'variables';
import { media } from 'helpers/style/media-query';

const Wrapper = styled.div`
  ${props =>
    props.border &&
    `
    border: 1px solid ${Colors.borderGray};
    padding: 15px;
    border-radius: 5px;
  `};
  ${media.phone`
    ${props =>
      props.border &&
      `
      padding: 10px;
    `};
  `};
  &:not(:first-child) {
    margin-top: 16px;
  }
`;

type PropTypes = {
  labels: Array<string>,
  checkedIndex: number,
  onClick: Function,
};

export default (props: PropTypes) => (
  <Fragment>
    <H3 bold>{props.label}</H3>
    {props.labels.map((label, i) => (
      <Wrapper key={`checklist_checkitem${i}`} border={props.border}>
        <Radio onClick={() => props.onClick(i)} checked={props.checkedIndex === i} border>
          {label}
        </Radio>
      </Wrapper>
    ))}
  </Fragment>
);
