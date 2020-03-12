import React, { Fragment } from 'react';

const Paid = ({ request }) => {
  return (
    request && (
      <Fragment>
        【決済が完了しました】
        <br />
        見積もりID:
        {request.id}
        <br />
        スペース取引成立です！下記住所まで荷物を送りましょう。
        <br />
        <br />
        スペース所在地:
        {request.space.address}
        <br />
        <br />
        モノオクからおすすめ配送！
        <br />
        <a
          href="https://rentora.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="gaMessageTipsRentoraLinkPaid"
        >
          ▶申込みはこちら
        </a>
      </Fragment>
    )
  );
};

export default Paid;
