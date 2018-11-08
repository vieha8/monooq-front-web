// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Button from './index';

Button.displayName = 'Button';

storiesOf('Atoms(LV1)/Buttons/Button', module)
  .add(
    'Primary',
    withInfo(`
      ### コンポーネント概要
      ボタン(Primary)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Button primary>Primary</Button>
        <br />
        <Button primary disabled>
          Primary
        </Button>
      </div>
    )),
  )
  .add(
    'Secondary',
    withInfo(`
      ### コンポーネント概要
      ボタン(Secondary)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Button secondary>Secondary</Button>
        <br />
        <Button secondary disabled>
          Secondary
        </Button>
      </div>
    )),
  )
  .add(
    'Tertiary',
    withInfo(`
      ### コンポーネント概要
      ボタン(Tertiary)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Button tertiary>Tertiary</Button>
        <br />
        <Button tertiary disabled>
          Tertiary
        </Button>
      </div>
    )),
  )
  .add(
    'Facebook',
    withInfo(`
      ### コンポーネント概要
      ボタン(Facebook)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Button facebook>Facebook</Button>
        <br />
        <Button facebook disabled>
          Facebook
        </Button>
      </div>
    )),
  )
  .add(
    'Custom Height',
    withInfo(`
      ### コンポーネント概要
      - ・ボタン(高さ調整可能ボタン)
      - ・heightを指定することで、ボタンの高さを指定することが可能(指定単位:px)。
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Button height={20}>Height 20</Button>
        <br />
        <Button height={20} disabled>
          Height 20
        </Button>
        <br />
        <Button height={40}>Height 40</Button>
        <br />
        <Button height={40} disabled>
          Height 40
        </Button>
        <br />
        <Button height={60}>Height 60</Button>
        <br />
        <Button height={60} disabled>
          Height 60
        </Button>
      </div>
    )),
  );
