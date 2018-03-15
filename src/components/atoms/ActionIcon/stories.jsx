// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import { SearchIcon, MessageIcon, PictureIcon, AngleRight, AngleDown, CircleRight, CircleDown } from './index';

storiesOf('Atoms/Util/ActionIcon', module)
  .add('SearchIcon', () => (
    <div>
      <SearchIcon />
    </div>
  ))
  .add('MessageIcon', () => (
    <div>
      <MessageIcon />
    </div>
  ))
  .add('PictureIcon', () => (
    <div>
      <PictureIcon />
    </div>
  ))
  .add('AngleRight', () => (
    <div>
      <AngleRight />
    </div>
  ))
  .add('AngleDown', () => (
    <div>
      <AngleDown />
    </div>
  ))
  .add('CircleRight', () => (
    <div>
      <CircleRight />
    </div>
  ))
  .add('CircleDown', () => (
    <div>
      <CircleDown />
    </div>
  ));
