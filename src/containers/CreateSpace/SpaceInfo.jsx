import React from 'react';
import { withRouter } from 'react-router';
import { Page } from '../../stories/create-space/page/Shared';
import SpaceInfo from '../../stories/create-space/page/SpaceInfo';

const SpaceInfoContainer = props => (
  <Page>
    <SpaceInfo {...props} />
  </Page>
);

export default withRouter(SpaceInfoContainer);
