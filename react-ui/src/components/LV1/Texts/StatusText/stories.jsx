import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens, Colors } from 'variables';

import StatusText from './index';

StatusText.displayName = 'StatusText';

storiesOf('Atoms(LV1)/Texts/StatusText', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    ステータステキスト
  `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <StatusText setData={[{ statusColor: Colors.green, viewText: '3日以内' }]} />
      <br />
      <StatusText setData={[{ statusColor: Colors.brandAccent, viewText: '1週間以内' }]} />
      <br />
      <StatusText setData={[{ statusColor: Colors.lightGray2, viewText: '1ヶ月以内' }]} />
    </div>
  )),
);
