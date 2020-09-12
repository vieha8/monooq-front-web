import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Colors, Dimens } from 'variables';

import HyperLink from './index';

HyperLink.displayName = 'HyperLink';

storiesOf('Atoms(LV1)/Texts/HyperLink', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      テキストリンク
      * ・colorを指定することで任意の文字色に変更可能。
      * ・colorを指定しない場合、文字色は既存色(linkBlue)となる。
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <HyperLink
        href="https://help.monooq.com/ja/articles/3694521"
        target="_blank"
        rel="noopener noreferrer"
      >
        見積もりの出し方
      </HyperLink>
    </div>
  )),
);
