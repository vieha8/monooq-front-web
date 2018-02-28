import React from 'react';
import { withRouter } from 'react-router';
import { Page } from 'components/create-space/page/Shared';
import SpaceCratedCompletion from 'components/create-space/page/SpaceCreatedCompletion';

const SpaceCratedCompletionContainer = props => (
  <Page>
    <SpaceCratedCompletion {...props} />
  </Page>
);

export default withRouter(SpaceCratedCompletionContainer);
