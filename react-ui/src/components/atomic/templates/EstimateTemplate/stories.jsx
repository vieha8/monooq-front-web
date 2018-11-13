// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import EstimateTemplate from './index';

EstimateTemplate.displayName = 'EstimateTemplate';

storiesOf('Templates/EstimateTemplate', module).add(
  'Normal',
  withInfo(`
        ### コンポーネント概要
        ページテンプレート(見積もり)
      `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <EstimateTemplate
        header={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'red',
            }}
          >
            header section
          </div>
        }
        form={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'blue',
            }}
          >
            form section
          </div>
        }
        hint={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'orange',
            }}
          >
            hint section
          </div>
        }
      />
    </div>
  )),
);
