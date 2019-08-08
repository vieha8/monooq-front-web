// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import TopView from './index';

TopView.displayName = 'TopView';

storiesOf('Organisms(LV3)/TopView', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        LPトップView
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <TopView
          catchPhrase={
            <div>
              個人間だからできる、
              <br />
              荷物を置くための新しい方法。
            </div>
          }
          catchPhraseSub={
            <div>
              モノオクは空きスペースを活用できる、
              <br />
              物置きシェアサービスです。
            </div>
          }
          SIplaceholder="近くのスペースを検索してみよう！　例）東京都港区"
          SIlocationText="aaaaa"
          SIonChange={console.log('Clicked')}
          SIonKeyDown={console.log('Clicked')}
          SIsearchDisabled={false}
          SIonClickSearchButton={console.log('Clicked')}
        />
      </div>
    )),
  );
