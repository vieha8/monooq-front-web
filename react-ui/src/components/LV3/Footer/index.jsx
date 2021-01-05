import React from 'react';
import styled from 'styled-components';
import Hr from 'components/LV1/HorizontalRule';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';
import { partialMatch } from 'helpers/string';
import { media } from 'helpers/style/media-query';
import Path from 'config/path';
import LPLink from './LPLink';
import ListItem from './ListItem';
import CompanyInfo from './CompanyInfo';

// TODO: layout.jsxでパスで判断し、footerを画面別に表示分けしたい
// スペース編集確認画面の場合、footerを非表示とし、padding-bottomをなくす。
const Wrap = styled.footer`
  position: relative;
  z-index: ${ZIndexes.footer};
  display: flex;
  width: 100%;
  background-color: ${Colors.black4};
  margin-top: ${Dimens.medium3_44}px;
  padding: 0px ${Dimens.medium2}px ${Dimens.large2_70}px;
  ${props =>
    props.bottomMargin &&
    !props.bottomMarginOnlySP &&
    `
      padding: 0px ${Dimens.medium2}px ${Dimens.large2_70}px;
    `};
  ${media.tablet`
    ${props =>
      (props.bottomMargin || props.bottomMarginOnlySP) &&
      `
        padding: 0px ${Dimens.medium2}px ${Dimens.large4_80}px;
      `};
  `};
`;

const WrapInner = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: ${Dimens.medium4}px 0px;
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

export default ({ bottomMargin, bottomMarginOnlySP }) => {
  return (
    <Wrap bottomMargin={bottomMargin} bottomMarginOnlySP={bottomMarginOnlySP}>
      <WrapInner>
        <WrapItems>
          <Caption>サービスについて</Caption>
          <WrapList>
            <ListItem
              list={[
                { name: 'モノオクとは？', link: Path.about() },
                { name: '利用の流れ', link: Path.howtouse() },
                { name: 'よくある質問', href: 'https://help.monooq.com/', blank: true },
                { name: 'お問い合わせ', link: Path.inquiry() },
                { name: 'ルールとマナー', link: Path.rule() },
              ]}
            />
            <ListItem
              list={[
                { name: '運営会社', href: 'https://monooq.co.jp/', blank: true },
                { name: '利用規約', link: Path.terms() },
                { name: '個人情報保護方針', link: Path.privacy() },
                { name: '特定商取引法に基づく表記', link: Path.asct() },
                { name: 'キャンセルポリシー', link: Path.cancelPolicy() },
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
                { name: 'ゲスト編' },
                {
                  name: '登録方法',
                  href:
                    'https://help.monooq.com/ja/articles/2944042-%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E7%99%BB%E9%8C%B2%E3%81%AE%E3%82%84%E3%82%8A%E6%96%B9%E3%81%AF',
                  blank: true,
                },
                {
                  name: '取引の流れ',
                  href:
                    'https://help.monooq.com/ja/articles/3029220-%E5%8F%96%E5%BC%95%E3%81%AE%E6%B5%81%E3%82%8C%E3%81%AF',
                  blank: true,
                },
                {
                  name: '決済の流れ',
                  href:
                    'https://help.monooq.com/ja/articles/2948181-%E5%88%A9%E7%94%A8%E6%96%99%E3%82%92%E6%94%AF%E6%89%95%E3%81%86%E6%96%B9%E6%B3%95%E3%81%AF',
                  blank: true,
                },
                {
                  name: '配送方法について',
                  href:
                    'https://help.monooq.com/ja/articles/3022639-%E3%82%AA%E3%82%B9%E3%82%B9%E3%83%A1%E3%81%AE%E8%8D%B7%E7%89%A9%E6%90%AC%E5%85%A5-%E6%90%AC%E5%87%BA%E6%96%B9%E6%B3%95%E3%81%AF',
                  blank: true,
                },
                { name: 'あんしん荷物補償', link: Path.insurance() },
              ]}
            />
            <ListItem
              list={[
                { name: 'ホスト編' },
                {
                  name: 'スペースの登録方法',
                  href:
                    'https://help.monooq.com/ja/articles/2929168-%E3%82%B9%E3%83%9A%E3%83%BC%E3%82%B9%E7%99%BB%E9%8C%B2%E3%81%99%E3%82%8B%E3%81%AB%E3%81%AF',
                  blank: true,
                },
                {
                  name: '取引の流れ',
                  href:
                    'https://help.monooq.com/ja/articles/3029212-%E5%8F%96%E5%BC%95%E3%81%AE%E6%B5%81%E3%82%8C%E3%81%AF',
                  blank: true,
                },
                {
                  name: '見積もりの出し方',
                  href: 'https://help.monooq.com/ja/articles/3694521',
                  blank: true,
                },
                {
                  name: '売上金の受け取り方法',
                  href:
                    'https://help.monooq.com/ja/articles/2083706-%E5%A3%B2%E4%B8%8A%E9%87%91%E3%82%92%E5%8F%97%E3%81%91%E5%8F%96%E3%82%8B%E3%81%AB%E3%81%AF',
                  blank: true,
                },
                {
                  name: '人気スペースになるコツ',
                  href:
                    'https://help.monooq.com/ja/articles/2966791-%E3%82%B9%E3%83%9A%E3%83%BC%E3%82%B9%E3%82%92%E7%B6%BA%E9%BA%97%E3%81%AB%E6%92%AE%E5%BD%B1%E3%81%99%E3%82%8B%E3%81%AB%E3%81%AF',
                  blank: true,
                },
              ]}
            />
          </WrapList>
        </WrapItems>
        <HrStyled backgroundColor="rgba(255, 255, 255, 0.1)" marginPhone="20px auto 24px" />
        <WrapItems company>
          <CompanyInfo />
        </WrapItems>
        {bottomMargin && (
          <LPLink
            isPageLp123Guest={!partialMatch(window.location.pathname, Path.lp1Host())}
            isPageLp12GuestLinkTop={
              partialMatch(window.location.pathname, Path.lp1Guest2()) ||
              partialMatch(window.location.pathname, Path.lp2Guest2())
            }
          />
        )}
      </WrapInner>
    </Wrap>
  );
};
