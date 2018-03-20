// @flow

import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import TextLink from './index';

storiesOf('Atoms/Buttons/TextButton', module)
  .add('Normal', () => (
    <Fragment>
      <div>
        <TextLink>詳細を見る</TextLink>
      </div>
      <div>
        <TextLink disabled>詳細を見る</TextLink>
      </div>
    </Fragment>
  ));
