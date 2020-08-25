import React, { Fragment } from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';

const Wrap = styled(InlineText.Base)`
  display: block;
  font-size: 14px;
`;

const Paid = ({ isHost, request }) => (
  <Wrap>
    <InlineText.Base fontSize={20} bold>
      {isHost ? 'ゲストの支払いが完了しました' : 'お支払いしました'}
    </InlineText.Base>
    <br />
    <br />
    スペース利用契約の成立です！
    <br />
    {isHost
      ? '次の住所をゲストにお伝えしました。'
      : 'ホストと日時を調整し、スペースへ荷物を送りましょう。'}
    <br />
    <br />
    スペースの住所：
    <br />
    <InlineText.Base fontSize={17} bold>
      {request.space.address}
    </InlineText.Base>
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
  </Wrap>
);

export default Paid;
