import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens } from '../../variables';

const Text = styled.span`
  display: block;
  color: ${Colors.black};
  font-size: ${FontSizes.medium}px;
`;

const SubText = styled.span`
  display: block;
  color: ${Colors.gray};
  font-size: ${FontSizes.xsmall}px;
  margin-top: ${Dimens.xsmall}px;
`;

const TypeOKText = styled.span`
  display: inline-block;
  font-size: ${FontSizes.small}px;
  color: ${Colors.pink};
  font-weight: bold;
`;

const BaggetText = Text.extend`
  line-height: 2;
  margin-top: ${props => (props.typeOK ? Dimens.xsmall : 0)}px;
`;

// 所在地
const Address = props => (
  <div>
    <Text>{props.children}</Text>
    <SubText>詳細な住所はリクエスト完了後にホストより連絡があります。</SubText>
  </div>
);

// 種類
const SpaceType = props => (
  <div>
    <Text>{props.children}</Text>
  </div>
);

// 預かることができる荷物
const BaggegeType = props => (
  <div>
    {props.typeOK && <TypeOKText>家具・家電OK</TypeOKText>}
    <BaggetText typeOK={props.typeOK}>{props.comment}</BaggetText>
  </div>
);

export default {
  Address,
  SpaceType,
  BaggegeType,
  HowToReceive: '',
  ReceiveSupplement: '',
};
