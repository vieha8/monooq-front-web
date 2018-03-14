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

storybook の起動は`npm run stroybook`

## 特徴

* React&Redux
* ディレクトリ構成は[Ducks](https://github.com/erikras/ducks-modular-redux)を意識してます。
* コード整形ツールの prettier がコミット時に走るようになっています。

## コーディングルール

* `style={{color: 'red'}}`みたいにコンポーネントにベタでスタイル書かない。

## 注意事項

* yarn 使ってもいいけど yarn.lock はコミットしないように。heroku のビルドがこけるので。
