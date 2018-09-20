# モノオクフロントエンド

master ブランチにプッシュすると自動的にビルドされて[ここ](https://monooq-v2.herokuapp.com/)にあがります

storybook ブランチにプッシュすると[ここ](https://monooq-storybook.herokuapp.com/)に最新の storybook の状態が反映されます

## セットアップ手順

```
git clone https://github.com/Libtown/monooq-front-web
cd monooq-front-web
npm install
npm start
```

* styled-components のコンポーネント名を class に含めた DOM をレンダリングして欲しい場合

```
npm run dev-start
```

storybook の起動は`npm run storybook`

## 特徴

* React&Redux
* ディレクトリ構成は[Ducks](https://github.com/erikras/ducks-modular-redux)を意識してます。
* コード整形ツールの prettier がコミット時に走るようになっています。

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

* `style={{color: 'red'}}`みたいにコンポーネントにベタでスタイル書かない。

* ESLint / Flow で静的解析しています。両者の警告は極力潰してください。(prettier 設定中)

* 使用しているエディタで ESLint / Flow が使えるように設定をしておいてください。

## 注意事項

* yarn 使ってもいいけど yarn.lock はコミットしないように。heroku のビルドがこけるので。
