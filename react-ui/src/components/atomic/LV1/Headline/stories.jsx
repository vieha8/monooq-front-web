// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import { H1, H2, H3 } from './index';

storiesOf('Atoms/Text/Headline', module).add('Headline', () => (
  <div>
    <H1>Headline Level 1</H1>
    <H2>Headline Level 2</H2>
    <H3>Headline Level 3</H3>
  </div>
));
