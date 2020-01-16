import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import RegisterProfile from './index';

RegisterProfile.displayName = 'RegisterProfile';

storiesOf('Organisms(LV3)/RegisterProfile', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        プロフィール登録フォーム
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <RegisterProfile
          isHost={0}
          errors={[]}
          onChangeImage={() => console.log('onChangeImage')}
          imagePreview=""
          image=""
          onChangeName={() => console.log('onChangeName')}
          name="name"
          onChangeArea={() => console.log('onChangeArea')}
          prefCode={1}
          onClickPurposeGuest={() => console.log('onClickPurposeGuest')}
          onClickPurposeHost={() => console.log('onClickPurposeHost')}
          buttonDisabled={false}
          buttonLoading={false}
          onClickRegisterProfile={() => console.log('onClickRegisterProfile')}
          story
        />
      </div>
    )),
  );
