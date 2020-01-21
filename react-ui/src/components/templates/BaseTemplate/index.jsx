import React, { Fragment } from 'react';
import Header from 'components/containers/Header';
import Footer from 'components/LV2/Footer';
import Page from '../Page';

export default ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Page noMargin>{children}</Page>
      <Footer />
    </Fragment>
  );
};
