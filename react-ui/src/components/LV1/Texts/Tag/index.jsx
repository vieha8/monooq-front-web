import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import { mediaMin } from 'helpers/style/media-query';

const Tag = styled.div`
  position: relative;
  display: inline-flex;
  width: fit-content;
  padding: ${Dimens.small}px ${Dimens.xsmall}px;
  margin: 0px ${Dimens.xxsmall_4}px ${Dimens.xxsmall_4}px 0px;
  font-size: ${FontSizes.small}px;
  line-height: ${Dimens.small2}px;
  color: ${Colors.lightGray3};
  background-color: ${Colors.lightGray4};
  border-radius: ${Dimens.xxsmall_4}px;
  cursor: pointer;
  &:active {
    opacity: 0.8;
  }
  ${props =>
    props.isMarkDelete &&
    `
      padding-right: ${Dimens.medium1}px;
      &::after {
        content: '×';
        position: absolute;
        display: inline;
        right: ${Dimens.xsmall}px;
        font-size: ${FontSizes.medium2}px;
        font-weight: bold;
      }
    `};
  ${mediaMin.tablet`
    &:hover {
      opacity: 0.8;
    }
  `};
`;

export default ({ tagList, onClick, isNoMark, isMarkDelete }) => (
  <Fragment>
    {tagList &&
      tagList.map((tag, i) => (
        <Tag key={i.toString()} onClick={onClick} isMarkDelete={isMarkDelete}>
          {!isNoMark && '#'}
          {tag}
        </Tag>
      ))}
  </Fragment>
);
