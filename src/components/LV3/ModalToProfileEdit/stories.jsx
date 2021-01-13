import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ModalToProfileEdit from './index';

ModalToProfileEdit.displayName = 'ModalToProfileEdit';

const getModalText = () => {
  return (
    <p>
      ご契約を進めるにはメールアドレス及び電話番号の登録が必要です。
      <br />
      <br />
      取引時の保険適用の条件となります。
      <br />
      また、緊急時のご連絡先として利用させて頂く場合がございます。
      <br />
    </p>
  );
};

storiesOf('Organisms(LV3)/ModalToProfileEdit', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          PageNotFound
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ModalToProfileEdit
          header="メールアドレス及び電話番号をご登録ください"
          content={getModalText()}
        />
      </div>
    )),
  );
