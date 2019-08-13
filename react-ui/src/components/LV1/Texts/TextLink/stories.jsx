// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Colors, Dimens } from 'variables';

import TextLink from './index';

const Url = 'https://monooq.com';
TextLink.displayName = 'TextLink';

storiesOf('Atoms(LV1)/Texts/TextLink', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      テキストリンク
      * ・colorを指定することで任意の文字色に変更可能。
      * ・colorを指定しない場合、文字色は既存色(linkBlue)となる。
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <div>
        <TextLink href={Url} color={Colors.brandPrimary}>
          新規登録(文字色指定)
        </TextLink>
      </div>
      <div>
        <TextLink href={Url} color={Colors.brandPrimary} underline>
          パスワードを忘れた方はこちら(文字色指定)(下線有り)
        </TextLink>
      </div>
      <div>
        <TextLink href={Url}>詳細を見る</TextLink>
      </div>
      <div>
        <TextLink href={Url} disabled>
          詳細を見る(disable)
        </TextLink>
      </div>
      <div>
        <TextLink href={Url} color={Colors.brandPrimary} disabled>
          詳細を見る(disable)(disabelの場合、color指定は無視する)
        </TextLink>
      </div>
    </div>
  )),
);
