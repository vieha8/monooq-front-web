// @flow

import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import TextLink from './index';

storiesOf('Atoms/TextLink', module)
  .add('Normal', () => (
    <Fragment>
      <div>
        <TextLink>詳細を見る</TextLink>
      </div>
      <div>
        <TextLink disabled>詳細を見る</TextLink>
      </div>
    </Fragment>
  ))
  .add('Small', () => (
    <Fragment>
      <div>
        <TextLink small>詳細を見る</TextLink>
      </div>
      <div>
        <TextLink small disabled>詳細を見る</TextLink>
      </div>
    </Fragment>
  ))
