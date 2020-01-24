import React, { Fragment } from 'react';
import Header from 'components/pages/Header';
import Footer from 'components/LV2/Footer';

const BaseLayout = React.memo(({ children }) => (
  <Fragment>
    <Header />
    {children}
    <Footer />
  </Fragment>
));

export default BaseLayout;
