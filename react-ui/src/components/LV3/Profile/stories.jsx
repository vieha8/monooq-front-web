import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Profile from './index';

Profile.displayName = 'Profile';

const getSpaces = () => {
  const spaces = [];
  for (let i = 0; i < 10; i += 1) {
    spaces.push({
      id: 1,
      image: 'http://placehold.jp/200x200.png',
      address: '六本木',
      content: '駅近で利用しやすいスペース！',
      furniture: true,
      prices: [3000, 5000, 20000],
    });
  }

  return spaces;
};

storiesOf('Organisms(LV3)/Profile', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
        ### コンポーネント概要
        プロフィール
      `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Profile
          image="http://placehold.jp/200x200.png"
          name="モノオク太郎"
          prefCode={12}
          profile={`使いやすい物置提供中です！\nよろしくお願いします！`}
          spaces={getSpaces()}
        />
      </div>
    )),
  );
