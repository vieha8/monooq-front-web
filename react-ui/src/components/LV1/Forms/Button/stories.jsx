// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Button from './index';

Button.displayName = 'Button';

storiesOf('Atoms(LV1)/Forms/Button', module)
  .add(
    'Primary',
    withInfo(`
      ### コンポーネント概要
      ボタン(Primary)
      * ■パラメータ
      * fill={1}：横幅100%にする。
      * fontbold：ボタンのテキストを太字にする。
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Button primary>Primary</Button>
        <br />
        <Button primary disabled>
          Primary
        </Button>
        <br />
        <Button primary center>
          Primary(中央揃え)
        </Button>
        <br />
        <Button primary fontbold fill={1}>
          Primary(文字太字/横幅100%)
        </Button>
        <br />
        <Button primary fontbold fill={1} disabled>
          Primary(文字太字/横幅100%)
        </Button>
      </div>
    )),
  )
  .add(
    'Secondary',
    withInfo(`
      ### コンポーネント概要
      ボタン(Secondary)
      * ■パラメータ
      * fill={1}：横幅100%にする。
      * borderbold：ボタンの枠線を太線にする。
      * fontbold：ボタンのテキストを太字にする。
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Button secondary>Secondary</Button>
        <br />
        <Button secondary disabled>
          Secondary
        </Button>
        <br />
        <Button secondary borderbold fontbold>
          Secondary(文字と枠線太字)
        </Button>
        <br />
        <Button secondary borderbold fontbold disabled>
          Secondary(文字と枠線太字)
        </Button>
        <br />
        <Button secondary fill={1}>
          Secondary(横幅100%)
        </Button>
        <br />
        <Button secondary fill={1} disabled>
          Secondary(横幅100%)
        </Button>
      </div>
    )),
  )
  .add(
    'Tertiary',
    withInfo(`
      ### コンポーネント概要
      ボタン(Tertiary)
      * ■パラメータ
      * fill={1}：横幅100%にする。
      * fontbold：ボタンのテキストを太字にする。
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Button tertiary>Tertiary</Button>
        <br />
        <Button tertiary disabled>
          Tertiary
        </Button>
        <br />
        <Button tertiary fontbold fill={1}>
          Tertiary(文字太字/横幅100%)
        </Button>
        <br />
        <Button tertiary fontbold fill={1} disabled>
          Tertiary(文字太字/横幅100%)
        </Button>
      </div>
    )),
  )
  .add(
    'Facebook',
    withInfo(`
      ### コンポーネント概要
      ボタン(Facebook)
      * ■パラメータ
      * fill={1}：横幅100%にする。
      * fontbold：ボタンのテキストを太字にする。
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Button facebook>Facebook</Button>
        <br />
        <Button facebook disabled>
          Facebook
        </Button>
        <br />
        <Button facebook fontbold fill={1}>
          Facebook(文字太字/横幅100%)
        </Button>
        <br />
        <Button facebook fontbold fill={1} disabled>
          Facebook(文字太字/横幅100%)
        </Button>
      </div>
    )),
  )
  .add(
    'Custom Height',
    withInfo(`
      ### コンポーネント概要
      * ・ボタン(高さ調整可能ボタン)
      * ・heightを指定することで、ボタンの高さを指定することが可能(指定単位:px)。
      * ■パラメータ
      * fill={1}：横幅100%にする。
      * fontbold：ボタンのテキストを太字にする。
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
        <br />
        <Button height={60} fontbold fill={1}>
          Height 60(文字太字/横幅100%)
        </Button>
        <br />
        <Button height={60} fontbold fill={1} disabled>
          Height 60(文字太字/横幅100%)
        </Button>
      </div>
    )),
  );
