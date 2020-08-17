import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Collapsible from 'react-collapsible';
import SectionTitle from './SectionTitle';

const Wrap = styled.div`
  position: relative;
  background-color: ${Colors.brandQuaternary};
  padding: ${Dimens.medium2}px;
  text-align: center;
  &::before {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
  }
  &::before {
    top: 0px;
    border-color: ${Colors.white} transparent transparent transparent;
  }
  ${media.tablet`
    padding: ${Dimens.medium2}px ${Dimens.medium}px;
  `};
`;

const List = styled.div`
  text-align: center;
`;

const Row = styled.div`
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const Item = styled.div`
  width: 100%;
  max-width: 600px;
  margin: ${Dimens.small2}px auto 0px;
`;

const Answer = styled.div`
  padding: ${Dimens.small_10}px ${Dimens.medium1}px;
  text-align: left;
  ${media.phone`
    padding: ${Dimens.small_10}px ${Dimens.medium}px;
  `}
`;

export default () => (
  <Wrap>
    <SectionTitle text="よくある質問" />
    <List>
      <Row>
        <Item>
          <Collapsible trigger="Q. 対応地域はどこでしょうか？">
            <Answer>47都道府県で対応しています。</Answer>
          </Collapsible>
        </Item>
        <Item>
          <Collapsible trigger="Q. 支払い方法は何に対応していますか？">
            <Answer>クレジットカード・コンビニ払い(Pay-easy)に対応しています。</Answer>
          </Collapsible>
        </Item>
      </Row>
      <Row>
        <Item>
          <Collapsible trigger="Q. 最短の契約期間は何日からでしょうか？">
            <Answer>
              基本的には最短1ヶ月となります。ただし、ホスト側と相談して期間を短く1ヶ月より短くすることも可能です。
            </Answer>
          </Collapsible>
        </Item>
        <Item>
          <Collapsible trigger="Q. 預ける荷物の配送はどうしたら良いでしょうか？">
            <Answer>
              配送方法は以下の3つが可能です。用途に合う方法で配送を行ってください。
              <br />
              1.ヤマト運輸などの一般的な配送サービス
              <br />
              2.直接運ぶ
              <br />
              3.モノオクからお得な料金で
              <a
                href="https://www.hacobell.com/register?tenant_code=monooq"
                target="_blank"
                rel="noopener noreferrer"
                className="gaHacobelLp123Guest"
              >
                配送手配
              </a>
            </Answer>
          </Collapsible>
        </Item>
      </Row>
      <Row>
        <Item>
          <Collapsible trigger="Q. 荷物を預ける場所を内覧することはできますか？">
            <Answer>
              スペースを提供するホストとご相談いただくことで可能です。
              <br />
              預けたい荷物や期間などをお伝えした上でご相談ください。
            </Answer>
          </Collapsible>
        </Item>
        <Item>
          <Collapsible trigger="Q. 荷物の一部引き出しや整理をすることはできますか？">
            <Answer>
              こちらもスペースを提供するホストとご相談いただくことで可能です。
              <br />
              頻度や日時などをホストにご相談ください。
            </Answer>
          </Collapsible>
        </Item>
        <Item>
          <Collapsible trigger="Q. モノオクの荷物保険とは何ですか？">
            <Answer>
              モノオクでは、あなたの荷物をお守りするために保証制度をご用意しています。
              <br />
              万が一、破損・紛失・盗難などが起きてしまった場合には、最大10万円までの補償を提供しています。
            </Answer>
          </Collapsible>
        </Item>
      </Row>
    </List>
  </Wrap>
);
