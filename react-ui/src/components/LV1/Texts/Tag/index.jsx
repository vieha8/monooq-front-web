import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';

const Tag = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: ${Dimens.small}px ${Dimens.xsmall}px;
  margin: 0px ${Dimens.xxsmall_4}px ${Dimens.xxsmall_4}px 0px;
  font-size: ${FontSizes.small}px;
  line-height: ${Dimens.small2}px;
  color: ${Colors.lightGray3};
  background-color: ${Colors.lightGray4};
  border-radius: ${Dimens.xxsmall_4}px;
`;

export default ({ tagList, isNoMark }) => (
  <Fragment>
    {tagList &&
      tagList.map((tag, i) => (
        <Tag key={i.toString()}>
          {!isNoMark && '#'}
          {tag}
        </Tag>
      ))}
  </Fragment>
);
