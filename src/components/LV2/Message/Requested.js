import React, { Fragment } from 'react';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';
import Path from 'config/path';

const Requested = () => {
  return (
    <Fragment>
      <InlineText.Base fontSize={20} bold>
        リクエストを送信しました
      </InlineText.Base>
      <br />
      <br />
      返信が届いたら、条件を調整して見積もりをもらいましょう。
      <br />
      支払い完了後に住所詳細をお知らせします。
      <br />
      <br />
      <InlineText.Base fontSize={17} bold>
        ■おすすめ情報
      </InlineText.Base>
      <br />
      ①スペースは契約が決まり次第埋まっていくため、複数のスペースへリクエストしましょう。
      <br />
      一度入力した内容は使い回せるため、他へのリクエストも楽々。
      <br />
      <br />
      ②モノオクからお得な料金で荷物配送ができます。
      <br />
      <TextLink
        href="https://www.hacobell.com/register?tenant_code=monooq"
        target="_blank"
        rel="noopener noreferrer"
        className="gaMessageTipsRentoraLinkFirst"
      >
        ▶配送手配はこちら
      </TextLink>
      <br />
      <br />
      ③預け先が見つからない…そんなときはモノオク運営のスペースへご相談どうぞ！(東京都限定)
      <br />
      <TextLink to={Path.space(4518)}>▶モノオクのスペースはこちら</TextLink>
    </Fragment>
  );
};

export default Requested;
