// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import { withInfo } from '@storybook/addon-info';
import PickupStaffSpaceList from 'components/LV3/Top/pickup';
import { Dimens } from 'variables';

import Top from './index';

Top.displayName = 'Top';

storiesOf('Organisms(LV3)/Top', module)
  .addDecorator(StoryRouter())
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
          pickUpSpaces={PickupStaffSpaceList.slice(0, 4)}
          story
        />
      </div>
    )),
  );
