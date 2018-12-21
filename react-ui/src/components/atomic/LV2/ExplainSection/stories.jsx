// @flow

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ExplainSection from './index';

ExplainSection.displayName = 'ExplainSection';

storiesOf('Molecules(LV2)/ExplainSection', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      説明section
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <ExplainSection
        title={
          <div>
            モノオクは、
            <br />
            荷物の置き場所に困っている人と、
            <br />
            余ったスペースを活用したい人をつなぎます。
          </div>
        }
        description={
          <div>
            1分でわかるサービスの流れ。
            <br />
            誰でもかんたんに物置きスペースを探せて、気軽にホストになる
            <br />
            ことができます。
          </div>
        }
        isLeft
      />
    </div>
  )),
);
