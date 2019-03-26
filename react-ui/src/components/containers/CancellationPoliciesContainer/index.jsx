// @flow

import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import StaticPageContent from 'components/LV1/StaticPageContent';
import CancellationPolicies from 'components/LV3/CancellationPolicies';
import Header from 'components/containers/Header';

class CancellationPoliciesContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <StaticPageContent>
          <CancellationPolicies />
        </StaticPageContent>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(CancellationPoliciesContainer));
