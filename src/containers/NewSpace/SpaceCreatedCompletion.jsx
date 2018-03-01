import React from 'react';
import { withRouter } from 'react-router';
import { Page } from 'components/NewSpace/page/Shared';
import SpaceCratedCompletion from 'components/NewSpace/page/SpaceCreatedCompletion';

const SpaceCratedCompletionContainer = props => (
  <Page>
    <SpaceCratedCompletion {...props} />
  </Page>
);

export default withRouter(SpaceCratedCompletionContainer);
