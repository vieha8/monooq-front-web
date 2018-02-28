import React from 'react';
import { withRouter } from 'react-router';
import { Page } from 'components/create-space/page/Shared';
import ReceiveBaggage from 'components/create-space/page/ReceiveBaggage';

const ReceiveBaggageContainer = props => (
  <Page>
    <ReceiveBaggage {...props} />
  </Page>
);

export default withRouter(ReceiveBaggageContainer);
