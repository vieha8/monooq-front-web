// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors, FontSizes } from 'variables';
import Button from 'components/LV1/Forms/Button';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1156px;
  margin: ${Dimens.large}px auto;
  ${media.phone`
    margin: ${Dimens.medium1}px ${Dimens.medium}px;
  `};
`;

const WrapList = styled.div`
  width: 100%;
  display: flex;
  padding: ${Dimens.medium3_40}px;
  background-color: white;
  box-shadow: 0px 0px ${Dimens.small2}px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Caption = styled.div`
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  line-height: ${Dimens.medium1}px;
  color: ${Colors.black2};
  margin-bottom: ${Dimens.medium2_32}px;
  ${media.phone`
    font-size: ${FontSizes.medium_18}px;
    margin-bottom: ${Dimens.medium_20}px;
  `};
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 124px;
  margin-bottom: ${Dimens.medium_20}px;
  &:not(:first-child) {
    margin-left: ${Dimens.small2}px;
  }
  ${media.phone`
    width: 100%;
  `};
`;

const WrapButton = styled.div`
  margin-top: ${Dimens.xxsmall_4}px;
`;

const WrapRegion = styled.div`
  margin-bottom: ${Dimens.small2_14}px;
  font-size: ${FontSizes.small}px;
  text-align: center;
  color: ${Colors.lightGray3};
`;

type PropTypes = {
  list: Array<{
    region: string,
    prefectureList: Array<string>,
  }>,
};

export default ({ list }: PropTypes) => (
  <Wrapper>
    <Caption>都道府県別でスペースを探す</Caption>
    <WrapList>
      {list.map((item, i) => (
        <Wrap key={i.toString()}>
          <WrapRegion>{item.region}</WrapRegion>
          {item.prefectureList.map((prefecture, j) => (
            <WrapButton>
              <Button
                key={j.toString()}
                quinary
                fontSize={14}
                fontbold
                lineheight={21}
                height={38}
                padding="8px 10"
                borderRadius={6}
                fill={1}
                onClick={prefecture.link}
                // onKeyDown={onKeyDown}
              >
                {prefecture.name}
              </Button>
            </WrapButton>
          ))}
        </Wrap>
      ))}
    </WrapList>
  </Wrapper>
);
