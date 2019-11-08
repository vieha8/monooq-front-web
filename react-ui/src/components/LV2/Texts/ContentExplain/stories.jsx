import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ContentExplain from './index';

ContentExplain.displayName = 'ContentExplain';

const explainTitle = () => {
  return (
    <div>
      モノオクは、
      <br />
      荷物の置き場所に困っている人と、
      <br />
      余ったスペースを活用したい人をつなぎます。
    </div>
  );
};

const explainDescription = () => {
  return (
    <div>
      1分でわかるサービスの流れ。
      <br />
      誰でもかんたんに物置きスペースを探せて、気軽にホストになる
      <br />
      ことができます。
    </div>
  );
};

storiesOf('Molecules(LV2)/Texts/ContentExplain', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      説明コンテンツ
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ContentExplain title={explainTitle()} description={explainDescription()} isLeft />
    </div>
  )),
);
