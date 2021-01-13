import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';

const ImageCheckRed =
  'https://monooq.imgix.net/img%2Fservice%2Ficon-check-circle-red.svg?auto=compress';

const Wrap = styled.div`
  padding: ${Dimens.medium_20}px;
  font-size: ${FontSizes.small}px;
  line-height: normal;
  color: ${Colors.black};
  background-color: ${Colors.lightGray1Bg};
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: ${Dimens.medium_20}px;
`;

const List = styled.ul`
  text-align: left;
`;

const Item = styled.li`
  position: relative;
  padding-left: ${Dimens.medium2}px;
  ${props =>
    props.margin &&
    `
    margin: ${Dimens.small_10}px auto;
  `};
  &::before {
    position: absolute;
    content: '';
    top: calc(50% - ${Dimens.small_10}px);
    left: 0px;
    width: ${Dimens.medium_20}px;
    height: ${Dimens.medium_20}px;
    background-image: url(${ImageCheckRed});
    background-size: cover;
    background-position: top left;
    background-repeat: no-repeat;
  }
`;

export default () => (
  <Wrap>
    <Title>よくある確認事項</Title>
    <List>
      <Item>預けたい日程は決まっているか</Item>
      <Item margin>荷物の量はだいたい決まっているか</Item>
      <Item>荷物の出し入れは頻繁に行うか</Item>
    </List>
  </Wrap>
);
