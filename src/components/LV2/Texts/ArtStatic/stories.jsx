import React from 'react';
import styled from 'styled-components';
import { Link, MemoryRouter } from 'react-router-dom';
import Path from 'config/path';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens, Colors } from 'variables';

import ArtContainer from './index';

ArtContainer.displayName = 'ArtContainer';

const LinkText = styled(Link)`
  color: ${Colors.linkBlue};
`;

storiesOf('Molecules(LV2)/Texts/ArtStatic', module)
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
            '1.​本規約は、本サービス（第2条に定義）の利用に関する当社と登録利用者（第2条に定義）との間の権利義務関係を定めることを目的とし、当社と登録利用者との間の本サービスの利用に関わる一切の関係に適用されます。',
            '2.​当社が当社ウェブサイト（第2条に定義）上で随時掲載する本サービスに関するルール、諸規定等は本規約の一部を構成するものとします。',
            <div>
              1.登録利用者は、登録情報に含まれる登録利用者の個人情報（個人情報の保護に関する法律（以下「個人情報保護法」といいます。）第2条1項に定義する個人情報を意味します。）について、当社の
              <LinkText to={Path.privacy()}>個人情報保護方針</LinkText>
              に従って取り扱われることに同意するものとします。
            </div>,
          ]}
        />
      </div>
    )),
  );
