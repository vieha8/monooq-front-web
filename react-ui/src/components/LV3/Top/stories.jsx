// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import Top from './index';

Top.displayName = 'Top';

storiesOf('Organisms(LV3)/Top', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          Top
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <Top
          locationText=""
          searchButtonDisabled
          handleChangeLocation={() => console.log('handleChangeLocation')}
          onClickSearch={() => console.log('onClickSearch')}
          onClickSignup={() => console.log('onClickSignup')}
          onKeyDownSearchField={() => console.log('onKeyDownSearchField')}
          moreFeature={false}
          onClickMoreFeature={() => console.log('onClickMoreFeature')}
          onClickMoreArea={() => console.log('onClickMoreArea')}
          moreArea={false}
          history=""
          story
        />
      </div>
    )),
  );
