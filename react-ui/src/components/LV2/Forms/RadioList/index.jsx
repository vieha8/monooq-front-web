import React, { Fragment } from 'react';
import styled from 'styled-components';
import Radio from 'components/LV1/Forms/Radio';
import { H3 } from 'components/LV1/Texts/Headline';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';

const Wrapper = styled.div`
  background-color: ${Colors.lightGray1Bg};
  padding: ${Dimens.medium}px ${Dimens.small2}px ${Dimens.small2}px ${Dimens.small2}px;
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

const ImageWrapper = styled.div``;

export default ({ labelTitle, labels, border, onClick, contents, captions, checkedIndex }) => (
  <Fragment>
    <H3 bold as="h3">
      {labelTitle}
    </H3>
    {labels.map((label, i) => (
      <Wrapper key={`radiolist_checkitem${i.toString()}`} border={border}>
        <Radio onClick={() => onClick(i)} checked={checkedIndex === i} border>
          {label}
          {captions && <ImageWrapper>{captions[i]}</ImageWrapper>}
        </Radio>
        {contents && i === checkedIndex && contents[i]}
      </Wrapper>
    ))}
  </Fragment>
);
