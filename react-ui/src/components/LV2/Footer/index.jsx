// @flow

import React from 'react';
import styled from 'styled-components';
import Hr from 'components/LV1/HorizontalRule';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';
import ListItem from './ListItem';
import CompanyInfo from './CompanyInfo';

const Container = styled.footer`
  display: flex;
  width: 100%;
  background-color: ${Colors.black4};
  border-top: 1px solid ${Colors.borderGray};
  padding: 0px ${Dimens.medium2}px;
  margin-top: 65px;
`;

const Wrap = styled.div`
  display: flex;
  width: 100%;
  max-width: 1156px;
  margin: auto;
  padding: 48px 0px;
  ${media.tablet`
    flex-wrap: wrap;
  `};
`;

const WrapItems = styled.div`
  width: ${props => (props.company ? 20 : 33)}%;
  &:not(:first-child) {
    margin-left: ${Dimens.medium4_50}px;
  }
  ${media.tablet`
    width: 100%;
    &:not(:first-child) {
      margin-left: 0px;
    }
  `};
`;

const WrapList = styled.div`
  display: flex;
`;

const Caption = styled.div`
  margin-bottom: ${Dimens.small}px;
  font-size: ${FontSizes.medium}px;
  font-weight: bold;
  color: ${Colors.white};
`;

const HrStyled = styled(Hr)`
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

export default () => (
  <Container>
    <Wrap>
      <WrapItems>
        <Caption>サービスについて</Caption>
        <WrapList>
          <ListItem
            list={[
              { name: 'モノオクとは', link: Path.about() },
              { name: '利用の流れ', link: 'https://help.monooq.com/', blank: true },
              { name: 'ホストを始める', link: '3' },
              { name: 'ルールとマナー', link: Path.rule() },
              { name: '荷物に対する保険', link: Path.insurance() },
              { name: 'よくある質問', href: 'https://help.monooq.com/', blank: true },
            ]}
          />
          <ListItem
            list={[
              { name: 'モノオクとは', link: Path.about() },
              { name: '運営会社', link: 'https://monooq.co.jp/', blank: true },
              { name: '利用規約', link: Path.terms() },
              { name: '特定商取引法に基づく表記', link: Path.asct() },
              { name: 'キャンセルポリシー', link: Path.cancelPolicy() },
              { name: '個人情報保護方針', link: Path.privacy() },
            ]}
          />
        </WrapList>
      </WrapItems>
      <HrStyled backgroundColor="rgba(255, 255, 255, 0.1)" marginPhone="20px auto 24px" />
      <WrapItems>
        <Caption>利用ガイド</Caption>
        <WrapList>
          <ListItem
            list={[
              { name: 'ユーザー編' },
              { name: 'モノオクとは', link: Path.about() },
              { name: '利用の流れ', link: 'https://help.monooq.com/', blank: true },
              { name: 'ホストを始める', link: '3' },
              { name: 'ルールとマナー', link: Path.rule() },
              { name: '荷物に対する保険', link: Path.insurance() },
              { name: 'よくある質問', link: 'https://help.monooq.com/', blank: true },
            ]}
          />
          <ListItem
            list={[
              { name: 'ホスト編' },
              { name: 'モノオクとは', link: Path.about() },
              { name: '運営会社', link: 'https://monooq.co.jp/', blank: true },
              { name: '利用規約', link: Path.terms() },
              { name: '特定商取引法に基づく表記', link: Path.asct() },
              { name: 'キャンセルポリシー', link: Path.cancelPolicy() },
              { name: '個人情報保護方針', link: Path.privacy() },
            ]}
          />
        </WrapList>
      </WrapItems>
      <HrStyled backgroundColor="rgba(255, 255, 255, 0.1)" marginPhone="20px auto 24px" />
      <WrapItems company>
        <CompanyInfo />
      </WrapItems>
    </Wrap>
  </Container>
);
