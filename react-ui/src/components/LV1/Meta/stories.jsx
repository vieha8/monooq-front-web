import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Meta from './index';

Meta.displayName = 'Meta';

storiesOf('Atoms(LV1)/Meta', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      Meta ※ogとnoindexは任意
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      ブラウザのdeveloperツールでMetaを確認してください。
      <Meta
        title="title-sample"
        description="description-sample"
        ogUrl="ogurl-sample"
        ogImageUrl="ogImageUrl-sample"
        noindex
      />
    </div>
  )),
);
