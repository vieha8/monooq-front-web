import React, { Fragment } from 'react';
import Header from 'components/containers/Header';
import Footer from 'components/LV2/Footer';
import Page from 'components/templates/Page';

const BaseTemplate = React.memo(({ children, bottomMargin }) => (
  <Fragment>
    <Header />
    <Page noMargin>{children}</Page>
    <Footer bottomMargin={bottomMargin} />
  </Fragment>
));

export default BaseTemplate;
