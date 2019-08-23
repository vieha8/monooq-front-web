// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens, FontSizes, Colors } from 'variables';
import LogoEnepi from 'images/logo-enepi-blue.png';

import ServiceOther from './index';

ServiceOther.displayName = 'ServiceOther';

const BrStyled = styled.br`
  display: none;
  ${media.phone`
    display: block;
  `};
`;

const LinkBlank = styled.a`
  color: ${Colors.linkBlue};
  font-size: ${FontSizes.large}px;
  line-height: ${FontSizes.medium * 2}px;
  text-decoration: underline;
  ${media.phone`
    font-size: ${FontSizes.medium}px;
  `};
`;

const SubDescriptionSmall = styled.span`
  display: inline-block;
  margin-top: ${Dimens.small_10}px;
  font-size: ${FontSizes.small_15}px;
  ${media.phone`
    font-size: ${FontSizes.small_13}px;
  `};
`;

const logoPickGo =
  'https://monooq.imgix.net/img%2Fservice%2Flogo-pickgo%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&h=42';

storiesOf('Organisms(LV3)/ServiceOther', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        提携サービス一覧
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ServiceOther
          serviceList={[
            {
              title: '提携サービス',
              serviceUrl: 'https://pickgo.town/personal/',
              serviceLogo: { src: logoPickGo, alt: 'pickgo' },
              descriptionLogo: (
                <Fragment>
                  サービス対象エリア
                  <br />
                  東京／神奈川／千葉／埼玉／大阪／兵庫／京都
                </Fragment>
              ),
              catchPhrase: (
                <Fragment>
                  荷物の配送だって
                  <BrStyled />
                  もっと便利に安くできる
                </Fragment>
              ),
              description: (
                <Fragment>
                  <LinkBlank
                    component={MemoryRouter}
                    href="https://pickgo.town/personal/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    PickGo
                  </LinkBlank>
                  を使えば、引っ越しが 5,000円 から
                </Fragment>
              ),
            },
            {
              title: 'スポンサー',
              serviceUrl: 'https://enepi.jp/s/lp/003?pr=monooq',
              serviceLogo: { type_70: true, src: LogoEnepi, alt: 'enepi' },
              description: (
                <Fragment>
                  あなたのガス代本当に適正？
                  <br />
                  引っ越しを機に「
                  <LinkBlank
                    component={MemoryRouter}
                    href="https://enepi.jp/s/lp/003?pr=monooq"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    enepi
                  </LinkBlank>
                  」を使ってガス代を安くしよう！
                  <br />
                  <SubDescriptionSmall>
                    国内唯一のプロパンガス料金比較サービス「enepi」を使い、ガス料金が15％も削減できる！？
                  </SubDescriptionSmall>
                </Fragment>
              ),
              noMarginBottom: true,
            },
          ]}
        />
      </div>
    )),
  );
