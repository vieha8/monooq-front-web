import React from 'react';
import { withRouter } from 'react-router';
import { Page } from 'components/NewSpace/page/Shared';
import AboutPrice from 'components/NewSpace/page/AboutPrice';

const AboutPriceContainer = props => (
  <Page>
    <AboutPrice {...props} />
  </Page>
);

export default withRouter(AboutPriceContainer);