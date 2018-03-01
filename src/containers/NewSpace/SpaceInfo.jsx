import React from 'react';
import { withRouter } from 'react-router';
import { Page } from 'components/NewSpace/page/Shared';
import SpaceInfo from 'components/NewSpace/page/SpaceInfo';

const SpaceInfoContainer = props => (
  <Page>
    <SpaceInfo {...props} />
  </Page>
);

export default withRouter(SpaceInfoContainer);
