import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/LV1/Texts/InlineText';

const iconCp = 'https://monooq.imgix.net/img%2Fservice%2Flogo-cp.png?auto=compress';

const METHOD_PAYMENT_CREDIT = 0;

const Wrap = styled.div`
  line-height: normal;
  margin: ${Dimens.medium_20}px auto;
  ${media.phone`
    margin: ${Dimens.medium_20}px auto;
  `};
`;

const CreditInfo = styled.div`
  margin: ${Dimens.small}px auto ${Dimens.medium_20}px;
`;

const Item = styled.div`
  padding: ${Dimens.medium_20}px;
  border: 1px solid ${Colors.borderGray};
  border-radius: 4px;
  &:first-child {
    border-radius: 6px 6px 0px 0px;
    border-bottom: none;
  }
  &:last-child {
    border-radius: 0px 0px 6px 6px;
  }
  line-height: 1.5rem;
`;

const ImageCp = styled.img`
  max-width: 300px;
  ${media.phoneSmall`
    max-width: 100%;
  `};
`;

const HyperLink = styled.a`
  color: ${Colors.brandPrimary};
`;

const maskify = cc => {
  return cc.slice(0, -4).replace(/./g, '*') + cc.slice(-4);
};

export default ({ paymentMethod, number, name }) => (
  <Wrap>
    {paymentMethod === METHOD_PAYMENT_CREDIT ? (
      <Fragment>
        <InlineText.Bold>ご利用するクレジットカード</InlineText.Bold>
        <CreditInfo>
          <Item>
            <InlineText.Bold>カード番号</InlineText.Bold>
            <br />
            {maskify(number)}
          </Item>
          <Item>
            <InlineText.Bold>カード名義人</InlineText.Bold>
            <br />
            {name}
          </Item>
        </CreditInfo>
        こちらのクレジットカードから、1ヶ月毎に料金が引き落としされます。
        <br />
        <br />
        また、お支払いを確定することで、当サイトの
        <HyperLink href="https://monooq.com/privacy" target="_blank" rel="noopener noreferrer">
          個人情報保護方針
        </HyperLink>
        及び
        <HyperLink href="https://monooq.com/terms" target="_blank" rel="noopener noreferrer">
          利用規約
        </HyperLink>
        に同意の上、モノオクのスペース利用契約が成立したとみなします。
      </Fragment>
    ) : (
      <Fragment>
        <InlineText.Bold>コンビニ払い・Pay-easyで決済する</InlineText.Bold>
        <br />
        <br />
        <ImageCp src={iconCp} alt="icon-cp" />
        <br />
        <br />
        ・お支払い方法確定後、お支払いページのURLを発行します。
        <br />
        ・「確定する」ボタンを押すことで、お客様は当サイトの
        <HyperLink href="https://monooq.com/privacy" target="_blank" rel="noopener noreferrer">
          個人情報保護方針
        </HyperLink>
        と
        <HyperLink href="https://monooq.com/terms" target="_blank" rel="noopener noreferrer">
          利用規約
        </HyperLink>
        に同意の上、モノオクサービスの予約を確定したことになります。
        <br />
        ・お支払い後、モノオクサービス上で決済完了通知が反映されるまでに2時間程度のお時間をいただきます。
        <br />
        ・48時間以内にお支払い手続きが行われない場合、自動的にキャンセルとなります。
        <br />
        ・お支払いを完了した後、利用を開始される前にキャンセルされた場合、預かり開始日の15日前からキャンセル手数料が発生します。
      </Fragment>
    )}
  </Wrap>
);
