// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';

import Footer from './index';

storiesOf('Molecules/Footer', module)
  .add('Normal', () => (
    <div style={{ paddingTop: '120px' }}>
      <Footer
        beginnerUri="#"
        companyUri="#"
        inquiryUri="#"
        privacyPolicyUri="#"
        termsUri="#"
        legalUri="#"
        cancelPolicyUri="#"
      />
    </div>
  ));
