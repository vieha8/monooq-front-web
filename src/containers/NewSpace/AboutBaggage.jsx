import React from 'react';
import { withRouter } from 'react-router';
import { Page } from 'components/NewSpace/page/Shared';
import AboutBaggage from 'components/NewSpace/page/AboutBaggage';


const AboutBaggageContainer = props => (
  <Page>
    <AboutBaggage {...props} />
  </Page>
);

export default withRouter(AboutBaggageContainer);
