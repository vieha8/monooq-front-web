import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Title from './story/Title';

import { SpacePage } from './create-space';
import { Footer } from './shared';
import { ResultItem } from './search';
import {
  Card,
  Map,
  PlaceText,
  HeaderTitle,
  SlideImage,
  Caption,
  DetailTitle,
  DetailContainer,
  DetailContent,
  HostInfo,
  PriceTitle,
  PriceContent,
  SendMessageButton,
  ReportLink,
} from './space';

storiesOf('Avatar', module)
  .add('標準', () => <p>ログイン時のユーザーのアイコン</p>)
  .add('プロフィール表示', () => <p>プロフィール登録時、編集時のアイコン</p>)
  .add('プロフィール登録完了時', () => <p>プロフィール登録完了時のアイコン</p>);

storiesOf('AvatarPresence', module)
  .add('標準', () => <p>ログイン時のユーザーのアイコンと名前とステータス一式(サイドバーに表示)</p>)
  .add('相手の名前', () => <p>アイコンと「ホストは○○さん」の表記一式</p>)
  .add('相手の名前(連絡先)', () => <p>アイコンと「ホストは○○さん」「連絡先」の表記一式</p>)
  .add('ホスト(場所詳細)', () => <p>アイコンと「ホストは○○さん」「自己紹介」の表記一式</p>);

storiesOf('Badge', module)
  .add('新着', () => <p>サイドバー・メッセージのバッジ</p>)
  .add('予定', () => <p>サイドバー・預かるスケジュールのバッジ</p>)
  .add('地域', () => <p>場所詳細表示時の「東京都 港区」など</p>)
  .add('支払い済み', () => <p>リクエスト支払い済み時のバッジ</p>);

storiesOf('Buttons', module)
  .add('検索', () => <p>「検索する」ボタンなど</p>)
  .add('ホストになる', () => <p>ホストになるボタン</p>)
  .add('登録', () => <p>ホストになるボタン</p>)
  .add('SNS', () => <p>SNS連携のボタン「登録」「ログイン」の2パターン</p>)
  .add('メッセージを見る', () => <p>メッセージの確認ボタン</p>)
  .add('キャンセルをする(テキスト)', () => <p>キャンセルするボタン。テキスト</p>)
  .add('レビューを投稿(荷物の引き渡しが完了した)', () => (
    <p>レビューを投稿するボタン(荷物の引き渡しが完了したボタン)</p>
  ))
  .add('次へ', () => <p>次へ進むボタン 「次へ」「本人確認」など</p>)
  .add('SMSを再送する', () => <p>「SMSを再送する」など</p>)
  .add('写真を登録する(ユーザー)', () => <p>ユーザー側の「写真を登録する」など</p>)
  .add('場所を探す/ホストになる', () => <p>プロフィール登録完了時など</p>)
  .add('写真を登録する(場所)', () => (
    <p>場所の「写真を登録(更新)する」「場所を登録(更新)する」など</p>
  ))
  .add('保存する', () => <p>登録情報を保存(削除)するボタン・登録した場所を見る</p>)
  .add('編集する', () => <p>場所の管理</p>)
  .add('非公開にする', () => <p>場所の管理</p>)
  .add('場所を登録する', () => <p>場所を登録する丸いボタン</p>)
  .add('公開した場所を見る', () => <p>場所情報公開時</p>)
  .add('場所リストを見る', () => <p>場所情報公開時</p>)
  .add('現在地ボタン', () => <p>地図ピンアイコンのボタン</p>)
  .add('リストに戻る', () => <p>リストに戻るボタン</p>)
  .add('チャットで相談する', () => <p>チャットで相談する丸いボタン</p>)
  .add('リクエストを送る', () => <p>リクエストを送る四角いボタン</p>)
  .add('このままリクエストへ進む', () => <p>チャット時に表示するボタン</p>)
  .add('リクエストを送信する', () => <p>リクエストを送信する画面にて送信するボタン</p>)
  .add('このリクエストを編集する', () => <p>編集するボタン</p>)
  .add('料金の支払いをする', () => <p>料金の支払いをするボタン</p>)
  .add('決済する', () => <p>決済するボタン</p>)
  .add('ホストに連絡をする', () => <p>ホストに連絡をするボタン</p>)
  .add('このリクエストを承認する', () => <p>このリクエストを承認するボタン</p>)
  .add('チャットを見る', () => <p>ホスト専用チャットのコメント確認ボタン</p>)
  .add('荷物の引き渡しが完了した', () => <p>荷物の引き渡しが完了したボタン</p>)
  .add('キャンセルをする(ボタン)', () => <p>キャンセルするボタン。</p>)
  .add('ユーザー/ホスト', () => <p>ユーザーかホストかを選択させるボタン</p>);

storiesOf('Box', module)
  .add('スケジュール', () => <p>「預ける日時」「引き取る日時」「預かる日時」など</p>)
  .add('売上・(支払)予定金額・支払い金額', () => (
    <p>売上の表示・(支払)予定金額・支払い金額の表示</p>
  ))
  .add('場所情報(場所の管理)', () => <p>「場所の写真」「場所」「説明」「条件」の表示一式</p>)
  .add('場所情報(検索結果)', () => <p>「場所の写真」「場所」「説明」「条件」の表示一式</p>)
  .add('場所情報(地図検索時の結果)', () => <p>「場所の写真」「場所」「説明」「条件」の表示一式</p>)
  .add('メッセージ(メッセージ一覧)', () => (
    <p>「相手のアイコン」「○○さんから~届いています」「受信日時」の表示一式</p>
  ))
  .add('預けるスケジュール(預けるスケジュール一覧)', () => (
    <p>
      「場所情報」「スケジュール」「ホスト情報」「メッセージを見るボタン」「キャンセルするボタン」の表示一式
    </p>
  ))
  .add('預けるスケジュール・キャンセル時(預けるスケジュール一覧)', () => (
    <p>
      「場所情報」「スケジュール」「ホスト情報」「メッセージを見るボタン」「キャンセルするボタン」の表示一式
    </p>
  ));

storiesOf('CatchCopy', module).add('トップ', () => <p>トップのキャッチコピー</p>);

storiesOf('Chat', module)
  .add('標準(自分)', () => <p>「吹き出しメッセージ」「送信日時」の表示一式</p>)
  .add('標準(相手)', () => <p>「相手のアイコン」「吹き出しメッセージ」「受信日時」の表示一式</p>)
  .add('標準(自分)添付画像あり', () => (
    <p>「吹き出しメッセージ」「送信日時」「添付画像」の表示一式</p>
  ))
  .add('標準(相手)添付画像あり', () => (
    <p>「相手のアイコン」「吹き出しメッセージ」「受信日時」「添付画像」の表示一式</p>
  ));

storiesOf('ChatAttachment', module).add('標準', () => (
  <p>「カメラアイコン」「写真アイコン」「テキストインプット」「絵文字」「送信ボタン」の一式</p>
));

storiesOf('CheckBox', module).add('標準', () => (
  <p>「受取・引取がしやすい曜日」「利用規約同意のチェック」など</p>
));

storiesOf('Footer', module)
  .add('標準', () => <Footer />)
  .add('サイドメニュー', () => <p>サイドメニューのフッター</p>);

storiesOf('Header', module)
  .add('画面タイトル', () => <p>「預けるスケジュール」「場所の登録をする」など</p>)
  .add('見出し', () => <p>「場所に関して」「料金に関して」など</p>);

storiesOf('Icon', module)
  .add('ロゴ', () => <p>monooqのロゴアイコン</p>)
  .add('検索', () => <p>検索時の虫眼鏡アイコン</p>)
  .add('マップ検索', () => <p>マップ,場所検索のアイコン</p>)
  .add('日付', () => <p>日付入力時のカレンダーみたいなアイコン</p>)
  .add('ハンバーガーボタン', () => <p>メニュー非表示時のハンバーガーボタンに使用するアイコン</p>)
  .add('チャット通知', () => <p>チャットからの通知アイコン</p>)
  .add('ユーザー切り替え', () => <p>サイドバー・ユーザー切り替えのアイコン</p>)
  .add('メール', () => <p>メールアドレスのアイコン</p>)
  .add('パスワード', () => <p>パスワードの鍵のようなアイコン</p>)
  .add('地図ピン', () => <p>現在地を探せそうなアイコン</p>)
  .add('☓', () => <p>閉じることができそうな「☓」アイコン</p>)
  .add('アロー', () => <p>クリックするとモーダルが降りてきそうなアイコン</p>)
  .add('省略記号(ellipsis)', () => <p>点3つで、クリックするとモーダルが表示されそうなアイコン</p>);

storiesOf('Image', module)
  .add('画像登録', () => <p>場所の写真登録(編集)時に表示する画像</p>)
  .add('画像登録(5枚表示時)', () => <p>登録済みの画像が5枚表示されている時の場所の画像</p>)
  .add('画像表示(場所の管理)', () => <p>場所の管理で表示される場所の画像</p>)
  .add('画像表示(リクエストを送信する)', () => <p>リクエスト送信時に表示される場所の画像</p>);

storiesOf('Line', module).add('標準', () => <p>文章の区切り線</p>);

storiesOf('Search', module).add('検索結果 項目', () => (
  <ResultItem place="六本木" name="麻布十番駅から徒歩3分" typeOK price="1000/2000/5000" />
));

storiesOf('CreateSpace', module).add('スペース登録', () => <SpacePage />);

storiesOf('Space', module)
  .add('カード', () => (
    <Card>
      <h1>テスト</h1>
      <h2>テスト</h2>
      <h3>テスト</h3>
      <h4>テスト</h4>
      <h5>テスト</h5>
    </Card>
  ))
  .add('マップ', () => (
    <Map
      containerElement={<div style={{ height: '300px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
      loadingElement={<div style={{ height: '100%' }} />}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrHQDZXZI21cMEW8FIYYWKyvI2kLUDsbA&v=3.exp&libraries=geometry,drawing,places"
    />
  ))
  .add('場所テキスト', () => <PlaceText>東京都 港区 六本木</PlaceText>)
  .add('タイトル', () => (
    <HeaderTitle>東京タワーに近くて便利！大きい荷物も何人分でもOK</HeaderTitle>
  ))
  .add('画像スライドショー', () => (
    <div style={{ width: '400px' }}>
      <SlideImage
        images={[
          {
            original: 'http://placehold.jp/200x150.png',
            thumbnail: 'http://placehold.jp/200x150.png',
          },
          {
            original: 'http://placehold.jp/200x150.png',
            thumbnail: 'http://placehold.jp/200x150.png',
          },
          {
            original: 'http://placehold.jp/200x150.png',
            thumbnail: 'http://placehold.jp/200x150.png',
          },
        ]}
      />
    </div>
  ))
  .add('説明', () => (
    <Caption>
      閲覧頂き有り難うございます！赤羽橋、芝公園などの駅付近で預かることが可能です。玄関から入れば大きめの荷物も対応可能です！
    </Caption>
  ))
  .add('各項目タイトル', () => (
    <div>
      <DetailTitle>スペースについて</DetailTitle>
      <DetailTitle>荷物について</DetailTitle>
    </div>
  ))
  .add('各項目内容ボックス', () => (
    <div>
      <DetailContainer
        title="所在地"
        renderContent={() => <DetailContent.Address>東京都港区西新橋</DetailContent.Address>}
      />
      <DetailContainer
        title="種類"
        renderContent={() => <DetailContent.SpaceType>クローゼット</DetailContent.SpaceType>}
      />
      <DetailContainer
        title="預かることができる荷物"
        renderContent={() => (
          <DetailContent.BaggegeType
            typeOK
            text="冷蔵庫や洗濯機など家具・家電もお預かり可能ですが、ボリュームによっては検討させていただきますのでご相談ください！"
          />
        )}
      />
    </div>
  ))
  .add('各項目内容', () => (
    <div>
      <Title>所在地</Title>
      <DetailContent.Address>東京都港区西新橋</DetailContent.Address>
      <Title>種類</Title>
      <DetailContent.SpaceType>クローゼット</DetailContent.SpaceType>
      <Title>預かることができる荷物 - 家具・家電OK</Title>
      <DetailContent.BaggegeType
        typeOK
        text="冷蔵庫や洗濯機など家具・家電もお預かり可能ですが、ボリュームによっては検討させていただきますのでご相談ください！"
      />
      <Title>預かることができる荷物 - 家具・家電NG</Title>
      <DetailContent.BaggegeType text="狭いクローゼットなので大きめの家具・家電はお預かりできかねます。リクエスト時にご相談ください。" />
      <Title>受取り方法</Title>
      <DetailContent.HowToReceive delivery meeting />
      <Title>受取りについて補足</Title>
      <DetailContent.ReceiveSupplement text="普段は会社勤めですので、基本的には平日の夜のご対応となります。土日でも対応できる時がありますので、事前にメッセージでお知らせください！" />
    </div>
  ))
  .add('ホスト情報', () => (
    <HostInfo
      img={{
        src: 'https://placehold.jp/150x150.png',
        alt: 'YUKI HASHIDA',
      }}
      hostName="YUKI HASHIDA"
      text="こんにちは。東京都港区芝に住む29才です。是非安心して荷物を預けてくださいね。こんにちは。東京都港区芝に住む29才です。是非安心して荷物を預けてくださいね。こんにちは。"
    />
  ))
  .add('価格タイトル', () => <PriceTitle />)
  .add('価格表示', () => (
    <div style={{ maxWidth: '250px' }}>
      <PriceContent
        title="スペースまるごと"
        price="20000円"
        caption="スペースのほとんどを使用する荷物の場合の料金"
      />
      <PriceContent
        title="スペース半分"
        price="10000円"
        caption="スペースの半分程度を使用する荷物の場合の料金"
      />
      <PriceContent
        title="スペース1/4"
        price="5000円"
        caption="スペースの4分の1程度を使用する荷物の場合の料金"
      />
    </div>
  ))
  .add('メッセージを送るボタン', () => (
    <SendMessageButton onClickSendMessage={() => console.log('onClickSendMessage')} />
  ))
  .add('不適切な内容を報告', () => <ReportLink />);

storiesOf('Map', module).add('検索結果', () => <p>検索結果に表示されるサイズ大のマップ</p>);

storiesOf('Menu', module).add('サイドメニュー', () => <p>サイドメニュー</p>);

storiesOf('SlectBox', module)
  .add('標準', () => <p>「お住いの地域」「予定時刻」など</p>)
  .add('横長', () => <p>「ダンボールの数」などど</p>);

storiesOf('Text', module)
  .add('標準(白)', () => <p>標準の白テキスト</p>)
  .add('標準(色付き)', () => <p>標準の色付きテキスト</p>)
  .add('ステータス(承認待ち)', () => <p>ホストの承認待ち時のテキスト</p>)
  .add('ステータス(変更、承認)', () => <p>ホストがリクエストを変更・承認した時のテキスト</p>)
  .add('エラー', () => <p>エラー通知時</p>);

storiesOf('TextInput', module)
  .add('標準', () => <p>デフォルトのインプットエリアとラベル「どこで預ける？」など</p>)
  .add('ログイン時', () => <p>ログイン時のインプットエリア「メールアドレス」「パスワード」など</p>);
