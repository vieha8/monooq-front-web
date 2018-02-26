import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Page } from '../../stories/create-space/page/Shared';
import SpaceSize from '../../stories/create-space/page/SpaceSize';

const SpaceSizeContainer = props => (
  <Page>
    <SpaceSize {...props} />
  </Page>
);

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(withRouter(SpaceSizeContainer));
