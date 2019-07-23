// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import imageFurnitureQuarter from 'images/furniture-quarter.svg';
import imageFurnitureFull from 'images/furniture-full.svg';

import SpaceSizeCriterion from './index';

SpaceSizeCriterion.displayName = 'SpaceSizeCriterion';

storiesOf('Molecules(LV2)/SpaceSizeCriterion', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      スペースサイズ基準
    `)(() => (
      <div
        style={{
          width: '100%',
          maxWidth: '880px',
          display: 'flow-root',
          padding: `${Dimens.storyBookPadding}`,
        }}
      >
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
    )),
  );
