// @flow

import React from 'react';

import AccountTemplate from 'components/atomic/templates/AccountTemplate';
import Signup from 'components/atomic/organisms/Signup';
import Header from 'components/atomic/organisms/Header';

export default () => (
  <AccountTemplate
    header={<Header />}
    form={<Signup />}
  />
);
