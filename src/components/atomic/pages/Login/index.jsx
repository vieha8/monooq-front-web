// @flow

import React from 'react';

import AccountTemplate from 'components/atomic/templates/AccountTemplate';
import Login from 'components/atomic/organisms/Login';
import Header from 'components/atomic/organisms/Header';

export default () => (
  <AccountTemplate
    header={<Header />}
    form={<Login />}
  />
);
