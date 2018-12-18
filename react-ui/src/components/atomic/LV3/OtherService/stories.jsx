// @flow

import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import { Dimens, FontSizes, Colors } from 'variables';

import OtherService from './index';

OtherService.displayName = 'OtherService';

const logoPickGo =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-pickgo%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&format=auto&h=42';

const logoGojo =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-gojo%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&format=auto&h=65';

const PickGoMedia = styled.img`
  height: ${Dimens.medium3}px;
  margin: 0 15.5px;
  margin-bottom: ${Dimens.medium_20}px;
`;

const GojoMedia = styled.img`
  height: ${Dimens.large2_65}px;
  margin: 0 15.5px;
  margin-bottom: ${Dimens.medium_20}px;
`;

const PickGoDescription = styled.div`
  font-size: ${FontSizes.small}px;
  line-height: ${FontSizes.small * 2}px;
`;

storiesOf('Organisms(LV3)/OtherService', module)
  .addDecorator(StoryRouter())
  .add(
    'PickGo',
    withInfo(`
        ### コンポーネント概要
        提携サービス一覧(PickGo)
      `)(() => (
      <div style={{ background: `${Colors.brandPrimary}`, padding: `${Dimens.storyBookPadding}` }}>
        <OtherService
          catchPhrase={
            <div>
              荷物の配送だって
              <br />
              もっと便利に安くできる
            </div>
          }
          serviceName="PickGo"
          serviceUrl="https://pickgo.town/"
          serviceImage={<PickGoMedia src={logoPickGo} />}
          description={
            <PickGoDescription>
              サービス対象エリア
              <br />
              東京／神奈川／千葉／埼玉／大阪／兵庫／京都
            </PickGoDescription>
          }
          subDescription={
            <div>
              を使えば、
              <br />
              引っ越しが 5,000円 から
            </div>
          }
        />
      </div>
    )),
  )
  .add(
    'Gojo',
    withInfo(`
        ### コンポーネント概要
        提携サービス一覧(Gojo)
      `)(() => (
      <div style={{ background: `${Colors.brandPrimary}`, padding: `${Dimens.storyBookPadding}` }}>
        <OtherService
          catchPhrase={
            <div>
              共同でスペースを利用するなら
              <br />
              Gojoで便利に
            </div>
          }
          serviceName="Gojo"
          serviceUrl="https://gojo.life/"
          serviceImage={<GojoMedia src={logoGojo} />}
          subDescription={
            <div>
              を使えば、
              <br />
              チームやコミュニティの
              <br />
              お金の管理が簡単に
            </div>
          }
        />
      </div>
    )),
  );
