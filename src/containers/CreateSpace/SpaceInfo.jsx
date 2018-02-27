import React from 'react';
import { withRouter } from 'react-router';
import { Page } from 'components/create-space/page/Shared';
import SpaceInfo from 'components/create-space/page/SpaceInfo';

const SpaceInfoContainer = props => (
  <Page>
    <SpaceInfo {...props} />
  </Page>
);

export default withRouter(SpaceInfoContainer);
