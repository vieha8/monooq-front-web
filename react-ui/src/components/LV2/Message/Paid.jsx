import React, { Fragment } from 'react';
import styled from 'styled-components';
// import { formatDate, formatStringSlash } from 'helpers/date';
// import { formatAddComma } from 'helpers/string';
import InlineText from 'components/LV1/Texts/InlineText';

// const PAYTYPE_CREDITCARD = 1;
// const PAYTYPE_ECONTEXT = 4;

const Wrap = styled(InlineText.Base)`
  display: block;
  font-size: 14px;
`;

// const getTextPayType = payType => {
//   let resultPayType = '';
//   switch (payType) {
//     case PAYTYPE_CREDITCARD:
//       resultPayType = 'クレジットカード決済';
//       break;
//     case PAYTYPE_ECONTEXT:
//       resultPayType = 'コンビニ払い・Pay-easy決済';
//       break;
//     default:
//       resultPayType = 'その他';
//   }
//   return resultPayType;
// };

const Paid = ({ isHost, request }) => (
  <Wrap>
    <InlineText.Base fontSize={20} bold>
      決済が完了しました
    </InlineText.Base>
    <br />
    <br />
    スペース取引成立です！
    <br />
    {isHost ? '下記住所をゲストにお伝えしました。' : '下記住所まで荷物を送りましょう。'}
    <br />
    <br />
    <InlineText.Base fontSize={17} bold>
      ■スペース情報
    </InlineText.Base>
    <br />
    所在地：
    {request.space.address}
    {!isHost && (
      <Fragment>
        <br />
        <br />
        モノオクからお得な料金で荷物の配送ができます。
        <br />
        <a
          href="https://www.hacobell.com/register?tenant_code=monooq"
          target="_blank"
          rel="noopener noreferrer"
          className="gaMessageTipsRentoraLinkPaid"
        >
          ▶配送手配はこちら
        </a>
      </Fragment>
    )}
    {/* TODO: 見積もり決済改修の絡みで一時的に非表示とする */}
    {/* <br />
    <br />
    <InlineText.Base fontSize={17} bold>
      ■お支払い情報
    </InlineText.Base>
    <br />
    見積もりID:
    {request.id}
    <br />
    対象期間：
    {`${formatDate(new Date(request.startDate), formatStringSlash)} 〜 ${formatDate(
      new Date(request.endDate),
      formatStringSlash,
    )}`}
    <br />
    支払方法：
    {`${getTextPayType(request.payType)}(${request.isMonthly === 1 ? '月々自動払い' : '一括払い'})`}
    <br />
    支払金額：
    {`${formatAddComma(request.price + request.fee)}円`}
    <br />
    {`(スペース利用料${formatAddComma(request.price)}円 + サービス利用料${formatAddComma(
      request.fee,
    )}円)`}
    <br /> */}
  </Wrap>
);

export default Paid;
