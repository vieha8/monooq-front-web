// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import AnimateSearchInputField from './index';

storiesOf('Molecules/AnimateSearchInputField', module)
  .add('IconLeft', () => (
    <div style={{ width: '100%', maxWidth: '320px' }}>
      <AnimateSearchInputField
        iconLeft
        show
        placeholder="プレースホルダー"
        onClickIcon={() => console.log('onClickIcon')}
      />
    </div>
  ))
  .add('IconRight', () => (
    <div style={{ width: '100%', maxWidth: '320px' }}>
      <AnimateSearchInputField
        iconRight
        show
        placeholder="プレースホルダー"
        onClickIcon={() => console.log('onClickIcon')}
        onKeyDownInputField={e => console.log(e)}
      />
    </div>
  ));
