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
`;

const Item = styled.p`
  position: relative;
  padding: ${Dimens.small_10}px ${Dimens.medium2}px;
  border: 1px solid #dbdbdb;
  font-size: ${FontSizes.small_15}px;
  font-weight: bold;
  line-height: normal;
  &:first-child {
    border-radius: ${Dimens.xxsmall_4}px ${Dimens.xxsmall_4}px 0px 0px;
  }
  &:last-child {
    border-radius: 0px 0px ${Dimens.xxsmall_4}px ${Dimens.xxsmall_4}px;
  }
  &:not(:last-child) {
    border-bottom: none;
  }
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
      {contents.map(({ Prefectures: prefectures }) => {
        return (
          <Fragment>
            {prefectures.map(
              ({ ID: prefectureId, Name: prefectureName, PrefectureSpaces: prefectureSpaces }) => {
                if (prefectureSpaces.length === 0) {
                  return null;
                }
                return (
                  <Item>
                    <LinkStyled
                      to={Path.homePrefecture(prefectureId)}
                      key={`section_area_prefecture_${prefectureId}`}
                    >
                      {prefectureName}
                      <Count>{`${prefectureSpaces.length}件`}</Count>
                    </LinkStyled>
                  </Item>
                );
              },
            )}
          </Fragment>
        );
      })}
    </ListWrap>
  </NoCollapsibleeWrap>
);
