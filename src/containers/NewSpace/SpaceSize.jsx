import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Page } from 'components/NewSpace/page/Shared';
import SpaceSize from 'components/NewSpace/page/SpaceSize';

const SpaceSizeContainer = props => (
  <Page>
    <SpaceSize {...props} />
  </Page>
);

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(withRouter(SpaceSizeContainer));
