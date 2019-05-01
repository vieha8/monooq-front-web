// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Collapsible from 'react-collapsible';
import { Dimens, FontSizes } from 'variables';
import { Link } from 'react-router-dom';
import Path from 'config/path';

const CollapsibleWrap = styled.div`
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

const Item = styled.p`
  color: black;
`;

// const Count = styled.span`
//   position: absolute;
//   right: ${Dimens.medium}px;
//   top: ${Dimens.small2_13}px;
//   font-size: ${FontSizes.small_12}px;
//   font-weight: normal;
// `;

type PropTypes = {
  title: string,
  contents: Object,
  isOpen: boolean,
};

export default ({ title, contents, isOpen }: PropTypes) => (
  <CollapsibleWrap>
    <CaptionWrap>{title}</CaptionWrap>
    {contents.map(({ ID: id, Name: name, Prefectures: prefectures }) => {
      return (
        <Collapsible key={`section_area_${id}`} trigger={name} open={isOpen}>
          {prefectures.map(
            ({ ID: prefectureId, Name: prefectureName, PrefectureSpaces: prefectureSpaces }) => {
              if (prefectureSpaces.length === 0) {
                return null;
              }
              return (
                <Link
                  to={Path.homePrefecture(prefectureId)}
                  key={`section_area_prefecture_${prefectureId}`}
                >
                  <Item>
                    {prefectureName}
                    {/*<Count>{`${prefectureSpaces.length}件`}</Count>*/}
                  </Item>
                </Link>
              );
            },
          )}
        </Collapsible>
      );
    })}
  </CollapsibleWrap>
);
