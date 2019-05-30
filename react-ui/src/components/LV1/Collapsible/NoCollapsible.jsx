// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';
import { Link } from 'react-router-dom';
import Path from 'config/path';

const NoCollapsibleeWrap = styled.div`
  margin-bottom: ${Dimens.medium4_50}px;
  ${media.phone`
    margin-bottom: ${Dimens.medium2_35}px;
  `};
`;

const CaptionWrap = styled.div`
  width: 100%;
  word-break: keep-all;
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  line-height: ${Dimens.medium2_36}px;
  margin: 0 auto ${Dimens.small_10}px;
  ${media.phone`
    word-break: unset;
  `};
`;

const ListWrap = styled.div``;

const LinkStyled = styled(Link)`
  color: ${Colors.black};
  &:first-child p {
    border-radius: ${Dimens.xxsmall_4}px ${Dimens.xxsmall_4}px 0px 0px;
  }
  &:last-child p {
    border-radius: 0px 0px ${Dimens.xxsmall_4}px ${Dimens.xxsmall_4}px;
  }
  &:not(:last-child) p {
    border-bottom: none;
  }
`;

const Item = styled.p`
  position: relative;
  padding: ${Dimens.small_10}px ${Dimens.medium2}px;
  border: 1px solid #dbdbdb;
  font-size: ${FontSizes.small_15}px;
  font-weight: bold;
  line-height: normal;
  ${media.phone`
    padding: ${Dimens.small_10}px ${Dimens.medium}px;
  `};
`;

const Count = styled.span`
  position: absolute;
  right: ${Dimens.medium2}px;
  top: ${Dimens.small2_13}px;
  font-size: ${FontSizes.small_12}px;
  font-weight: normal;
  ${media.phone`
    right: ${Dimens.medium}px;
  `};
`;

type PropTypes = {
  title: string,
  contents: Object,
};

export default ({ title, contents }: PropTypes) => (
  <NoCollapsibleeWrap>
    <CaptionWrap>{title}</CaptionWrap>
    <ListWrap>
      {contents.map(({ Prefectures: prefectures }, i) => (
        <Fragment key={`section_area_contents_${contents[i].ID}`}>
          {prefectures.map(({ ID: id, Name: name, Spaces: spaces }) => {
            if (spaces.length === 0) {
              return null;
            }
            return (
              <LinkStyled to={Path.homePrefecture(id)} key={`section_area_prefecture_${id}`}>
                <Item>
                  {name}
                  <Count>{`${spaces.length}件`}</Count>
                </Item>
              </LinkStyled>
            );
          })}
        </Fragment>
      ))}
    </ListWrap>
  </NoCollapsibleeWrap>
);
