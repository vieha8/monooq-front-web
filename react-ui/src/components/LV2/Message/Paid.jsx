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
        モノオクから簡単に配送手配ができます！
        <br />
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfI3YOtJhWe04NlzVOU5_Jr1cMTcEYCEUUus6wJZEyNmws6QA/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="gaMessageTipsPickgoLinkPaid"
        >
          ▶配送申込みはこちら
        </a>
      </Fragment>
    )
  );
};

export default Paid;
