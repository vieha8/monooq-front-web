// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from 'components/atoms/Button';
import WrapButton from './index';

storiesOf('Molecules/WrapButton', module)
  .add('Save', () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <WrapButton
        label="下書き保存が可能です"
        buttonComponent={Button.Secondary}
        button={{
          text: '保存する',
          onClick: () => console.log('onClick'),
        }}
        enabled
      />
    </div>
  ))
  .add('Request', () => (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <WrapButton
        label="ご請求はまだ発生しません"
        buttonComponent={Button.Primary}
        button={{
          text: 'リクエストを送る',
          onClick: () => console.log('onClick'),
        }}
        enabled
      />
    </div>
  ));
