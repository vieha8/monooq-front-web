import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors, Dimens, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';
import SectionTitle from './SectionTitle';
const ImageBgWorry =
  'https://monooq.imgix.net/img%2Fservice%2Flp123guest%2Fbg-worry.png?alt=media&auto=format&auto=compress';
const ImageBgWorryPerson =
  'https://monooq.imgix.net/img%2Fservice%2Flp123guest%2Fbg-worry-person.png?alt=media&auto=format&auto=compress';

const Wrap = styled.div``;

const WorryWrap = styled.div`
  position: relative;
  margin: ${Dimens.small_10}px auto ${Dimens.medium_20}px;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  background-color: ${Colors.lightGray9};
  background-image: url(${ImageBgWorry});
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0px;
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-color: ${Colors.white} transparent transparent transparent;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
  }
  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -25px;
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-color: ${Colors.lightGray9} transparent transparent transparent;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
    z-index: ${ZIndexes.child_1};
  }
`;

const WorryConnect = styled.span`
  top: 15%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  ${media.phone`
    top: 20%;
  `};
`;

const WorryWrapUl = styled.div`
  position: relative;
  min-height: 280px;
  max-width: 960px;
  margin: auto;
  padding: 0px ${Dimens.medium2}px;
  background-image: url(${ImageBgWorryPerson});
  background-repeat: no-repeat;
  background-size: 280px;
  background-position: bottom right;
  ${media.tablet`
    padding: 0px ${Dimens.medium}px;
  `};
  ${media.phone`
    min-height: 220px;
    padding: 0px ${Dimens.small_10}px;
    background-size: 100px;
  `};
`;

const WorryUl = styled.ul`
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  font-size: ${FontSizes.medium2_26}px;
  text-align: left;
  ${media.phone`
    background-size: 100px;
    font-size: ${FontSizes.medium}px;
  `};
  ${media.phoneSmall`
    font-size: ${FontSizes.small}px;
  `};
`;

const WorryLi = styled.li`
  margin-bottom: 0.7em;
`;

// TODO: activeクラス付与時のみ、background-position
const Marker = styled.span`
  background-image: -webkit-linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-image: -moz-linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-image: -ms-linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-image: -o-linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-image: linear-gradient(left, transparent 50%, rgb(255, 220, 139) 0%);
  background-repeat: repeat-x;
  background-size: 200% 0.8em;
  background-position: 0 0.5em;
  transition: all 2s ease;
  background-position: -100% 0.5em;
`;

const CatchPhraseWrap = styled.div`
  position: relative;
  background-color: ${Colors.brandPrimary};
  margin: ${Dimens.small_10}px auto ${Dimens.medium_20}px;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  min-height: 150px;
  color: #fff;
`;

const CatchPhraseConnect = styled.span`
  top: 30%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const CatchPhraseText = styled.span`
  display: block;
  font-size: ${FontSizes.large}px;
  line-height: normal;
  text-align: center;
  padding-top: ${Dimens.large4_80}px;
  ${media.tablet`
    font-size: ${FontSizes.medium2}px;
    padding: ${Dimens.large4_80}px ${Dimens.medium}px ${Dimens.medium2}px;
  `};
`;

const BrOnlyTabletSP = styled.br`
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

const MeritWrap = styled.div`
  position: relative;
  padding: ${Dimens.medium2}px;
  background-color: ${Colors.brandQuaternary};
  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0px;
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-color: ${Colors.brandPrimary} transparent transparent transparent;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
  }
  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -25px;
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-color: ${Colors.brandQuaternary} transparent transparent transparent;
    border-width: ${Dimens.medium1_25}px ${Dimens.medium4_50}px 0 ${Dimens.medium4_50}px;
    z-index: ${ZIndexes.child_1};
  }
  ${media.tablet`
    padding: ${Dimens.medium2}px ${Dimens.medium}px;
  `};
`;

const MeritTable = styled.table`
  max-width: 900px;
  margin: auto;
  background: ${Colors.white};
  border: solid 3px ${Colors.lightGray2};
  text-align: left;
  ${media.tablet`
    font-size: ${FontSizes.small}px;
  `};
  ${media.phone`
    font-size: ${FontSizes.small_12}px;
  `};
`;

const MeritTableHead = styled.thead`
  background-color: ${Colors.lightGray2};
  color: ${Colors.white};
  text-align: center;
`;

const MeritTableHeadTh = styled.th`
  &:first-child {
    width: 20%;
  }
  padding: ${Dimens.small2}px ${Dimens.small}px;
  border: solid 1px ${Colors.lightGray2};
  font-weight: normal;
  vertical-align: middle;
  color: ${Colors.black};
  background-color: ${Colors.lightGray2};
  ${props =>
    props.monooq &&
    `
      font-size: ${FontSizes.medium1}px;
      color: ${Colors.white};
      background-color: ${Colors.brandPrimary};;
      border: solid 3px ${Colors.brandPrimary};
    `};
  ${media.phone`
    ${props =>
      props.monooq &&
      `
        font-size: ${FontSizes.medium}px;
      `};
  `};
`;

const MeritTableTbodyTh = styled.th`
  padding: ${Dimens.small2}px ${Dimens.small}px;
  border: solid 1px ${Colors.lightGray2};
  font-weight: normal;
  text-align: center;
  background-color: ${Colors.lightGray8};
  &:nth-child(2) {
    border: solid 3px ${Colors.brandPrimary} !important;
  }
`;

const MeritTableTbodyTd = styled.td`
  padding: ${Dimens.small2}px ${Dimens.small}px;
  border: solid 1px ${Colors.lightGray2};
  line-height: normal;
  ${props =>
    props.monooq &&
    `
      border: solid 3px ${Colors.brandPrimary};
    `};
`;

export default () => (
  <Wrap>
    <WorryWrap>
      <WorryWrapUl>
        <WorryConnect>でも</WorryConnect>
        <WorryUl>
          <WorryLi>
            <Marker>トランクルームやレンタル倉庫は高いし空きがない</Marker>
          </WorryLi>
          <WorryLi>
            <Marker>コンテナは環境が悪い</Marker>
          </WorryLi>
          <WorryLi>
            <Marker>宅配型の保管サービスでは置ききれない</Marker>
          </WorryLi>
        </WorryUl>
      </WorryWrapUl>
    </WorryWrap>
    <CatchPhraseWrap>
      <CatchPhraseConnect>そんな時は</CatchPhraseConnect>
      <CatchPhraseText>
        個人宅に荷物を預けられる
        <BrOnlyTabletSP />
        『モノオク』がおすすめ！
      </CatchPhraseText>
    </CatchPhraseWrap>
    <MeritWrap>
      <SectionTitle text="モノオクのメリット" />
      <MeritTable>
        <MeritTableHead>
          <tr>
            <MeritTableHeadTh />
            <MeritTableHeadTh monooq>モノオク</MeritTableHeadTh>
            <MeritTableHeadTh>一般的なトランクルーム</MeritTableHeadTh>
          </tr>
        </MeritTableHead>
        <tbody>
          <tr>
            <MeritTableTbodyTh>
              1畳あたりの料金
              <br />
              (東京都の場合)
            </MeritTableTbodyTh>
            <MeritTableTbodyTd monooq>6,000円〜/月</MeritTableTbodyTd>
            <MeritTableTbodyTd>15,000円〜/月</MeritTableTbodyTd>
          </tr>
          <tr>
            <MeritTableTbodyTh>初期費用</MeritTableTbodyTh>
            <MeritTableTbodyTd monooq>無料</MeritTableTbodyTd>
            <MeritTableTbodyTd>
              月額料の1.5〜3.5ヶ月分程度
              <br />
              (20,000円〜70,000円ほど)
            </MeritTableTbodyTd>
          </tr>
          <tr>
            <MeritTableTbodyTh>荷物サイズ</MeritTableTbodyTh>
            <MeritTableTbodyTd monooq>大きな荷物、大量の荷物も保管可</MeritTableTbodyTd>
            <MeritTableTbodyTd>大きな荷物、大量の荷物も保管可</MeritTableTbodyTd>
          </tr>
          <tr>
            <MeritTableTbodyTh>距離</MeritTableTbodyTh>
            <MeritTableTbodyTd monooq>最寄りのスペースを探せる</MeritTableTbodyTd>
            <MeritTableTbodyTd>指定場所のみ対応（郊外中心）</MeritTableTbodyTd>
          </tr>
          <tr>
            <MeritTableTbodyTh>保険</MeritTableTbodyTh>
            <MeritTableTbodyTd monooq>
              荷物保険込みの料金
              <br />
              (三井住友海上と提携)
            </MeritTableTbodyTd>
            <MeritTableTbodyTd>業者によって様々</MeritTableTbodyTd>
          </tr>
          <tr>
            <MeritTableTbodyTh>手続き</MeritTableTbodyTh>
            <MeritTableTbodyTd monooq>一切不要</MeritTableTbodyTd>
            <MeritTableTbodyTd>
              必要
              <br />
              (契約書類への記入、押印および審査等)
            </MeritTableTbodyTd>
          </tr>
        </tbody>
      </MeritTable>
    </MeritWrap>
  </Wrap>
);
