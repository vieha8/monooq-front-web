// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import AnimateIconInputField from './index';

storiesOf('Molecules/AnimateIconInputField', module)
  .add('IconLeft', () => (
    <div style={{ width: '100%', maxWidth: '320px' }}>
      <AnimateIconInputField
        iconLeft
        show
        placeholder="プレースホルダー"
        onClickIcon={() => console.log('onClickIcon')}
      />
    </div>
  ))
  .add('IconRight', () => (
    <div style={{ width: '100%', maxWidth: '320px' }}>
      <AnimateIconInputField
        iconRight
        show
        placeholder="プレースホルダー"
        onClickIcon={() => console.log('onClickIcon')}
        onKeyDownInputField={e => console.log(e)}
      />
    </div>
  ));
