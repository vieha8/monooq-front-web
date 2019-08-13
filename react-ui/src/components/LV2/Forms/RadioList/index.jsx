// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Radio from 'components/LV1/Forms/Radio';
import { H3 } from 'components/LV1/Texts/Headline';
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
  ${props =>
    props.borderTop &&
    `
    border-top: 1px solid ${Colors.borderGray};
    padding-top: 16px;
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

const ImageWrapper = styled.div``;

type PropTypes = {
  labelTitle?: string,
  border?: boolean,
  borderTop?: boolean,
  labels: Array<string>,
  onClick: Function,
  contents?: Object,
  captions?: object,
  checkedIndex?: number,
};

export default ({
  labelTitle,
  labels,
  border,
  borderTop,
  onClick,
  contents,
  captions,
  checkedIndex,
}: PropTypes) => (
  <Fragment>
    <H3 bold>{labelTitle}</H3>
    {labels.map((label, i) => (
      <Wrapper key={`radiolist_checkitem${i.toString()}`} border={border} borderTop={borderTop}>
        <Radio onClick={() => onClick(i)} checked={checkedIndex === i} border>
          {label}
          {captions && <ImageWrapper>{captions[i]}</ImageWrapper>}
        </Radio>
        {contents && i === checkedIndex && contents[i]}
      </Wrapper>
    ))}
  </Fragment>
);
