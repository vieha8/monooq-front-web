// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import ManageButtons from './index';

storiesOf('Molecules/ManageButtons', module)
  .add('Public', () => (
    <div>
      <ManageButtons
        onClickEdit={() => console.log('onClickEdit')}
        onClickPublic={() => console.log('onClickPublic')}
        onClickPrivate={() => console.log('onClickPrivate')}
        public
      />
    </div>
  ))
  .add('Private', () => (
    <div>
      <ManageButtons
        onClickEdit={() => console.log('onClickEdit')}
        onClickPublic={() => console.log('onClickPublic')}
        onClickPrivate={() => console.log('onClickPrivate')}
        private
      />
    </div>
  ))
  .add('Removable', () => (
    <div>
      <ManageButtons
        onClickEdit={() => console.log('onClickEdit')}
        onClickPublic={() => console.log('onClickPublic')}
        onClickPrivate={() => console.log('onClickPrivate')}
        removable
      />
    </div>
  ));
