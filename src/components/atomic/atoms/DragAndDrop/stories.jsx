// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import RegisterProfileImage from './RegisterProfileImage';

storiesOf('Atoms/Util/DragAndDrop', module)
  .add('RegisterProfileImage', () => (
    <div>
      <RegisterProfileImage
        onDrop={data => console.log(data)}
      />
    </div>
  ));
