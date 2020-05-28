import React, { Fragment } from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import { Dimens, Colors } from 'variables';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';

const CautionWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${Dimens.medium1}px ${Dimens.small}px;
  ${props =>
    props.news &&
    `
    margin-top: ${Dimens.medium_20}px;
    padding: ${Dimens.medium}px;
    background-color: ${Colors.lightGray4};
  `};
  ${props =>
    props.bottom &&
    `
    border-top: 1px solid ${Colors.borderGray};
    padding-bottom: 0;
  `};
`;

const ItemLink = styled.div`
  &:not(:last-child) {
    margin-bottom: ${Dimens.small}px;
  }
`;

const CautionText = styled(InlineText.Small)`
  font-weight: bold;
  ${props =>
    !props.noMargin &&
    `
    margin-bottom: ${Dimens.small2}px;
  `};
`;

const CautionTextSub = styled(InlineText.Small)``;

const getTextLink = (url, className, text, isLinkTo) => {
  return (
    <TextLink
      href={!isLinkTo ? url : null}
      to={isLinkTo ? url : null}
      fontSize={14}
      fontsizesp={14}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {text}
    </TextLink>
  );
};

const Caution = ({ hostUser }) => {
  return (
    <Fragment>
      {hostUser && (
        <CautionWrap news>
          <CautionText noMargin>見積もり・決済画面がリニューアルしました！</CautionText>
          <CautionTextSub>
            2020年5月25日より見積もりの作成方法が変わりました。詳しくは
            {getTextLink(
              'https://help.monooq.com/ja/articles/4036030-',
              'gaMessageBottomNewsLink',
              'こちら',
              false,
            )}
            をご確認ください。
          </CautionTextSub>
        </CautionWrap>
      )}
      <CautionWrap>
        <CautionText>モノオクではサービス外のお支払いや現金取引は禁止です。</CautionText>
        <ItemLink>
          {getTextLink(
            'https://help.monooq.com/ja/articles/2948108-%E3%83%9B%E3%82%B9%E3%83%88%E3%81%A8%E3%81%AE%E3%82%84%E3%82%8A%E5%8F%96%E3%82%8A%E3%81%AF%E3%81%A9%E3%81%86%E3%82%84%E3%81%A3%E3%81%A6%E9%80%B2%E3%82%81%E3%82%8B%E3%81%AE',
            'gaMessageBottomFlowLink',
            '取引完了までの流れ',
            false,
          )}
        </ItemLink>
        <ItemLink>
          {getTextLink(
            'https://help.monooq.com/ja/articles/3694521-',
            'gaMessageBottomFlowLink',
            '見積もりの出し方',
            false,
          )}
        </ItemLink>
        <ItemLink>
          {getTextLink(
            'https://help.monooq.com/ja/articles/3368023-%E5%BF%85%E8%A6%81%E3%81%AA%E7%95%B3%E6%95%B0%E3%81%AE%E7%9B%AE%E5%AE%89%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6',
            'gaMessageBottomBreadthLink',
            '必要な広さの目安',
            false,
          )}
        </ItemLink>
        <ItemLink>
          {getTextLink(
            'https://help.monooq.com/ja/',
            'gaMessageBottomQuestionLink',
            'よくある質問',
            false,
          )}
        </ItemLink>
        <ItemLink>
          {getTextLink(Path.rule(), 'gaMessageBottomRuleLink', 'ルールとマナー', true)}
        </ItemLink>
      </CautionWrap>
      <CautionWrap bottom>
        <CautionTextSub>
          経年劣化によるショート・不具合の可能性がある製品に関して。自然発生的な故障のケースは一切の保証ができません。電化製品・家電などでスペース利用を検討している場合はあらかじめご了承ください。
        </CautionTextSub>
      </CautionWrap>
    </Fragment>
  );
};

export default Caution;
