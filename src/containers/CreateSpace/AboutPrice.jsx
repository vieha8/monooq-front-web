import React from 'react';
import { withRouter } from 'react-router';
import { Page } from '../../stories/create-space/page/Shared';
import AboutPrice from '../../stories/create-space/page/AboutPrice';

const AboutPriceContainer = props => (
  <Page>
    <AboutPrice {...props} />
  </Page>
);

export default withRouter(AboutPriceContainer);
