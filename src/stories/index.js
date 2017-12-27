import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);


storiesOf('Icons', module)
  .add('ロゴ', () => <p>monooqのロゴアイコン</p>)
  .add('検索', () => <p>検索時の虫眼鏡アイコン</p>)
  .add('マップ検索', () => <p>マップ,場所検索のアイコン</p>)
  .add('日付', () => <p>日付入力時のカレンダーみたいなアイコン</p>)
  .add('ハンバーガーボタン', () => <p>メニュー非表示時のハンバーガーボタンに使用するアイコン</p>)
  .add('チャット通知', () => <p>チャットからの通知アイコン</p>)
  .add('ユーザー切り替え', () => <p>サイドバー・ユーザー切り替えのアイコン</p>)
  .add('メール', () => <p>メールアドレスのアイコン</p>)
  .add('パスワード', () => <p>パスワードの鍵のようなアイコン</p>);

storiesOf('Buttons', module)
  .add('検索', () => <p>「検索する」ボタンなど</p>)
  .add('ホストになる', () => <p>ホストになるボタン</p>)
  .add('登録', () => <p>ホストになるボタン</p>)
  .add('SNS', () => <p>SNS連携のボタン</p>);

storiesOf('Form', module)
  .add('標準', () => <p>デフォルトフォームの部品</p>);

storiesOf('Footer', module)
  .add('標準', () => <p>デフォルトのフッター</p>)
  .add('サイドメニュー', () => <p>サイドメニューのフッター</p>);

storiesOf('TextInput', module)
  .add('標準', () => <p>デフォルトのインプットエリアとラベル「どこで預ける？」など</p>);

storiesOf('Avatar', module)
  .add('標準', () => <p>ログイン時のユーザーのアイコン</p>);

storiesOf('AvatarPresence', module)
  .add('標準', () => <p>ログイン時のユーザーのアイコンと名前とステータス一式</p>);

storiesOf('Badge', module)
  .add('新着', () => <p>サイドバー・メッセージのバッジ</p>)
  .add('予定', () => <p>サイドバー・預かるスケジュールのバッジ</p>);

storiesOf('SideMenu', module)
  .add('サイドメニュー', () => <p>サイドメニュー</p>);

