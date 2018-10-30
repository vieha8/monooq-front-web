// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import TextLink from './index';

var Url = 'https://monooq.com';
TextLink.displayName = 'TextLink';

storiesOf('Atoms/Buttons/TextLink', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      テキストリンク
    `)(() => (
    <div>
      <div>
        <TextLink href={Url}>詳細を見る</TextLink>
      </div>
      <div>
        <TextLink href={Url} disabled>
          詳細を見る
        </TextLink>
      </div>
    </div>
  )),
);
