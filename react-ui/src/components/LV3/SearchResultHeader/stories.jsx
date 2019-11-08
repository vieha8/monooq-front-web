import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchResultHeader from './index';

SearchResultHeader.displayName = 'SearchResultHeader';

storiesOf('Organisms(LV3)/SearchResultHeader', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        検索結果画面のヘッダ
      `)(() => (
      <div style={{ width: '100%', maxWidth: '880px', padding: `${Dimens.storyBookPadding}` }}>
        <SearchResultHeader
          condition="渋谷区"
          maxCount={1234}
          onClickMore={() => console.log('onClickMore')}
          onKeyDownButtonMore={() => console.log('onKeyDownButtonMore')}
        />
      </div>
    )),
  );
