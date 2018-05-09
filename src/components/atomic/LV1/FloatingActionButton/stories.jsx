// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import FloatingActionButton from './index';

storiesOf('Atoms/Util/FloatingActionButton', module)
  .add('Normal', () => (
    <div>
      <FloatingActionButton
        onClick={() => console.log('onClick')}
        iconFontClass="fal fa-lightbulb"
      />
    </div>
  ))
  .add('ChangeSize', () => (
    <div>
      <FloatingActionButton
        onClick={() => console.log('onClick')}
        iconFontClass="fal fa-lightbulb"
      />
      <FloatingActionButton
        onClick={() => console.log('onClick')}
        iconFontClass="fal fa-lightbulb"
        buttonSize={80}
        iconSize={64}
      />
      <FloatingActionButton
        onClick={() => console.log('onClick')}
        iconFontClass="fal fa-lightbulb"
        buttonSize={40}
        iconSize={20}
      />
    </div>
  ));
