// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import EditSpaceTemplate from './index';

EditSpaceTemplate.displayName = 'EditSpaceTemplate';

storiesOf('Templates/EditSpaceTemplate', module).add(
  'Normal',
  withInfo(`
        ### コンポーネント概要
        ページテンプレート(スペース編集)
      `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <EditSpaceTemplate
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
        leftContent={
          <div
            style={{
              width: '100%',
              height: '500px',
              background: 'green',
            }}
          >
            left content section
          </div>
        }
        rightContent={
          <div
            style={{
              width: '100%',
              height: '500px',
              background: 'yellow',
            }}
          >
            right content section
          </div>
        }
      />
    </div>
  )),
);
