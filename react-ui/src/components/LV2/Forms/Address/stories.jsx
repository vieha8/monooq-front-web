import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Address from './index';

Address.displayName = 'Address';

storiesOf('Molecules(LV2)/Forms/RadioList', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    スペースの住所
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <Address
        formAddress={[
          {
            postalCode: '123-1235',
            pref: '東京都',
            town: '渋谷区南平台町',
            line1: '12-9',
            line2: '南平台サニーハイツ404号室',
          },
        ]}
        onChangePostalCode={() => console.log('onChangePostalCode')}
        onChangePref={() => console.log('onChangePref')}
        onChangeTown={() => console.log('onChangeTown')}
        onChangeLine1={() => console.log('onChangeLine1')}
        onChangeLine2={() => console.log('onChangeLine2')}
        buttonDisabled={false}
        buttonLoading={false}
        onClickGetAddress={() => console.log('onClickGetAddress')}
        onKeyDownButtonGetAddress={() => console.log('onKeyDownButtonGetAddress')}
      />
    </div>
  )),
);
