// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Menu from './index';

storiesOf('Organisms/HelpMenu', module)
  .add('Host', () => (
    <div style={{ width: '320px' }}>
      <Menu
        howToUser={{ open: true }}
        onClickHowToUser={() => console.log('onClickHowToUser')}
        aboutService={{ href: '#', show: true }}
        aboutUserTransaction={{ href: '#', show: true }}
        howToBeHost={{ open: true }}
        onClickHowToBeHost={() => console.log('onClickHowToBeHost')}
        aboutHost={{ href: '#', show: true }}
        aboutRegisterSpace={{ href: '#', show: true }}
        aboutHostTransaction={{ href: '#', show: true }}
        aboutSalesTransfer={{ href: '#', show: true }}
        aboutLogin={{ href: '#' }}
        other={{ href: '#' }}
      />
    </div>
  ));
