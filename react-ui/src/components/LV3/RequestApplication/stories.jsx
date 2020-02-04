import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import RequestApplication from './index';

RequestApplication.displayName = 'RequestApplication';

storiesOf('Organisms(LV3)/RequestApplication', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        リクエスト申請モーダル
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <RequestApplication
          errors={{}}
          isRoom
          priceFull="10,000"
          priceTatami="5,000"
          disabled={false}
          loading={false}
          onClick={() => console.log('onClick')}
          onKeyDownButtonMessage={() => console.log('onKeyDownButtonMessage')}
          sizeType={1} // TODO: isRoomと統合
          usage={1}
          onChangePurpose={() => console.log('onChangePurpose')}
          breadth={1}
          onChangeBreadth={() => console.log('onChangeBreadth')}
          packageContents="冷蔵庫、洗濯機"
          onChangePackageContents={() => console.log('onChangePackageContents')}
          notes="1ヶ月延長するかもしれません"
          onChangeNotes={() => console.log('onChangeNotes')}
          startDate={[
            {
              year: 2020,
              month: 10,
              day: 20,
            },
          ]}
          endDate={[
            {
              year: 2020,
              month: 12,
              day: 31,
            },
          ]}
        />
      </div>
    )),
  );
