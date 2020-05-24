import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';
import ImageLogoPayCredit from 'images/logo-pay-credit.svg';
import ImageLogoPayEcontext from 'images/logo-pay-econtext.svg';
import { SectionTitle, SectionTitleSub } from 'components/LV2/Space/Section';

const Wrap = styled.div``;

const ImageLogoPay = styled.img`
  display: inline-block;
  width: 100%;
  height: auto;
  ${props =>
    props.credit &&
    `
    margin-right:  ${Dimens.medium3_40}px;
  `};
  ${props =>
    props.maxWidth &&
    `
    max-width:  ${props.maxWidth}px;
  `};
  ${media.phone`
    display: block;
    margin:  ${Dimens.small2}px 0 0;
  `};
`;

const LinkStyled = styled.a`
  margin-right: ${Dimens.medium}px;
  &:active {
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      opacity: 0.8;
    }
  `};
  ${media.phone`
    display: block;
    margin:  ${Dimens.xsmall}px auto 0;
  `};
`;

const Section = styled.div`
  margin: ${Dimens.medium1}px auto;
  font-size: ${FontSizes.small}px;
  line-height: normal;
`;

const getLink = (url, text) => {
  return (
    <LinkStyled component={Link} href={url} target="_blank" rel="noopener noreferrer">
      {text}
    </LinkStyled>
  );
};

const Attention = () => {
  return (
    <Wrap>
      <Section>
        <SectionTitle text="注意事項" />
        モノオクは、皆様の厚意や配慮の上で成り立つサービスです。お互いが気持ちよく利用できるよう丁寧なコミュニケーションを心がけましょう。
      </Section>
      <Section>
        <SectionTitleSub text="お支払い方法について" />
        クレジットカードを用いた月々払い、コンビニ・Pay-easyを用いた一括払いをご利用できます。
        一部クレジットカード・コンビニはご利用できない場合がございますので、以下の決済可能なお支払いをご確認ください。
        <br />
        {getLink('https://help.monooq.com/ja/articles/2948181', '利用料の支払い方法について')}
        <SectionTitleSub text="お支払いに関するヘルプ" />
        {getLink('https://help.monooq.com/ja/articles/3124614-', 'クレジットカード決済の手順')}
        {getLink(
          'https://help.monooq.com/ja/articles/3124622-',
          'コンビニ払い・Pay-easy決済の手順',
        )}
        <SectionTitleSub text="決済可能なお支払い方法" />
        <Wrap>
          <ImageLogoPay src={ImageLogoPayCredit} maxWidth={110} credit alt="icon-logo-credit" />
          <ImageLogoPay src={ImageLogoPayEcontext} maxWidth={240} alt="icon-logo-econtext" />
        </Wrap>
      </Section>
      <Section>
        <SectionTitle text="トラブル時の補償対応について" />
        サービス外で発生した破損・トラブルには対応致しかねます。スペースを利用する際の契約や連絡は、原則モノオクのメッセージ画面で行うよう、あらかじめご了承ください。
      </Section>
    </Wrap>
  );
};

export default Attention;
