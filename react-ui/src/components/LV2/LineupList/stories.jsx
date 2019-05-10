// @flow

import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import LineupList from './index';

LineupList.displayName = 'LineupList';

const logoAppliv =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-appliv%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';
const logoAscii =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-ascii%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';
const logoBridge =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-bridge%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';
const logoCnet =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-cnet%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';
const logoLifehacker =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-lifehacker%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';
const logoTechcrunch =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-techcrunch%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';
const logoTechable =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-techable%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=26';

storiesOf('Molecules(LV2)/LineupList', module).add(
  'Normal',
  withInfo(`
      ### コンポーネント概要
      ラインナップリスト
    `)(() => (
    <div style={{ padding: `${Dimens.storyBookPadding}` }}>
      <LineupList
        list={[
          {
            link: 'https://japan.cnet.com/',
            image: logoCnet,
            alt: 'CNET Japan',
          },
          {
            link: 'http://ascii.jp/',
            image: logoAscii,
            alt: 'ASCII.jp',
          },
          {
            link: 'http://thebridge.jp/',
            image: logoBridge,
            alt: 'THE BRIDGE',
          },
          {
            link: 'https://mag.app-liv.jp/',
            image: logoAppliv,
            alt: 'Appliv',
          },
          {
            link: 'https://www.lifehacker.jp/',
            image: logoLifehacker,
            alt: 'lifehacker',
          },
          {
            link: 'https://jp.techcrunch.com/',
            image: logoTechcrunch,
            alt: 'TechCrunch',
          },
          {
            link: 'https://techable.jp',
            image: logoTechable,
            alt: 'TECHABLE',
          },
        ]}
      />
    </div>
  )),
);
