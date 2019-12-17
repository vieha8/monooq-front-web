import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import { mediaMin } from 'helpers/style/media-query';
import { Link } from 'react-router-dom';
import Path from 'config/path';

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

export default ({ tagList, isNoMark, isMarkDelete, isNoLink, onClick }) => (
  <Fragment>
    {isNoLink
      ? tagList.map((tag, i) => (
          <Tag key={i.toString()} isMarkDelete={isMarkDelete} onClick={onClick}>
            {!isNoMark && '#'}
            {tag}
          </Tag>
        ))
      : tagList.map((tag, i) => (
          <Link key={i.toString()} to={`${Path.search()}?tags=${tag}`}>
            <Tag isMarkDelete={isMarkDelete}>
              {!isNoMark && '#'}
              {tag}
            </Tag>
          </Link>
        ))}
  </Fragment>
);
