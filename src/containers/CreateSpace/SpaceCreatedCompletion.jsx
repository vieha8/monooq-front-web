import React from 'react';
import { withRouter } from 'react-router';
import { Page } from '../../stories/create-space/page/Shared';
import SpaceCratedCompletion from '../../stories/create-space/page/SpaceCreatedCompletion';

const SpaceCratedCompletionContainer = props => (
  <Page>
    <SpaceCratedCompletion {...props} />
  </Page>
);

export default withRouter(SpaceCratedCompletionContainer);
