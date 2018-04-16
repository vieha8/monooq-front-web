// @flow

import React from 'react';
import Template from './Template';

const QandA = [
  {
    title: 'モノオクは日本全国で使えますか？',
    content:
      'はい、モノオクは誰でもかんたんに余ったスペースを掲載できるサービスです。東京を中心に拠点数は全国へ広がっています。',
    circleDown: true,
  },
  {
    title: '30日未満の短期のスペース利用はできますか？',
    content:
      'モノオクは30日以上の長期利用に最適なサービスです。期間が短い場合はホストに断られてしまったり、割高になる可能性があります。',
    circleDown: true,
  },
  {
    title: '荷物は1個しか置けないのですか？',
    content:
      'いいえ。ソファーひとつから1人暮らしの家具一式を置かせてくれるスペースもあります。あなたが置きたい荷物に合わせてホストに相談してみましょう。',
    circleDown: true,
  },
  {
    title: 'スペース利用料金について教えてください。',
    content:
      '人によって荷物の内容は様々です。あなたの荷物の量や大きさに合わせられるように柔軟な料金目安が設定されています。',
    circleDown: true,
  },
  {
    title: 'なぜスペース利用料金がホストによって異なるのですか？',
    content:
      'スペースによって立地や環境、広さや高さなどが異なるからです。あなたの荷物に対して最適な料金を見積もりできるように、ホストは料金の目安を提示しています。',
    circleDown: true,
  },
  {
    title: '物置きスペースのセキュリティが心配です。',
    content:
      'モノオクは会員登録制のサービスです。常にホストやスペースをチェックしています。また、もしも荷物が盗難・紛失などの事故にあった際は、最大10万円までの保証を用意しています。',
    circleDown: true,
  },
  {
    title: '「相談する」とはなんですか？',
    content:
      '該当するスペースを掲載しているホストに連絡を取ることができます。あなたの荷物内容をすべて伝えて、ホストがスペースに置けるかどうか判断してもらいます。',
    circleDown: true,
  },
  {
    title: '荷物を置く際に、スペース利用手数料はかかりますか？',
    content:
      '現在はスペース利用手数料0円キャンペーン中です！気軽に物置きスペースを探してみてください！',
    circleDown: true,
  },
  {
    title: '貴重品や高価なものはスペースに置けますか？',
    content: 'いいえ。貴重品や高価な荷物をモノオク上でやり取りすることはできません。',
    circleDown: true,
  },
  {
    title: '荷物の内容はすべて伝えなければいけませんか？',
    content:
      'はい。スペースに置くすべての荷物の詳細と写真を連絡してください。事前にホストが荷物を置けるか確認できるので、トラブル回避のためにも支払い前に必ず伝えてください。当日になって申告がなかった荷物をお願いしても受け取ってもらえない可能性があります。',
    circleDown: true,
  },
  {
    title: 'スペースにはどれくらいのサイズ・量の荷物を置くことができますか？',
    content:
      '掲載スペースにより異なります。可能かどうかはホストの判断となります。具体的な荷物の大きさや量を事前にホストへ伝えてください。',
    circleDown: true,
    anchor: 'common1',
  },
  {
    title: '支払い方法は何ですか？',
    content: '現在はクレジットカード決済のみ対応しています。',
    circleDown: true,
  },
  {
    title: '保険の適応ができない荷物はありますか？',
    content:
      'お支払い前に「<a href="/insurance">荷物に対する保険</a>」ページを必ずお読みください。',
    circleDown: true,
  },
  {
    title: '配送方法には何がありますか？',
    content:
      '現在のモノオクでは配送手配はできません。ご自身で配送またはレンタカー等の手配をお願いします。モノオクでは手頃な値段でお客様と配送員をつないでくれるPickGoという配送サービスをおすすめしています。',
    circleDown: true,
  },
];

type PropTypes = {
  onClickList: Function,
  openFlagList: Array<boolean>,
  onClickBack: Function,
};

export default (props: PropTypes) => (
  <Template
    headline="サービスについて"
    qa={QandA}
    openFlagList={props.openFlagList}
    onClickList={props.onClickList}
    onClickBack={props.onClickBack}
  />
);
