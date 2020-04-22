import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ModalNoSpaceRecommend from './index';

ModalNoSpaceRecommend.displayName = 'ModalNoSpaceRecommend';

storiesOf('Organisms(LV3)/ModalNoSpaceRecommend', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          PageNotFound
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ModalNoSpaceRecommend
          header="東京都にはスペースがありませんでした。"
          content="近くの都道府県でスペースを探してみませんか？"
        />
      </div>
    )),
  );
