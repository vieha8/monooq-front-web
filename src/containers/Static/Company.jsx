import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Company from 'components/Static/Company';

class CompanyContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Company />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(CompanyContainer));
