import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens, Colors } from 'variables';

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
    'Quaternary',
    withInfo(`
      ### コンポーネント概要
      ボタン(Quaternary)
      * ■パラメータ
      * fill={1}：横幅100%にする。
      * fontbold：ボタンのテキストを太字にする。
    `)(() => (
      <div style={{ background: `${Colors.darkGray2}`, padding: `${Dimens.storyBookPadding}` }}>
        <Button quaternary>Quaternary</Button>
        <br />
        <Button quaternary circle>
          Quaternary(circle)
        </Button>
        <br />
        <Button quaternary disabled>
          Quaternary
        </Button>
        <br />
        <Button quaternary fontbold fill={1}>
          Quaternary(文字太字/横幅100%)
        </Button>
        <br />
        <Button quaternary fontbold fill={1} disabled>
          Quaternary(文字太字/横幅100%)
        </Button>
      </div>
    )),
  )
  .add(
    'Quinary',
    withInfo(`
      ### コンポーネント概要
      ボタン(Quinary)
      * ■パラメータ
      * fill={1}：横幅100%にする。
      * fontbold：ボタンのテキストを太字にする。
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Button quinary>Quinary</Button>
        <br />
        <Button quinary disabled>
          Quinary
        </Button>
        <br />
        <Button quinary fontbold fill={1}>
          Quinary(文字太字/横幅100%)
        </Button>
        <br />
        <Button quinary fontbold fill={1} disabled>
          Quinary(文字太字/横幅100%)
        </Button>
      </div>
    )),
  )
  .add(
    'Facebook',
    withInfo(`
      ### コンポーネント概要
      【利用箇所無し】ボタン(Facebook)
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
    'Twitter',
    withInfo(`
      ### コンポーネント概要
      【利用箇所無し】ボタン(Twitter)
      * ■パラメータ
      * fill={1}：横幅100%にする。
      * fontbold：ボタンのテキストを太字にする。
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Button twitter url="">
          Twitter
        </Button>
        <br />
        <Button twitter url="" disabled>
          Twitter
        </Button>
        <br />
        <Button twitter url="" fontbold fill={1}>
          Twitter(文字太字/横幅100%)
        </Button>
        <br />
        <Button twitter url="" fontbold fill={1} disabled>
          Twitter(文字太字/横幅100%)
        </Button>
      </div>
    )),
  )
  .add(
    'LINE',
    withInfo(`
      ### コンポーネント概要
      ボタン(LINE)
      * ■パラメータ
      * fill={1}：横幅100%にする。
      * fontbold：ボタンのテキストを太字にする。
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Button line>LINE</Button>
        <br />
        <Button line disabled>
          LINE
        </Button>
        <br />
        <Button line fontbold fill={1}>
          LINE(文字太字/横幅100%)
        </Button>
        <br />
        <Button line fontbold fill={1} disabled>
          LINE(文字太字/横幅100%)
        </Button>
      </div>
    )),
  )
  .add(
    'Area Pin',
    withInfo(`
      ### コンポーネント概要
      ボタン(エリアボタンPin付き)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Button areaPin>武蔵村山市</Button>
        <br />
        <Button areaPin>渋谷区</Button>
        <br />
        <Button areaPin disabled>
          北区(disable)
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
