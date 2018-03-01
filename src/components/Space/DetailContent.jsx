import React from 'react';
import styled from 'styled-components';
import LocalShippingIcon from 'material-ui-icons/LocalShipping';
import PeopleIcon from 'material-ui-icons/People';
import { media } from 'helpers/style/media-query';
import { FontSizes, Colors, Dimens } from 'variables';

const Container = styled.div`
  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `}
`;

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

const ReceiveContainer = styled.div`
`;

const ReceiveIconWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const ReceiveText = Text.extend`
  display: inline-block;
  vertical-align: middle;
  margin-left: ${Dimens.small}px;
`;

const ReceiveSubText = SubText.extend`
  display: inline-block;
  vertical-align: middle;
  margin-top: 0;
  margin-left: ${Dimens.medium}px;
`;

const ReceiveSupplementText = Text.extend`
  line-height: 2;
`;

// 所在地
const Address = props => (
  <Container>
    <Text>{props.children}</Text>
    <SubText>詳細な住所はリクエスト完了後にホストより連絡があります。</SubText>
  </Container>
);

// 種類
const SpaceType = props => (
  <Container>
    <Text>{props.children}</Text>
  </Container>
);

// 預かることができる荷物
const BaggegeType = props => (
  <Container>
    {props.typeOK && <TypeOKText>家具・家電OK</TypeOKText>}
    <BaggetText typeOK={props.typeOK}>{props.text}</BaggetText>
  </Container>
);

// 受取り方法
const HowToReceive = props => (
  <Container>
    {props.delivery &&
      <ReceiveContainer>
        <ReceiveIconWrapper>
          <LocalShippingIcon />
        </ReceiveIconWrapper>
        <ReceiveText>配送</ReceiveText>
        <ReceiveSubText>Pickgo・ヤマト運輸など配送サービス</ReceiveSubText>
      </ReceiveContainer>
    }
    {props.meeting &&
      <ReceiveContainer>
        <ReceiveIconWrapper>
          <PeopleIcon />
        </ReceiveIconWrapper>
        <ReceiveText>対面</ReceiveText>
        <ReceiveSubText>直接本人から荷物を受け取ります</ReceiveSubText>
      </ReceiveContainer>
    }
  </Container>
);

// 受取りについて補足
const ReceiveSupplement = props => (
  <Container>
    <ReceiveSupplementText>{props.text}</ReceiveSupplementText>
  </Container>
);

export default {
  Address,
  SpaceType,
  BaggegeType,
  HowToReceive,
  ReceiveSupplement,
};
