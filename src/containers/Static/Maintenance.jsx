import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Maintenance from 'components/Static/Maintenance';

class MaintenanceContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Maintenance />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(MaintenanceContainer));
