// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors, FontSizes } from 'variables';
import Button from 'components/LV1/Forms/Button';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: ${Dimens.large}px auto;
  ${media.phone`
    margin: ${Dimens.medium2_36}px ${Dimens.xxsmall_4}px;
  `};
`;

const WrapInner = styled.div`
  margin: auto ${Dimens.medium}px;
  ${media.tablet`
    margin: auto;
  `};
`;

const WrapList = styled.ul`
  width: 100%;
  display: flex;
  padding: ${Dimens.medium3_40}px;
  background-color: white;
  box-shadow: 0px 0px ${Dimens.small2}px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  ${media.tablet`
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    box-shadow: none;
    padding: 0px;
  `};
`;

const WrapItem = styled.li`
  width: 100%;
  display: inline-block;
  &:not(:first-child) {
    margin-left: ${Dimens.small2}px;
  }
  ${media.tablet`
    width: auto;
    &:not(:first-child) {
      margin-left: -${Dimens.small2}px;
    }
  `};
`;

const Caption = styled.div`
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  line-height: ${Dimens.medium1}px;
  color: ${Colors.black2};
  margin-bottom: ${Dimens.medium2_32}px;
  ${media.tablet`
    margin: auto 12px ${Dimens.small}px;
  `};
  ${media.phone`
    font-size: ${FontSizes.medium_18}px;
    margin-bottom: ${Dimens.small_10}px;
  `};
`;

const Wrap = styled.ul`
  width: 100%;
  max-width: 124px;
  &:not(:first-child) {
    margin-left: ${Dimens.small2}px;
  }
  ${media.tablet`
    width: 252px;
    max-width: 100%;
    height: 241px;
    padding: 20px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0px 0px ${Dimens.small2}px rgba(0, 0, 0, 0.1);
    margin: ${Dimens.small2}px ${Dimens.small2}px ${Dimens.medium_20}px;
  `};
`;

const WrapButton = styled.li`
  margin-top: ${Dimens.xxsmall_4}px;
  ${media.tablet`
    float: left;
    width: calc(50% - 2px);
    &:nth-child(2n) {
      margin-right: ${Dimens.xxsmall_4}px;
    }
  `};
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
    <WrapInner>
      <Caption>都道府県別でスペースを探す</Caption>
      <WrapList>
        {list.map((item, i) => (
          <WrapItem>
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
          </WrapItem>
        ))}
      </WrapList>
    </WrapInner>
  </Wrapper>
);
