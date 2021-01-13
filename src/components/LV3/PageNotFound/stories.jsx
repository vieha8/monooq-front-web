import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dimens } from 'variables';

import PageNotFound from './index';

PageNotFound.displayName = 'PageNotFound';

storiesOf('Organisms(LV3)/PageNotFound', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .add(
    'Normal',
    withInfo(`
          ### コンポーネント概要
          PageNotFound
        `)(() => (
      <div style={{ padding: `${Dimens.storyBookPadding}` }}>
        <PageNotFound />
      </div>
    )),
  );
