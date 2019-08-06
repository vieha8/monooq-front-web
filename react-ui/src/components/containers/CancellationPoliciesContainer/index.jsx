// @flow

import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ContainerStaticPage from 'components/LV1/ContainerStaticPage';
import CancellationPolicies from 'components/LV3/CancellationPolicies';
import Header from 'components/containers/Header';

class CancellationPoliciesContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <ContainerStaticPage>
          <CancellationPolicies />
        </ContainerStaticPage>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(CancellationPoliciesContainer));
