import React from 'react';
import { withRouter } from 'react-router';
import { Page } from '../../stories/create-space/page/Shared';
import SpaceSize from '../../stories/create-space/page/SpaceSize';

const SpaceSizeContainer = props => (
  <Page>
    <SpaceSize {...props} />
  </Page>
);

export default withRouter(SpaceSizeContainer);
