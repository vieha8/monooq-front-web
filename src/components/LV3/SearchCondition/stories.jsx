import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import SearchCondition from './index';

SearchCondition.displayName = 'SearchCondition';

storiesOf('Organisms(LV3)/SearchCondition', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        スペース検索条件入力画面
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <SearchCondition
          errors={[]}
          keyword="渋谷"
          onChangeKeyword={() => console.log('onChangeKeyword')}
          prefCode={0}
          onChangePrefCode={() => console.log('onChangePrefCode')}
          priceMin={1000}
          onChangePriceMin={() => console.log('onChangePriceMin')}
          priceMax={10000}
          onChangePriceMax={() => console.log('onChangePriceMax')}
          type={0}
          onChangeType={() => console.log('onChangeType')}
          checkedFurniture={false}
          onClickFurniture={() => console.log('onClickFurniture')}
          onKeyDownFurniture={() => console.log('onKeyDownFurniture')}
          receive={0}
          onChangeReceive={() => console.log('onChangeReceive')}
          buttonDisabled={false}
          onClickSearch={() => console.log('onClickSearch')}
          onKeyDownButtonSearch={() => console.log('onKeyDownButtonSearch')}
        />
      </div>
    )),
  );
