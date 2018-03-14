import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import CancellationPolicies from 'components/Static/CancellationPolicies';

class CancellationPoliciesContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <CancellationPolicies />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(CancellationPoliciesContainer));
