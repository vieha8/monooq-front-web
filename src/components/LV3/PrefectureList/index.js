import React, { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { media, mediaMin } from 'helpers/style/media-query';
import { Dimens, Colors, FontSizes } from 'variables';
import Button from 'components/LV1/Forms/Button';
import Path from '../../../config/path';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: ${Dimens.large}px auto ${Dimens.medium3_44}px;
  ${media.phone`
    margin: ${Dimens.medium2_36}px auto;
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
  box-shadow: none;
  border-radius: 8px;
  display: block;
  overflow-x: scroll;
  white-space: nowrap;
  padding: ${Dimens.medium}px 0px;
  ::-webkit-scrollbar-track {
    background-color: ${Colors.lightGray7};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${Colors.lightGray6};
  }
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  ${media.tablet`
    padding: ${Dimens.medium}px ${Dimens.small}px;
  `};
`;

const WrapItem = styled.li`
  width: 100%;
  display: inline-block;
  scroll-snap-align: center;
  &:not(:first-child) {
    margin-left: ${Dimens.small2}px;
  }
  width: auto;
  &:not(:first-child) {
    margin-left: -${Dimens.small2}px;
  }
  ${media.phone`
    :first-child {
      margin-left: ${Dimens.large}px;
    }
    :last-child {
      margin-right: ${Dimens.large}px;
    }
  `};
`;

const Caption = styled.div`
  font-size: ${FontSizes.medium2}px;
  font-weight: bold;
  line-height: ${Dimens.medium1}px;
  color: ${Colors.black2};
  ${media.tablet`
    margin: auto ${Dimens.medium}px 0;
  `};
`;

const Wrap = styled.ul`
  width: 100%;
  max-width: 124px;
  &:not(:first-child) {
    margin-left: ${Dimens.small2}px;
  }
  width: 252px;
  max-width: 100%;
  height: 241px;
  padding: 20px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0px 0px ${Dimens.small2}px rgba(0, 0, 0, 0.1);
  margin: ${Dimens.small2}px ${Dimens.small2}px ${Dimens.medium_20}px;
  transition: 0.2s;
  &:active {
    transition: 0.2s;
    transform: scale(1.1);
    margin: ${Dimens.small2}px ${Dimens.medium1_25}px ${Dimens.medium_20}px;
  }
  ${mediaMin.tablet`
    &:hover {
      transition: 0.2s;
      transform: scale(1.1);
      margin: ${Dimens.small2}px ${Dimens.medium1_25}px ${Dimens.medium_20}px;
    }
  `};
`;

const WrapButton = styled.li`
  margin-top: ${Dimens.xxsmall_4}px;
  float: left;
  width: calc(50% - 2px);
  &:nth-child(2n) {
    margin-right: ${Dimens.xxsmall_4}px;
  }
`;

const WrapRegion = styled.div`
  margin-bottom: ${Dimens.small2_14}px;
  font-size: ${FontSizes.small}px;
  text-align: center;
  color: ${Colors.lightGray3};
`;

const PrefectureList = ({ list, regionId }) => {
  useEffect(() => {
    const targetId = `space_search_area_${regionId}`;
    if (document.getElementById(targetId)) {
      const target = document.getElementById(targetId);
      target.scrollIntoView({
        inline: 'center',
        behavior: 'smooth',
        block: 'end',
      });
    }
    window.scrollTo(0, 0);
  }, [regionId]);

  return (
    <Wrapper>
      <WrapInner>
        <Caption>都道府県別でスペースを探す</Caption>
        <WrapList>
          {list.map((item, i) => (
            <WrapItem key={i.toString()} id={`space_search_area_${(i + 1).toString()}`}>
              <Wrap>
                <WrapRegion>{item.region}</WrapRegion>
                {item.prefectureList.map((prefecture, j) => (
                  <WrapButton key={j.toString()}>
                    <Link href={`${Path.spacesByPrefecture(prefecture.id)}?via=carousel`}>
                      <a>
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
                        >
                          {prefecture.name}
                        </Button>
                      </a>
                    </Link>
                  </WrapButton>
                ))}
              </Wrap>
            </WrapItem>
          ))}
          <li>
            <div id="prefecture-list-last" />
          </li>
        </WrapList>
      </WrapInner>
    </Wrapper>
  );
};

export default PrefectureList;
