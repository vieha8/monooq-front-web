import React from 'react';
import { withRouter } from 'react-router';
import { Page } from 'components/create-space/page/Shared';
import AboutBaggage from 'components/create-space/page/AboutBaggage';


const AboutBaggageContainer = props => (
  <Page>
    <AboutBaggage {...props} />
  </Page>
);

export default withRouter(AboutBaggageContainer);
