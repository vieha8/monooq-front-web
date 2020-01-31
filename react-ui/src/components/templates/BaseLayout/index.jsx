import React, { Fragment } from 'react';
import Header from 'components/LV3/Header';
import Footer from 'components/LV3/Footer';

const BaseLayout = React.memo(({ children }) => (
  <Fragment>
    <Header />
    {children}
    <Footer />
  </Fragment>
));

export default BaseLayout;
