import React from 'react';
import { withRouter } from 'react-router';
import { Page } from 'components/NewSpace/page/Shared';
import ReceiveBaggage from 'components/NewSpace/page/ReceiveBaggage';

const ReceiveBaggageContainer = props => (
  <Page>
    <ReceiveBaggage {...props} />
  </Page>
);

export default withRouter(ReceiveBaggageContainer);
