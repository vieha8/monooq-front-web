import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { mediaMin } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';
import Button from 'components/LV1/Forms/Button';

const Wrap = styled.div``;

const Caption = styled.div`
  font-size: ${FontSizes.small}px;
  font-weight: bold;
  line-height: normal;
`;

const AreaPinList = styled.ul`
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  padding: ${Dimens.small2}px ${Dimens.xxsmall}px ${Dimens.small2_15}px;
  ::-webkit-scrollbar-track {
    background-color: ${Colors.lightGray7};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${Colors.lightGray6};
  }
`;

const Item = styled.li`
  width: fit-content;
  position: relative;
  display: inline-block;
  font-size: ${FontSizes.small}px;
  line-height: normal;
  color: ${Colors.black2};
  &:not(:first-child) {
    margin-left: ${Dimens.small_11}px;
  }
`;

const LinkStyled = styled(Link)`
  line-height: ${Dimens.medium_20}px;
  color: ${Colors.lightGray3};
  &:active {
    color: ${Colors.lightGray3};
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      color: ${Colors.lightGray3};
      opacity: 0.8;
    }
  `};
`;

export default ({ areaPinList }) => (
  <Wrap>
    <Caption>人気エリアで探す</Caption>
    <AreaPinList>
      {areaPinList.map((item, i) => (
        <Item key={i.toString()}>
          <LinkStyled
            href={item.link}
            color={Colors.lightGray3}
            rel={item.count < 5 ? 'nofollow' : ''}
          >
            <a>
              <Button areaPin>{item.name}</Button>
            </a>
          </LinkStyled>
        </Item>
      ))}
    </AreaPinList>
  </Wrap>
);
