import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import TopViewTitle from './index';

TopViewTitle.displayName = 'TopViewTitle';

storiesOf('Molecules(LV2)/Texts/TopViewTitle', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'NoLogin',
    withInfo(`
      ### コンポーネント概要
      TopViewタイトル(未ログインver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <TopViewTitle isNoLogin />
      </div>
    )),
  )
  .add(
    'logged in',
    withInfo(`
      ### コンポーネント概要
      TopViewタイトル(ログイン済みver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <TopViewTitle isNoLogin={false} />
      </div>
    )),
  );
