// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import TopIntro from './index';

TopIntro.displayName = 'TopIntro';

storiesOf('Organisms(LV3)/TopIntro', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Use Reason',
    withInfo(`
        ### コンポーネント概要
        Topサービス紹介(モノオクで物置きスペースを探す理由)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <TopIntro
          hilightcopy="小さいモノから大きなモノまで。"
          title="モノオクで物置きスペースを探す理由"
          list={[
            {
              title: '安心の料金',
              description:
                'ホストから提示される金額のみをお支払い。余計な費用なしに荷物を置くことができます。※配送は別途',
            },
            {
              title: '面倒な手続きが不要',
              description:
                '面倒くさい申込書の記入や内覧の必要はありません。必要なのはメッセージや荷物写真のやりとりだけです。',
            },
            {
              title: '拠点数が多い',
              description:
                'モノオクだからできる日本全国に広がる拠点数。あなたのお部屋や引越し先のご近所でも見つかるはず。',
            },
            {
              title: '1ヶ月だけでもOK',
              description:
                '3ヶ月や半年などの契約期間の縛りはありません。ホストと相談して必要な期間だけ荷物を置くことができます。',
            },
            {
              title: '交渉が可能',
              description:
                'もう少し延長できませんか？荷物の搬入を手伝ってくれませんか？など、ホストと気軽に交渉することが可能です。',
            },
          ]}
          isUser
        />
      </div>
    )),
  )
  .add(
    'Host Reason',
    withInfo(`
        ### コンポーネント概要
        Topサービス紹介(モノオクでホストをする理由)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <TopIntro
          hilightcopy="余っているスペースはありませんか？"
          title="モノオクでホストをする理由"
          list={[
            {
              title: '新しい副収入につなげる',
              description: '余っているスペースとスキマ時間で、新しいおこづかいが生まれます。',
            },
            {
              title: '余ったスペースが活用できる',
              description:
                '使っていないクローゼットや押入れ・空き部屋はありませんか？モノオクならどんな場所でも活用できます。',
            },
            {
              title: 'かんたんに誰でもできる',
              description:
                '荷物を受け取ってスペースに置く、最後は持ち主まで返す。これだけで喜んでくれる人がいます。',
            },
            {
              title: '誰かの役にたつ',
              description:
                '引っ越しやリフォーム、片付けなど荷物を置ける場所を探すのは意外と大変なんです。困っている誰かの力になってくれませんか？',
            },
          ]}
          buttonText="ホスト登録はこちら"
          onClick={console.log('Clicked')}
        />
      </div>
    )),
  )
  .add(
    'Share Reason',
    withInfo(`
        ### コンポーネント概要
        Topサービス紹介(安心して物置きのシェアをするために)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <TopIntro
          hilightcopy="みんなでもっと便利に物置きシェアができる世の中へ。"
          title="安心して物置きのシェアをするために"
          list={[
            {
              iconClass: 'far fa-heart',
              title: 'はじめての方へ',
              description:
                'まずは自分に合う物置きスペースを探し、メッセージで荷物を置かせてもらえるかホストに相談をします。サービスの使い方がよくわからない、お困りの方はこちら。',
              buttonText: '使い方について',
              onClick: () => console.log('Clicked'),
            },
            {
              iconClass: 'far fa-bookmark',
              title: '荷物に対する保険',
              description:
                'サービス内の記録であなたの荷物だと証明できる荷物には最大10万円までの補償があります。あなたがホストの時に、もし誰かの荷物を破損・紛失してしまっても同じ補償が受けられるので安心です。',
              buttonText: '保険について',
              onClick: () => console.log('Clicked'),
            },
            {
              iconClass: 'far fa-handshake',
              title: 'ルールとマナー',
              description:
                'モノオクは個人間の物置きシェアサービスです。トラブルや揉め事がないようにルールを設けています。みんなが安心して使えるようにマナーを大切にしましょう。',
              buttonText: 'ルールとマナーについて',
              onClick: () => console.log('Clicked'),
            },
          ]}
          isUser
          isForSafe
        />
      </div>
    )),
  );
