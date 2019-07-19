// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Path from 'config/path';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens, Colors } from 'variables';

import ArtContainer from './index';

ArtContainer.displayName = 'ArtContainer';

const LinkText = styled(Link)`
  color: ${Colors.linkBlue};
`;

storiesOf('Molecules(LV2)/StaticArt', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
      ### コンポーネント概要
      項目リスト(静的画面向け)(通常ver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ArtContainer
          title="第1条 適用"
          paraList={[
            {
              text:
                '1.​本規約は、本サービス（第2条に定義）の利用に関する当社と登録利用者（第2条に定義）との間の権利義務関係を定めることを目的とし、当社と登録利用者との間の本サービスの利用に関わる一切の関係に適用されます。',
            },
            {
              text:
                '2.​当社が当社ウェブサイト（第2条に定義）上で随時掲載する本サービスに関するルール、諸規定等は本規約の一部を構成するものとします。',
            },
          ]}
        />
      </div>
    )),
  )
  .add(
    'Custom Text',
    withInfo(`
      ### コンポーネント概要
      項目リスト(静的画面向け)(カスタムテキストver)
    `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ArtContainer
          title="第1条 個人情報等の取扱い"
          paraList={[
            {
              customText: (
                <div>
                  1.登録利用者は、登録情報に含まれる登録利用者の個人情報（個人情報の保護に関する法律（以下「個人情報保護法」といいます。）第2条1項に定義する個人情報を意味します。）について、当社の
                  <LinkText to={Path.privacy()}>プライバシーポリシー</LinkText>
                  に従って取り扱われることに同意するものとします。
                </div>
              ),
            },
            {
              text:
                '2.登録利用者は、スペース利用契約の締結及びその交渉に必要な範囲で他の登録利用者に自身の電話番号や住所等が他の登録利用者に提供されることを了承するものとします。この場合、当該情報を提供された登録利用者は個人情報保護法その他の法令に従い適切に管理するものとします。',
            },
            {
              text:
                '3.登録利用者は、当社が本サービスを提供するために必要な範囲で登録利用者の氏名、メールアドレス、電話番号、住所その他の登録情報を保険会社に提供する場合があることを了承するものとします。',
            },
            {
              text:
                '4.当社は、本サービスを提供するにあたり知り得た情報を特定の個人を識別することができないように匿名化した上で、統計情報その他の情報として自由にこれを利用（第三者への提供を含むが、これに限られません。）することができるものとします。',
            },
          ]}
        />
      </div>
    )),
  );
