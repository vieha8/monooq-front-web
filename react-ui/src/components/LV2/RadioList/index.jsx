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
  labelTitle?: string,
  border?: boolean,
  labels: Array<string>,
  onClick: Function,
  checkedIndex: number,
};

export default ({ labelTitle, labels, border, onClick, checkedIndex }: PropTypes) => (
  <Fragment>
    <H3 bold>{labelTitle}</H3>
    {labels.map((label, i) => (
      <Wrapper key={`radiolist_checkitem${i.toString()}`} border={border}>
        <Radio onClick={() => onClick(i)} checked={checkedIndex === i} border>
          {label}
        </Radio>
      </Wrapper>
    ))}
  </Fragment>
);
