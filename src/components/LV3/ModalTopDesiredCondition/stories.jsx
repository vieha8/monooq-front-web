import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import ModalTopDesiredCondition from './index';

ModalTopDesiredCondition.displayName = 'ModalTopDesiredCondition';

storiesOf('Organisms(LV3)/ModalTopDesiredCondition', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          PageNotFound
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <ModalTopDesiredCondition params={{}} isLoading={false} />
      </div>
    )),
  );
