import React, { Fragment } from 'react';
import TextLink from 'components/LV1/Texts/TextLink';

const Requested = () => {
  return (
    <Fragment>
      ホストへリクエストを送信しました。
      <br />
      返信が届いたら、条件を調整して見積もりをもらいましょう。
      <br />
      支払い完了後に住所詳細をお知らせします。
      <br />
      <br />
      モノオクから簡単に配送手配ができます！
      <br />
      <TextLink
        href="https://docs.google.com/forms/d/e/1FAIpQLSfI3YOtJhWe04NlzVOU5_Jr1cMTcEYCEUUus6wJZEyNmws6QA/viewform"
        target="_blank"
        rel="noopener noreferrer"
        className="gaMessageTipsPickgoLinkFirst"
      >
        ▶配送申込みはこちら
      </TextLink>
    </Fragment>
  );
};

export default Requested;
