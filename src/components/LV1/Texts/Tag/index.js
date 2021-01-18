import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import { mediaMin } from 'helpers/style/media-query';
import Link from 'next/link';
import Path from 'config/path';

const Tag = styled.div`
  position: relative;
  display: inline-flex;
  width: fit-content;
  padding: ${Dimens.small}px ${Dimens.xsmall}px;
  margin: 0px ${Dimens.small}px ${Dimens.small}px 0px;
  font-size: ${FontSizes.small}px;
  line-height: ${Dimens.small2}px;
  color: ${Colors.lightGray3};
  background-color: ${Colors.lightGray4};
  border-radius: ${Dimens.xxsmall_4}px;
  ${props =>
    !props.isNoLink &&
    `
    cursor: pointer;
    &:active {
      opacity: 0.8;
    }
    `};
  ${props =>
    props.isMarkDelete &&
    `
      padding-right: ${Dimens.medium1}px;
      &::before,
      &::after {
        display: block;
        content: '';
        position: absolute;
        top: calc(50% - ${Dimens.small}px);
        right: ${Dimens.small_10}px;
        width: ${Dimens.xxsmall_4}px;
        height: ${Dimens.medium}px;
        background: ${Colors.lightGray1};
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(135deg);
      }
    `};
  ${mediaMin.tablet`
    ${props =>
      !props.isNoLink &&
      `
      &:hover {
        opacity: 0.8;
      }
      `};
  `};
`;

export default ({ tagList, isNoMark, isMarkDelete, isNoLink, onClick }) => (
  <Fragment>
    {isNoLink
      ? tagList.map((tag, i) => (
          <Tag key={i.toString()} isMarkDelete={isMarkDelete} onClick={onClick} isNoLink>
            {!isNoMark && '#'}
            {tag}
          </Tag>
        ))
      : tagList.map((tag, i) => (
          <Link key={i.toString()} href={`${Path.search()}?tags=${tag}`}>
            <a>
              <Tag isMarkDelete={isMarkDelete}>
                {!isNoMark && '#'}
                {tag}
              </Tag>
            </a>
          </Link>
        ))}
  </Fragment>
);
