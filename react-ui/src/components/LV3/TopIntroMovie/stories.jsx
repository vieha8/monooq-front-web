// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens, Colors } from 'variables';

import TopIntroMovie from './index';

TopIntroMovie.displayName = 'TopIntroMovie';

storiesOf('Organisms(LV3)/TopIntroMovie', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        メディアラインナップ
      `)(() => (
      <div style={{ background: `${Colors.brandPrimary}`, padding: `${Dimens.storyBookPadding}` }}>
        <TopIntroMovie
          srcMovie="https://www.youtube.com/embed/t0t50WBDwzc?showinfo=0&rel=0"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          ExplanTitle={
            <div>
              モノオクは、
              <br />
              荷物の置き場所に困っている人と、
              <br />
              余ったスペースを活用したい人をつなぎます。
            </div>
          }
          ExplanText={
            <div>
              1分でわかるサービスの流れ。
              <br />
              誰でもかんたんに物置きスペースを探せて、気軽にホストになる
              <br />
              ことができます。
            </div>
          }
        />
      </div>
    )),
  );
