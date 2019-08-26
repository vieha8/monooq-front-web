// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ProfileEdit from './index';
import Completed from './Completed';

ProfileEdit.displayName = 'ProfileEdit';
Completed.displayName = 'Completed';

storiesOf('Organisms(LV3)/ProfileEdit', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        プロフィール編集フォーム
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ProfileEdit
          errors={{}}
          onChangeImage={() => console.log('onChangeImage')}
          imagePreview=""
          image=""
          onChangeName={() => console.log('onChangeName')}
          name="モノオク太郎"
          onChangeEmail={() => console.log('onChangeEmail')}
          email="info@monooq.com"
          isNoticeEmail
          onChangeNoticeEmail={() => console.log('onChangeNoticeEmail')}
          onKeyDownNoticeEmail={() => console.log('onKeyDownNoticeEmail')}
          onChangePhoneNumber={() => console.log('onChangePhoneNumber')}
          phoneNumber="0901231234"
          onChangePrefCode={() => console.log('onChangePrefCode')}
          prefCode="1"
          onChangeProfile={() => console.log('onChangeProfile')}
          profile="sample profile."
          onChangePurpose={() => console.log('onChangePurpose')}
          purpose={1}
          buttonDisabled={false}
          buttonLoading={false}
          onClickUpdate={() => console.log('onClickUpdate')}
          onKeyDownButtonUpdate={() => console.log('onKeyDownButtonUpdate')}
        />
      </div>
    )),
  )
  .add(
    'Completed',
    withInfo(`
        ### コンポーネント概要
        プロフィール編集完了
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Completed />
      </div>
    )),
  );
