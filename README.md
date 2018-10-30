# モノオクフロントエンド

## 概要
- React&ReduxによるSPA(Single Page Application)
- [create-react-app](https://github.com/facebook/create-react-app)がベースとなっています。
- ディレクトリ構成は[Ducks](https://github.com/erikras/ducks-modular-redux)に影響を受けています。
- コミット時にコード整形ツールの[prettier](https://github.com/prettier/prettier)が走るようになっています。

## ディレクトリについて
SEO・OGPの対策として、プリレンダリングと呼ばれる仕組みを導入しています。その為Node.jsのExpressによるプロキシサーバーを挟んでいます。

- react-ui...Reactを始めとするフロントエンドに関わるファイル全般が含まれています。基本的に開発はこの配下のディレクトリで行うことになります。
- server...プリレンダリング用のプロキシサーバー用ファイルが含まれています。

## セットアップ手順

```
git clone https://github.com/monooq/monooq-front-web
cd monooq-front-web/react-ui
npm install
npm start
```

上記手順の後、http://localhost:3000で動作確認可能です。

- styled-components のコンポーネント名を class に含めた DOM をレンダリングして欲しい場合は`npm run dev-start`。
- Storybookの起動は`npm run storybook`。

## デプロイに関して
masterブランチにプッシュすると自動的に下記環境にデプロイされます。
- [開発環境](https://monooq-front-web-dev.herokuapp.com/)
- [ステージング環境](https://monooq-front-web-staging.herokuapp.com/)

テストは基本的ににローカル開発環境もしくは上記の開発環境で行ってください。
本番環境へのデプロイは工藤が対応します。

また、storybookブランチにプッシュすると[ここ](https://monooq-storybook.herokuapp.com/)に最新のStorybookをデプロイすることができます。

### コンポーネント設計

* AtomicDesign に沿った実装にしてます
* 一部、静的ページや Atomic 化するほどでもない場合に限り素の React+styled-components で実装してます
* 基本的に LV1~templates までのコンポーネントは state を持たずに presentation に特化します

| レイヤー   | 属性              | 説明                                                                                                                                                                                    |
| ---------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LV1        | atoms             | コンポーネントの最小要素です。<br/>形を持ってません。<br/>素の HTMLElement とか iOS/Android の UI パーツがイメージ。                                                                    |
| LV2        | molecules         | 2 つ以上の LV1 コンポーネントの組み合わせです。<br/>かつ使いまわせるものを LV2 として定義します。                                                                                       |
| LV3        | organisms         | 複数の LV1/LV2 コンポーネントの組み合わせです。<br/>機能を持ち始めてます。<br/>最終的にページに表示される  もののうち、一番荒い粒度で分解したときの要素。                               |
| templates  | templates         | ページのワイヤーフレームを定義します。<br/>渡してもらったコンポーネントをレイアウト通りに配置するだけです。<br/>場合によってコンポーネントの形を決めます。                              |
| containers | pages / container | ロジックが含まれるコンポーネントです。<br/>state 管理、action 発行、非同期処理などすべて担います。<br/>templtes と LV3 以下コンポーネントを組み合わせて最終的なページを render します。 |

## コーディングルール

* `style={{color: 'red'}}`の様にコンポーネントにベタでスタイル書かない。

* ESLint / Flow で静的解析しています。両者の警告は極力潰してください。

* 使用しているエディタで ESLint / Flow が使えるように設定をしておいてください。
