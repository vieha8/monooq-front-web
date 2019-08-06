// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import MenuItem from './index';

MenuItem.displayName = 'MenuItem';

storiesOf('Atoms(LV1)/MenuItem', module).add(
  'Normal',
  withInfo(`
    ### コンポーネント概要
    メニューアイテム
  `)(() => <MenuItem show>メニューアイテム</MenuItem>),
);
