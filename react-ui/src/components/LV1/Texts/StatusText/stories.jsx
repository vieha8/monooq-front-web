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
      <StatusText statusColor={Colors.green} text="3日以内" />
      <br />
      <StatusText statusColor={Colors.brandAccent} text="1週間以内" />
      <br />
      <StatusText text="1ヶ月以内" />
    </div>
  )),
);
