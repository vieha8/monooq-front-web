// @flow

import React from 'react';
import StorybookRouter from 'storybook-router';
import { storiesOf } from '@storybook/react';

import imageFurnitureQuarter from 'images/furniture-quarter.svg';
import imageFurnitureFull from 'images/furniture-full.svg';

import SpaceSizeCriterion from './index';

storiesOf('Molecules/SpaceSizeCriterion', module)
  .addDecorator(StorybookRouter())
  .add('Normal', () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <SpaceSizeCriterion
        selected
        position="left"
        text="単一料金の設定／1人用ソファが入るくらい、またはそれ以下"
        onClick={() => {}}
        image={imageFurnitureQuarter}
      />
      <SpaceSizeCriterion
        position="right"
        text="複数料金の設定／1人分の生活用品が入るくらい、またはそれ以上"
        onClick={() => {}}
        image={imageFurnitureFull}
      />
    </div>
  ));
