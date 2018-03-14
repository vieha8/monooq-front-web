import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Insurance from 'components/Static/Insurance';

class InsuranceContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Insurance />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(InsuranceContainer));
