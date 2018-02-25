import React from 'react';
import { withRouter } from 'react-router';
import { Page } from '../../stories/create-space/page/Shared';
import ReceiveBaggage from '../../stories/create-space/page/ReceiveBaggage';

const ReceiveBaggageContainer = props => (
  <Page>
    <ReceiveBaggage {...props} />
  </Page>
);

export default withRouter(ReceiveBaggageContainer);
