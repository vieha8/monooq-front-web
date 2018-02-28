import React from 'react';
import { withRouter } from 'react-router';
import { Page } from 'components/create-space/page/Shared';
import AboutPrice from 'components/create-space/page/AboutPrice';

const AboutPriceContainer = props => (
  <Page>
    <AboutPrice {...props} />
  </Page>
);

export default withRouter(AboutPriceContainer);
