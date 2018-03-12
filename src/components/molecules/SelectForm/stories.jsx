// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import SelectFormMock from './mock/SelectForm';

storiesOf('Molecules/SelectForm', module)
  .add('Normal', () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <SelectFormMock
        label="スペースの種類は？"
        options={[
          { text: 'クローゼット', value: '1' },
          { text: '物置', value: '2' },
          { text: '部屋', value: '3' },
          { text: 'その他', value: '4' },
        ]}
      />
    </div>
  ));
