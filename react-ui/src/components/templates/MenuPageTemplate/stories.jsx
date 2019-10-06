// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import MenuPageTemplate from './index';

MenuPageTemplate.displayName = 'MenuPageTemplate';

storiesOf('Templates/MenuPageTemplate', module)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        ページテンプレート(メニューページ)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MenuPageTemplate
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
          headline="headline here"
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
        />
      </div>
    )),
  )
  .add(
    'Has Caption',
    withInfo(`
        ### コンポーネント概要
        ページテンプレート(メニューページ)(caption有りver)
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <MenuPageTemplate
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
          headline="headline here"
          caption="caption here"
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
        />
      </div>
    )),
  );
